import { useEffect, useRef, useState } from 'react'
import { SITE } from '../config.js'
import { GALLERIES } from '../data/galleries.js'
import { cx } from '../lib/util.js'
import Icon from './Icon.jsx'
import Img from './Img.jsx'
import Sheet from './Sheet.jsx'

/* Xizmat kartasi bosilganda — namunalar karuseli (barmoq bilan suriladi) */
export default function GallerySheet({ galleryKey, onClose }) {
  /* Yopilish animatsiyasi davomida oxirgi galereya ko'rinib turadi */
  const [shownKey, setShownKey] = useState(galleryKey)
  const [index, setIndex] = useState(0)
  if (galleryKey && galleryKey !== shownKey) {
    setShownKey(galleryKey)
    setIndex(0)
  }
  const gallery = shownKey ? GALLERIES[shownKey] : null

  const track = useRef(null)
  useEffect(() => {
    track.current?.scrollTo({ left: 0 })
  }, [shownKey])

  if (!gallery) return null
  const [title] = gallery.title.split(' — ')
  const items = gallery.items

  const goTo = (i) => {
    const el = track.current
    if (!el) return
    const next = Math.max(0, Math.min(items.length - 1, i))
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
  }
  const onScroll = () => {
    const el = track.current
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  return (
    <Sheet open={!!galleryKey} onClose={onClose} title={title} subtitle={`Namunalar · ${items.length} ta rasm`}>
      <div className="relative">
        <div
          ref={track}
          onScroll={onScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-3xl"
        >
          {items.map((it) => (
            <figure key={it.src} className="w-full shrink-0 snap-center">
              <div className="flex aspect-square items-center justify-center rounded-3xl bg-white p-6 sm:aspect-[4/3]">
                <Img src={it.src} w={it.w} h={it.h} alt={it.caption} className="max-h-full w-auto object-contain" />
              </div>
            </figure>
          ))}
        </div>

        <span className="absolute top-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-bold text-white tabular-nums backdrop-blur">
          {index + 1} / {items.length}
        </span>

        <button
          type="button"
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Oldingi"
          className="absolute top-1/2 left-2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-accent disabled:opacity-0 sm:grid"
        >
          <Icon name="chevronLeft" />
        </button>
        <button
          type="button"
          onClick={() => goTo(index + 1)}
          disabled={index === items.length - 1}
          aria-label="Keyingi"
          className="absolute top-1/2 right-2 hidden size-10 -translate-y-1/2 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-accent disabled:opacity-0 sm:grid"
        >
          <Icon name="chevronRight" />
        </button>
      </div>

      <p key={index} className="animate-fade-in mt-3 min-h-[3rem] text-center text-[15px] font-semibold">
        {items[index]?.caption}
      </p>

      <div className="no-scrollbar -mx-5 mt-2 flex gap-2 overflow-x-auto px-5 pb-1">
        {items.map((it, i) => (
          <button
            key={it.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={it.caption}
            className={cx(
              'grid size-16 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white p-1.5 ring-2 transition',
              i === index ? 'ring-accent' : 'opacity-60 ring-transparent hover:opacity-100',
            )}
          >
            <Img src={it.src} w={it.w} h={it.h} className="max-h-full w-auto object-contain" />
          </button>
        ))}
      </div>

      <a
        href={`tel:${SITE.phone}`}
        className="bg-brand shadow-brand mt-5 flex items-center justify-center gap-2.5 rounded-2xl px-5 py-4 font-bold text-white transition active:scale-[.98]"
      >
        <Icon name="phone" className="size-5" />
        O’rnatish uchun qo’ng’iroq qiling
      </a>
    </Sheet>
  )
}
