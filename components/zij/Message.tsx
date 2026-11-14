'use client'

import { useState } from 'react'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { Check, Copy } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Bubble, BubbleContent } from '@/components/ui/bubble'
import {
  Message as MessageRow,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
} from '@/components/ui/message'
import styles from './zij.module.css'

const safeColor = /^(?:#[\da-f]{3}(?:[\da-f]{1,5})?|none|transparent|currentColor|black|white|gold|yellow|orange|red|blue|navy|gray|grey)$/i
const safeLocalMarker = /^url\(#[\w:.-]+\)$/
const allowedSvgTags = [
  'svg',
  'g',
  'path',
  'circle',
  'ellipse',
  'line',
  'polyline',
  'polygon',
  'rect',
  'text',
  'tspan',
  'title',
  'desc',
  'defs',
  'marker',
]

const svgSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), ...allowedSvgTags],
  attributes: {
    ...defaultSchema.attributes,
    code: [
      ...(defaultSchema.attributes?.code ?? []),
      ['className', 'language-math', 'math-inline', 'math-display'],
    ],
    span: [
      ...(defaultSchema.attributes?.span ?? []),
      ['className', 'math', 'math-inline'],
    ],
    div: [
      ...(defaultSchema.attributes?.div ?? []),
      ['className', 'math', 'math-display'],
    ],
    svg: ['viewBox', 'width', 'height', 'role', 'ariaLabel', 'preserveAspectRatio'],
    g: ['transform', ['fill', safeColor], ['stroke', safeColor], 'strokeWidth', 'opacity'],
    path: [
      'd',
      ['fill', safeColor],
      ['stroke', safeColor],
      'strokeWidth',
      'strokeLinecap',
      'strokeLinejoin',
      'strokeDasharray',
      ['markerStart', safeLocalMarker],
      ['markerEnd', safeLocalMarker],
      'opacity',
      'transform',
    ],
    circle: ['cx', 'cy', 'r', ['fill', safeColor], ['stroke', safeColor], 'strokeWidth', 'opacity'],
    ellipse: ['cx', 'cy', 'rx', 'ry', ['fill', safeColor], ['stroke', safeColor], 'strokeWidth', 'opacity'],
    line: ['x1', 'y1', 'x2', 'y2', ['stroke', safeColor], 'strokeWidth', 'strokeDasharray', 'opacity'],
    polyline: ['points', 'fill', ['stroke', safeColor], 'strokeWidth', 'strokeLinecap', 'strokeLinejoin', 'opacity'],
    polygon: ['points', ['fill', safeColor], ['stroke', safeColor], 'strokeWidth', 'strokeLinejoin', 'opacity'],
    rect: ['x', 'y', 'width', 'height', 'rx', 'ry', ['fill', safeColor], ['stroke', safeColor], 'strokeWidth', 'opacity'],
    text: ['x', 'y', 'fontSize', 'textAnchor', 'dominantBaseline', ['fill', safeColor], ['stroke', safeColor], 'opacity'],
    tspan: ['x', 'y', 'dx', 'dy', 'fontSize', 'textAnchor', ['fill', safeColor]],
    defs: [],
    marker: ['viewBox', 'markerWidth', 'markerHeight', 'refX', 'refY', 'orient', 'id'],
  },
}

type MessageProps = {
  role: 'user' | 'assistant'
  text: string
}

export function Message({ role, text }: MessageProps) {
  const [copied, setCopied] = useState(false)
  const isAssistant = role === 'assistant'

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <MessageRow align={isAssistant ? 'start' : 'end'} className={isAssistant ? styles.assistantMessage : styles.userMessage}>
      <MessageAvatar className={styles.messageAvatar}>
        {isAssistant ? (
          <Image src="/zij-mascot.png" alt="" width={34} height={34} className={styles.messageAvatarImage} />
        ) : (
          <span className={styles.userAvatar} aria-hidden="true">Y</span>
        )}
      </MessageAvatar>
      <MessageContent className={styles.messageContent}>
        <MessageHeader className={styles.messageHeader}>{isAssistant ? 'Zij' : 'You'}</MessageHeader>
        <Bubble variant={isAssistant ? 'ghost' : 'tinted'} className={styles.messageBubbleFrame}>
          <BubbleContent className={styles.messageBubble}>
            <div className={styles.markdown}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm, remarkMath]}
                rehypePlugins={[rehypeRaw, [rehypeSanitize, svgSchema], [rehypeKatex, { throwOnError: false }]]}
                components={{
                  a: ({ href, children }) => (
                    href ? <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> : <>{children}</>
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            </div>
          </BubbleContent>
        </Bubble>
        <MessageFooter className={styles.messageFooter}>
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className={styles.copyButton}
            aria-label={`Copy ${isAssistant ? 'Zij' : 'your'} message`}
            title={copied ? 'Copied' : 'Copy message'}
            onClick={copyMessage}
          >
            {copied ? <Check data-icon="inline-start" /> : <Copy data-icon="inline-start" />}
          </Button>
          {copied && <span className="sr-only" role="status">Copied to clipboard</span>}
        </MessageFooter>
      </MessageContent>
    </MessageRow>
  )
}
