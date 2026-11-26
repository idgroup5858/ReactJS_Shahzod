import { useRef } from 'react'
import { SITE } from '../config.js'

/* © yozuvini 10 marta tez bosish (oraliq 1.2 s dan oshmasin) — yashirin narx paneli */
const TAPS = 10
const GAP_MS = 1200

export default function Footer({ onSecret }) {
  const taps = useRef({ count: 0, last: 0 })

  const onTap = () => {
    const now = Date.now()
    const t = taps.current
    t.count = now - t.last < GAP_MS ? t.count + 1 : 1
    t.last = now
    if (t.count >= TAPS) {
      t.count = 0
      onSecret()
    }
  }

  return (
    <footer className="mx-auto max-w-5xl px-4 pt-14 pb-28 text-center sm:px-6 sm:pb-12">
      <div className="mx-auto mb-5 h-px max-w-xs bg-linear-to-r from-transparent via-line to-transparent" />
      <p onClick={onTap} className="inline-block cursor-default touch-manipulation px-4 py-2 text-sm text-muted select-none">
        © {SITE.name}
      </p>
    </footer>
  )
}
