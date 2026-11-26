import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SITE } from '../config.js'
import { cx } from '../lib/util.js'
import useScrolled from '../lib/useScrolled.js'
import Icon from './Icon.jsx'

export default function Header() {
  const scrolled = useScrolled(12)
  const { pathname, key } = useLocation()
  const navigate = useNavigate()
  const isHome = pathname === '/'
  const solid = scrolled || !isHome

  const back = () => (key !== 'default' ? navigate(-1) : navigate('/'))

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-40 border-b pt-[env(safe-area-inset-top)] transition-colors duration-300',
        solid ? 'border-line bg-bg/80 backdrop-blur-xl' : 'border-transparent',
      )}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center gap-3 px-4 sm:px-6">
        {isHome ? (
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2.5 text-left"
          >
            <span className="bg-brand shadow-brand grid size-9 place-items-center rounded-xl text-white">
              <Icon name="shieldCheck" className="size-5" />
            </span>
            <span className="leading-none">
              <b className="block text-[15px] font-extrabold tracking-tight">Shoxzodbek</b>
              <span className="text-[11px] font-bold tracking-wide text-muted">Hikvision System</span>
            </span>
          </button>
        ) : (
          <button
            type="button"
            onClick={back}
            className="flex items-center gap-2 rounded-full bg-surface-2 py-2 pr-4 pl-3 text-sm font-bold transition active:scale-95"
          >
            <Icon name="arrowLeft" className="size-4" /> Orqaga
          </button>
        )}

        <nav className="ml-auto flex items-center gap-1.5">
          {isHome && (
            <Link
              to="/mahsulotlar"
              className="hidden rounded-full px-4 py-2 text-sm font-bold text-muted transition hover:text-ink sm:block"
            >
              Mahsulotlar
            </Link>
          )}
          <a
            href={`tel:${SITE.phone}`}
            aria-label="Qo’ng’iroq qilish"
            className="bg-brand shadow-brand flex size-10 items-center justify-center gap-2 rounded-full text-sm font-bold text-white transition active:scale-95 sm:w-auto sm:px-4"
          >
            <Icon name="phone" className="size-4" />
            <span className="hidden tabular-nums sm:inline">{SITE.phoneLabel}</span>
          </a>
        </nav>
      </div>
      <div className="scroll-progress bg-brand absolute inset-x-0 -bottom-px h-[2px]" />
    </header>
  )
}
