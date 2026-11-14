'use client'

import * as React from 'react'
import { MessageScroller as Primitive } from '@shadcn/react/message-scroller'
import { cn } from '@/lib/utils'

function MessageScrollerProvider(props: React.ComponentProps<typeof Primitive.Provider>) {
  return <Primitive.Provider {...props} />
}

function MessageScroller({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Root>) {
  return (
    <Primitive.Root
      data-slot="message-scroller"
      className={cn('relative flex size-full min-h-0 flex-col overflow-hidden', className)}
      {...props}
    />
  )
}

function MessageScrollerViewport({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Viewport>) {
  return (
    <Primitive.Viewport
      data-slot="message-scroller-viewport"
      className={cn('size-full min-h-0 min-w-0 overflow-y-auto overscroll-contain', className)}
      {...props}
    />
  )
}

function MessageScrollerContent({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Content
      data-slot="message-scroller-content"
      className={cn('flex h-max min-h-full flex-col gap-4', className)}
      {...props}
    />
  )
}

function MessageScrollerItem({
  className,
  ...props
}: React.ComponentProps<typeof Primitive.Item>) {
  return (
    <Primitive.Item
      data-slot="message-scroller-item"
      className={cn('min-w-0 shrink-0', className)}
      {...props}
    />
  )
}

export {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
}
