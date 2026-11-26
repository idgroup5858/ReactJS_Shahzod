import { useLocation } from 'react-router-dom'
import { SITE } from '../config.js'
import { cx } from '../lib/util.js'
import useScrolled from '../lib/useScrolled.js'
import Icon from './Icon.jsx'

/* Telefonda pastda turadigan tezkor aloqa paneli (hero'dan o'tgach chiqadi) */
export default function BottomBar() {
  const { pathname } = useLocation()
  const scrolled = useScrolled(520)
  const show = scrolled || pathname !== '/'

  return (
    <div
      className={cx(
        'fixed inset-x-0 bottom-0 z-40 px-3 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] transition-transform duration-500 ease-[cubic-bezier(.2,.8,.2,1)] sm:hidden',
        show ? 'translate-y-0' : 'translate-y-[130%]',
      )}
    >
      <div className="flex gap-2 rounded-[22px] border border-line bg-bg/85 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <a
          href={`tel:${SITE.phone}`}
          className="bg-brand flex flex-1 items-center justify-center gap-2 rounded-2xl py-3.5 font-bold text-white transition active:scale-[.97]"
        >
          <Icon name="phone" className="size-5" />
          Qo’ng’iroq qilish
        </a>
        <a
          href={SITE.telegram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Telegram"
          className="grid w-14 place-items-center rounded-2xl bg-[#229ed9] text-white transition active:scale-[.94]"
        >
          <Icon name="telegram" className="size-6" />
        </a>
        <a
          href={SITE.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="grid w-14 place-items-center rounded-2xl bg-[linear-gradient(45deg,#f9a03f,#e1306c_50%,#7b3fe4)] text-white transition active:scale-[.94]"
        >
          <Icon name="instagram" className="size-6" />
        </a>
      </div>
    </div>
  )
}
