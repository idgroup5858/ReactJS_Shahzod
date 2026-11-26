import { useCallback, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import Img from '../components/Img.jsx'
import ProductSheet from '../components/ProductSheet.jsx'
import Reveal from '../components/Reveal.jsx'
import { SITE } from '../config.js'
import { PRODUCTS } from '../data/products.js'
import { CATEGORIES } from '../data/site.js'
import { cx } from '../lib/util.js'

const COUNTS = PRODUCTS.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] ?? 0) + 1 }), {
  all: PRODUCTS.length,
})
const TABS = CATEGORIES.filter((c) => COUNTS[c.id])

export default function ProductsPage() {
  const [cat, setCat] = useState('all')
  const [selected, setSelected] = useState(null)
  const closeProduct = useCallback(() => setSelected(null), [])
  const anchor = useRef(null)

  const list = cat === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === cat)

  const pick = (id) => {
    setCat(id)
    /* Ro'yxat qisqarsa, foydalanuvchi bo'sh joyda qolib ketmasin */
    const top = anchor.current.getBoundingClientRect().top + window.scrollY - 60
    if (window.scrollY > top) window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className="mx-auto max-w-5xl px-4 pt-[calc(5.5rem+env(safe-area-inset-top))] sm:px-6 sm:pt-28">
      <div className="text-center">
        <div className="animate-fade-up mb-3 inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] text-accent uppercase">
          <span className="h-px w-6 bg-accent/60" />
          Katalog
          <span className="h-px w-6 bg-accent/60" />
        </div>
        <h1 className="animate-fade-up text-4xl font-extrabold tracking-tight [animation-delay:80ms] sm:text-5xl">
          Mahsulotlar
        </h1>
        <p className="animate-fade-up mt-2 text-muted [animation-delay:160ms]">Biz o’rnatadigan Hikvision jihozlari</p>
      </div>

      <div ref={anchor} />
      <div className="animate-fade-up sticky top-[calc(3.5rem+env(safe-area-inset-top))] z-30 -mx-4 mt-6 bg-bg/85 py-3 backdrop-blur-xl [animation-delay:240ms] sm:-mx-6">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 sm:flex-wrap sm:justify-center sm:px-6">
          {TABS.map((c) => {
            const active = c.id === cat
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => pick(c.id)}
                aria-pressed={active}
                className={cx(
                  'flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-bold transition active:scale-95',
                  active ? 'bg-brand shadow-brand border-transparent text-white' : 'border-line bg-surface text-muted hover:text-ink',
                )}
              >
                {c.title}
                <span
                  className={cx(
                    'min-w-5 rounded-full px-1.5 text-[11px] tabular-nums',
                    active ? 'bg-white/20' : 'bg-surface-2',
                  )}
                >
                  {COUNTS[c.id]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div key={cat} className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {list.map((p, i) => (
          <Reveal key={p.id} delay={(i % 4) * 60}>
            <button
              type="button"
              onClick={() => setSelected(p)}
              className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-line bg-surface text-left transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl active:scale-[.97]"
            >
              <div className="flex aspect-square w-full items-center justify-center bg-white p-4">
                <Img
                  src={p.src}
                  w={p.w}
                  h={p.h}
                  alt={p.title}
                  className="max-h-full w-auto object-contain transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h3 className="text-[14px] leading-snug font-extrabold [overflow-wrap:anywhere]">{p.title}</h3>
                <p className="mt-1 line-clamp-2 text-[12.5px] leading-snug text-muted">{p.desc}</p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 text-center">
        <a
          href={`tel:${SITE.phone}`}
          className="bg-brand shadow-brand inline-flex items-center gap-3.5 rounded-2xl px-6 py-3.5 text-white transition active:scale-[.98]"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-white/15">
            <Icon name="phone" className="size-5" />
          </span>
          <span className="text-left leading-tight">
            <b className="block text-[17px]">Qo’ng’iroq qilish</b>
            <span className="text-sm font-semibold tabular-nums opacity-90">{SITE.phoneLabel}</span>
          </span>
        </a>
      </Reveal>

      <ProductSheet product={selected} onClose={closeProduct} />
    </div>
  )
}
