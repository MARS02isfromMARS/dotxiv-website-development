'use client'

import { useEffect, useMemo, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import Image from 'next/image'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { Dialog } from '@base-ui/react/dialog'
import { ArrowUp, Check, Square, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Marker, MarkerContent, MarkerIcon } from '@/components/ui/marker'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from '@/components/ui/message-scroller'
import { ChatButton } from './ChatButton'
import { Message } from './Message'
import styles from './zij.module.css'

const HISTORY_KEY = 'dotxiv:zij-chat:v1'
const MAX_MESSAGE_LENGTH = 2_000
const WELCOME_MESSAGE = "Marhaba! I'm Zij, your Astro Olympiad coach. Send me a problem, a topic, or ask me to draw something on a star map."
const quickActions = [
  {
    label: 'Solve a problem',
    prompt: 'I have an astronomy olympiad problem. Please guide me through solving it step by step.',
  },
  {
    label: 'Explain a topic',
    prompt: 'Explain an astronomy olympiad topic in three layers: intuition, physics and math, then an Olympiad-style example.',
  },
  {
    label: 'Draw it on a star map',
    prompt: 'Show me how to draw the ecliptic on a circular star map, including the chart setup and key points to plot.',
  },
  {
    label: 'Quiz me',
    prompt: 'Quiz me on astronomy olympiad topics. Ask one question at a time and wait for my answer.',
  },
]

type StudentLevel = 'Jr' | 'Sr'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function restoreMessages(): UIMessage[] {
  try {
    const saved: unknown = JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? '[]')
    if (!Array.isArray(saved)) return []

    return saved.flatMap((item, index) => {
      if (!isRecord(item) || !Array.isArray(item.parts)) return []
      if (item.role !== 'user' && item.role !== 'assistant') return []
      const text = item.parts
        .filter((part) => isRecord(part) && part.type === 'text' && typeof part.text === 'string')
        .map((part) => (part as Record<string, unknown>).text as string)
        .join('')
      if (!text.trim()) return []

      return [{
        id: typeof item.id === 'string' ? item.id.slice(0, 100) : `zij-${index}`,
        role: item.role,
        parts: [{ type: 'text' as const, text }],
      }]
    }) as UIMessage[]
  } catch {
    return []
  }
}

