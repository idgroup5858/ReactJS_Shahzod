import { SITE } from '../config.js'
import { PRICE_ICONS } from '../data/site.js'
import { usePrices } from '../lib/prices.jsx'
import { cx, formatPrice } from '../lib/util.js'
import Icon from './Icon.jsx'
import Reveal from './Reveal.jsx'

export default function PriceList() {
  const { status, data } = usePrices()

  if (status === 'loading') {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="skeleton h-56 rounded-3xl" />
        ))}
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="rounded-3xl border border-line bg-surface p-6 text-center">
        <p className="text-muted">Narxlarni yuklab bo’lmadi.</p>
        <a href={`tel:${SITE.phone}`} className="mt-2 inline-block font-bold text-accent">
          Narxni bilish uchun qo’ng’iroq qiling
        </a>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {data.groups.map((group, gi) => (
        <Reveal
          key={group.id ?? gi}
          delay={gi * 90}
          className="flex flex-col rounded-3xl border border-line bg-surface p-4 sm:p-5"
        >
          <div className="mb-3.5 flex items-center gap-3">
            <span className="bg-brand shadow-brand grid size-11 shrink-0 place-items-center rounded-2xl text-white">
              <Icon name={PRICE_ICONS[group.id] ?? 'wrench'} className="size-[22px]" />
            </span>
            <h3 className="text-[17px] leading-snug font-extrabold">{group.title}</h3>
          </div>
          <ul className="flex-1 divide-y divide-line overflow-hidden rounded-2xl bg-surface-2">
            {group.rows.map((row, ri) => (
              <li key={ri} className="flex items-center justify-between gap-3 px-4 py-3.5">
                <span className="text-[15px]">{row.label}</span>
                <strong
                  className={cx(
                    'text-right whitespace-nowrap',
                    row.price == null
                      ? 'rounded-full bg-accent/10 px-2.5 py-1 text-[13px] font-bold text-accent'
                      : 'text-[17px] font-extrabold text-accent tabular-nums',
                  )}
                >
                  {formatPrice(row.price)}
                </strong>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  )
}
