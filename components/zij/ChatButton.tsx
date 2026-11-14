'use client'

import Image from 'next/image'
import { Dialog } from '@base-ui/react/dialog'
import styles from './zij.module.css'

export function ChatButton() {
  return (
    <Dialog.Trigger className={styles.chatButton} type="button" aria-label="Ask Zij" title="Ask Zij">
      <Image src="/zij-mascot.png" alt="" fill sizes="68px" className={styles.chatButtonImage} />
      <span className="sr-only">Ask Zij</span>
    </Dialog.Trigger>
  )
}
