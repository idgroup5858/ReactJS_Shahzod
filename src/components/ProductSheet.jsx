import { useState } from 'react'
import { SITE } from '../config.js'
import { CATEGORIES } from '../data/site.js'
import Icon from './Icon.jsx'
import Img from './Img.jsx'
import Sheet from './Sheet.jsx'

export default function ProductSheet({ product, onClose }) {
  /* Yopilish animatsiyasi davomida oxirgi mahsulot ko'rinib turadi */
  const [p, setP] = useState(product)
  if (product && product !== p) setP(product)
  if (!p) return null
  const category = CATEGORIES.find((c) => c.id === p.category)?.title

  return (
    <Sheet open={!!product} onClose={onClose} title={p.title} subtitle={category}>
      <div className="flex aspect-square items-center justify-center rounded-3xl bg-white p-8 sm:aspect-[4/3]">
        <Img src={p.src} w={p.w} h={p.h} alt={p.title} className="max-h-full w-auto object-contain" />
      </div>
      <p className="mt-4 text-[15px] leading-relaxed">{p.desc}</p>
      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        <a
          href={`tel:${SITE.phone}`}
          className="bg-brand shadow-brand flex items-center justify-center gap-2.5 rounded-2xl px-5 py-4 font-bold text-white transition active:scale-[.98]"
        >
          <Icon name="phone" className="size-5" />
          Qo’ng’iroq qilish
        </a>
        <a
          href={SITE.telegram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2.5 rounded-2xl bg-[#229ed9] px-5 py-4 font-bold text-white transition active:scale-[.98]"
        >
          <Icon name="telegram" className="size-5" />
          Telegramda so’rash
        </a>
      </div>
    </Sheet>
  )
}
