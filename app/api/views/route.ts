import { Redis } from '@upstash/redis'
import { NextResponse } from 'next/server'

const redis = new Redis({ url: process.env.KV_REST_API_URL!, token: process.env.KV_REST_API_TOKEN! })

export async function POST(request: Request) {
  const scope = new URL(request.url).searchParams.get('scope') || 'site'
  const key = `dotxiv:views:${scope.replace(/[^a-z0-9-]/gi, '').slice(0, 80) || 'site'}`
  const count = await redis.incr(key)
  return NextResponse.json({ count }, { headers: { 'Cache-Control': 'no-store' } })
}