export function ChatPanel() {
  const [draft, setDraft] = useState('')
  const [level, setLevel] = useState<StudentLevel>('Jr')
  const [historyLoaded, setHistoryLoaded] = useState(false)
  const [requestError, setRequestError] = useState<string | null>(null)
  const levelRef = useRef<StudentLevel>('Jr')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const transport = useMemo(
    () => new DefaultChatTransport({
      api: '/api/zij',
      prepareSendMessagesRequest: ({ messages }) => ({
        body: {
          messages: messages.slice(-16),
          level: levelRef.current,
        },
      }),
    }),
    [],
  )
  const { messages, sendMessage, status, stop, setMessages } = useChat({
    id: 'dotxiv-zij',
    transport,
    onError: (error) => {
      const details = error.message.toLowerCase()
      if (details.includes('credit card') || details.includes('payment method') || details.includes('customer_verification_required')) {
        setRequestError('Vercel AI Gateway needs a valid payment method before Claude can answer. Add one in AI Gateway settings, then try again.')
      } else if (details.includes('429') || details.includes('rate limit') || details.includes('answering a lot of students')) {
        setRequestError('Zij is answering a lot of students right now. Please try again in a minute.')
      } else {
        setRequestError('Zij could not reach the observatory just now. Please try again in a moment.')
      }
    },
  })
  const isBusy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    setMessages(restoreMessages())
    setHistoryLoaded(true)
  }, [setMessages])

  useEffect(() => {
    if (!historyLoaded) return
    try {
      if (messages.length > 0) {
        window.localStorage.setItem(HISTORY_KEY, JSON.stringify(messages))
      } else {
        window.localStorage.removeItem(HISTORY_KEY)
      }
    } catch {
      setRequestError('Chat history could not be saved on this device.')
    }
  }, [historyLoaded, messages])

  function updateLevel(value: string[]) {
    const nextLevel = value[0]
    if (nextLevel === 'Jr' || nextLevel === 'Sr') {
      levelRef.current = nextLevel
      setLevel(nextLevel)
    }
  }

  function submitPrompt(value: string) {
    const text = value.trim()
    if (!text || isBusy) return
    if (text.length > MAX_MESSAGE_LENGTH) {
      setRequestError('Please keep your message under 2,000 characters.')
      return
    }

    setDraft('')
    setRequestError(null)
    void sendMessage({ text })
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    submitPrompt(draft)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing || event.keyCode === 229) return
    event.preventDefault()
    event.currentTarget.form?.requestSubmit()
  }

  function clearChat() {
    stop()
    setMessages([])
    setRequestError(null)
    try {
      window.localStorage.removeItem(HISTORY_KEY)
    } catch {
      setRequestError('Chat history could not be cleared on this device.')
    }
  }

  return (
    <Dialog.Root>
      <ChatButton />
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.backdrop} />
        <Dialog.Popup className={styles.panel} initialFocus={textareaRef}>
          <header className={styles.panelHeader}>
            <div className={styles.identity}>
              <Image src="/zij-mascot.png" alt="" width={42} height={42} className={styles.headerMascot} />
              <div className={styles.identityCopy}>
                <Dialog.Title className={styles.title}>Zij</Dialog.Title>
                <Dialog.Description className={styles.subtitle}>Your sky, calculated</Dialog.Description>
              </div>
            </div>
            <div className={styles.headerActions}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={styles.headerButton}
                aria-label="Clear chat"
                title="Clear chat"
                onClick={clearChat}
              >
                <Trash2 data-icon="inline-start" />
              </Button>
              <Dialog.Close
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={styles.headerButton}
                    aria-label="Close Zij"
                    title="Close Zij"
                  />
                }
              >
                <X data-icon="inline-start" />
              </Dialog.Close>
            </div>
          </header>

          <div className={styles.levelBar}>
            <span className={styles.levelLabel}>Your level</span>
            <ToggleGroup
              value={[level]}
              onValueChange={updateLevel}
              variant="outline"
              size="sm"
              spacing={1}
              aria-label="Student level"
              className={styles.levelToggle}
            >
              <ToggleGroupItem value="Jr" aria-label="Junior level">Jr</ToggleGroupItem>
              <ToggleGroupItem value="Sr" aria-label="Senior level">Sr</ToggleGroupItem>
            </ToggleGroup>
          </div>

          <section className={styles.conversation} aria-label="Zij conversation">
            <MessageScrollerProvider autoScroll>
              <MessageScroller className={styles.scroller}>
                <MessageScrollerViewport aria-label="Chat messages" className={styles.scrollerViewport}>
                  <MessageScrollerContent aria-busy={isBusy} className={styles.scrollerContent}>
                    {messages.length === 0 ? (
                      <>
                        <MessageScrollerItem messageId="zij-welcome" scrollAnchor>
                          <Message role="assistant" text={WELCOME_MESSAGE} />
                        </MessageScrollerItem>
                        <MessageScrollerItem messageId="zij-quick-actions">
                          <div className={styles.quickActions} aria-label="Quick prompts">
                            {quickActions.map((action) => (
                              <Button
                                key={action.label}
                                type="button"
                                variant="outline"
                                size="sm"
                                className={styles.quickAction}
                                disabled={isBusy}
                                onClick={() => submitPrompt(action.prompt)}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        </MessageScrollerItem>
                      </>
                    ) : messages.map((message) => {
                      const text = message.parts
                        .map((part) => part.type === 'text' ? part.text : '')
                        .join('')
                      if (!text) return null
                      return (
                        <MessageScrollerItem
                          key={message.id}
                          messageId={message.id}
                          scrollAnchor={message.role === 'user'}
                        >
                          <Message role={message.role === 'user' ? 'user' : 'assistant'} text={text} />
                        </MessageScrollerItem>
                      )
                    })}
                    {isBusy && (
                      <MessageScrollerItem messageId="zij-typing">
                        <Marker role="status" className={styles.typingIndicator}>
                          <MarkerIcon><Spinner /></MarkerIcon>
                          <MarkerContent>{status === 'submitted' ? 'Zij is thinking…' : 'Zij is writing…'}</MarkerContent>
                        </Marker>
                      </MessageScrollerItem>
                    )}
                  </MessageScrollerContent>
                </MessageScrollerViewport>
              </MessageScroller>
            </MessageScrollerProvider>
          </section>

          <footer className={styles.composerFooter}>
            {requestError && <p className={styles.errorMessage} role="alert">{requestError}</p>}
            <form className={styles.composer} onSubmit={handleSubmit}>
              <Textarea
                ref={textareaRef}
                aria-label="Ask Zij an astronomy question"
                aria-describedby="zij-message-counter"
                className={styles.composerTextarea}
                value={draft}
                maxLength={MAX_MESSAGE_LENGTH}
                rows={1}
                placeholder="Ask an astronomy question…"
                disabled={isBusy}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={handleKeyDown}
              />
              {isBusy ? (
                <Button
                  type="button"
                  variant="outline"
                  size="icon-lg"
                  className={styles.sendButton}
                  aria-label="Stop response"
                  title="Stop response"
                  onClick={stop}
                >
                  <Square data-icon="inline-start" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="default"
                  size="icon-lg"
                  className={styles.sendButton}
                  aria-label="Send message"
                  title="Send message"
                  disabled={!draft.trim()}
                >
                  <ArrowUp data-icon="inline-start" />
                </Button>
              )}
            </form>
            <div className={styles.composerMeta}>
              <span id="zij-message-counter">{draft.length}/{MAX_MESSAGE_LENGTH}</span>
              <span>Shift + Enter for a new line</span>
            </div>
          </footer>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
