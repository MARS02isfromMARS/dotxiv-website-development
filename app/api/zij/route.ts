import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  type UIMessage,
} from 'ai'
import { ZIJ_PROMPT } from '@/lib/zij-prompt'

const MAX_MESSAGE_LENGTH = 2_000
const MAX_REQUEST_LENGTH = 256_000
const MAX_HISTORY_MESSAGES = 16
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
})
const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(12, '1 m'),
  prefix: 'dotxiv:zij:chat',
})
const localRateLimits = new Map<string, { count: number; reset: number }>()

export const maxDuration = 45

type StudentLevel = 'Jr' | 'Sr'

type RateLimitResult = { success: boolean; reset: number }

function localRateLimit(ip: string): RateLimitResult {
  const now = Date.now()
  let entry = localRateLimits.get(ip)
  if (!entry || entry.reset <= now) {
    entry = { count: 0, reset: now + 60_000 }
    localRateLimits.set(ip, entry)
  }

  entry.count += 1
  if (localRateLimits.size > 1_000) {
    for (const [key, value] of localRateLimits) {
      if (value.reset <= now) localRateLimits.delete(key)
    }
  }

  return { success: entry.count <= 12, reset: entry.reset }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function errorResponse(message: string, status: number, retryAfter?: number) {
  return Response.json(
    { error: message },
    {
      status,
      headers: {
        'Cache-Control': 'no-store',
        ...(retryAfter ? { 'Retry-After': String(retryAfter) } : {}),
      },
    },
  )
}

function requestIp(request: Request) {
  return (
    request.headers.get('x-real-ip')?.trim() ||
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'anonymous'
  ).slice(0, 120)
}

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get('content-length') ?? 0)
  if (contentLength > MAX_REQUEST_LENGTH) {
    return errorResponse('That conversation is too large. Please clear some chat history and try again.', 413)
  }

  const ip = requestIp(request)
  let rateLimitResult: RateLimitResult
  if (process.env.NODE_ENV === 'production') {
    try {
      const { success, reset } = await rateLimiter.limit(ip)
      rateLimitResult = { success, reset }
    } catch {
      console.error('[zij] Production rate limit service unavailable')
      return errorResponse('Zij is temporarily unavailable. Please try again shortly.', 503)
    }
  } else {
    rateLimitResult = localRateLimit(ip)
  }

  if (!rateLimitResult.success) {
    const retryAfter = Math.max(1, Math.ceil((rateLimitResult.reset - Date.now()) / 1_000))
    return errorResponse('Zij is answering a lot of students right now. Please try again in a minute.', 429, retryAfter)
  }

  let body: unknown
  try {
    const rawBody = await request.text()
    if (rawBody.length > MAX_REQUEST_LENGTH) {
      return errorResponse('That conversation is too large. Please clear some chat history and try again.', 413)
    }
    body = JSON.parse(rawBody)
  } catch {
    return errorResponse('I could not read that message. Please try sending it again.', 400)
  }

  if (!isRecord(body) || !Array.isArray(body.messages)) {
    return errorResponse('Please send a question for Zij to answer.', 400)
  }

  if (body.level !== 'Jr' && body.level !== 'Sr') {
    return errorResponse('Choose Jr or Sr level, then send your question again.', 400)
  }

  const messages: UIMessage[] = []
  for (const [index, candidate] of body.messages.slice(-MAX_HISTORY_MESSAGES).entries()) {
    if (!isRecord(candidate) || !Array.isArray(candidate.parts)) continue
    if (candidate.role !== 'user' && candidate.role !== 'assistant') continue

    const text = candidate.parts
      .filter((part) => isRecord(part) && part.type === 'text' && typeof part.text === 'string')
      .map((part) => (part as Record<string, unknown>).text as string)
      .join('')

    if (!text.trim()) continue
    if (candidate.role === 'user' && text.length > MAX_MESSAGE_LENGTH) {
      return errorResponse('Please keep each message under 2,000 characters.', 413)
    }

    messages.push({
      id: typeof candidate.id === 'string' ? candidate.id.slice(0, 100) : `zij-${index}`,
      role: candidate.role,
      parts: [{ type: 'text', text: text.slice(0, 16_000) }],
    })
  }

  if (messages.at(-1)?.role !== 'user') {
    return errorResponse('Please enter a question before sending.', 400)
  }

  try {
    const result = streamText({
      model: 'anthropic/claude-sonnet-5.5',
      instructions: `${ZIJ_PROMPT}\n\nThe student's selected level for this request is ${body.level as StudentLevel}. Adjust the depth of this answer to that level.`,
      messages: await convertToModelMessages(messages),
      maxOutputTokens: 2_600,
      temperature: 0.2,
      onError({ error }) {
        console.error('[zij] Model stream failed', error instanceof Error ? error.name : 'Unknown error')
      },
    })

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({
        stream: result.stream,
        onError(error) {
          if (error instanceof Error && /credit card|customer_verification_required/i.test(error.message)) {
            return 'Vercel AI Gateway needs a valid payment method before Claude can answer. Add one in AI Gateway settings, then try again.'
          }
          return 'Zij could not reach the observatory just now. Please try again in a moment.'
        },
      }),
    })
  } catch {
    return errorResponse('Zij could not reach the observatory just now. Please try again in a moment.', 502)
  }
}
