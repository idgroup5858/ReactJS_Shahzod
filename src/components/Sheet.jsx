import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { cx } from '../lib/util.js'
import Icon from './Icon.jsx'

/* Telefonda pastdan chiqadigan oyna (bottom-sheet), kompyuterda — markazda.
   Yopish: ✕, fonni bosish, Escape yoki tepadagi tutqichni pastga surish. */
export default function Sheet({ open, onClose, title, subtitle, children, footer }) {
  const [mounted, setMounted] = useState(open)
  const [shown, setShown] = useState(false)
  const [dragY, setDragY] = useState(0)
  const drag = useRef(null)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const raf = requestAnimationFrame(() => requestAnimationFrame(() => setShown(true)))
      return () => cancelAnimationFrame(raf)
    }
    setShown(false)
    const t = setTimeout(() => setMounted(false), 320)
    return () => clearTimeout(t)
  }, [open])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!mounted) return null

  const onPointerDown = (e) => {
    if (e.target.closest('button')) return
    drag.current = { y: e.clientY, id: e.pointerId }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    setDragY(Math.max(0, e.clientY - drag.current.y))
  }
  const onPointerUp = () => {
    if (!drag.current) return
    drag.current = null
    if (dragY > 110) onClose()
    setDragY(0)
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div
        onClick={onClose}
        className={cx(
          'absolute inset-0 bg-black/60 backdrop-blur-[3px] transition-opacity duration-300',
          shown ? 'opacity-100' : 'opacity-0',
        )}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        style={dragY ? { translate: `0 ${dragY}px`, transition: 'none' } : undefined}
        className={cx(
          'relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-[28px] border border-line bg-bg shadow-2xl sm:max-w-2xl sm:rounded-[28px]',
          'transition-[translate,opacity] duration-300 ease-[cubic-bezier(.2,.8,.2,1)]',
          shown ? 'translate-y-0 opacity-100' : 'translate-y-full sm:translate-y-10 sm:opacity-0',
        )}
      >
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          className="shrink-0 cursor-grab touch-none select-none px-5 pt-2.5 pb-3 active:cursor-grabbing"
        >
          <div className="mx-auto mb-3 h-1.5 w-11 rounded-full bg-muted/40 sm:hidden" />
          <div className="flex items-start gap-3">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-extrabold leading-tight tracking-tight">{title}</h3>
              {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Yopish"
              className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-ink transition hover:bg-accent hover:text-white active:scale-90"
            >
              <Icon name="x" className="size-[18px]" />
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
          {children}
        </div>
        {footer && (
          <div className="shrink-0 border-t border-line bg-bg/95 px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
