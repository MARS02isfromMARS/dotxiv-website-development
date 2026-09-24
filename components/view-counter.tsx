'use client'

import { useEffect, useState } from 'react'

export function ViewCounter({ scope }: { scope: string }) {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => {
    fetch(`/api/views?scope=${encodeURIComponent(scope)}`, { method: 'POST' }).then((response) => response.json()).then((data) => setCount(data.count)).catch(() => setCount(null))
  }, [scope])
  return <>{count === null ? '—' : count.toLocaleString()}</>
}
