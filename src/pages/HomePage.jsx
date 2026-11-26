import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import GallerySheet from '../components/GallerySheet.jsx'
import Icon from '../components/Icon.jsx'
import Img from '../components/Img.jsx'
import PriceList from '../components/PriceList.jsx'
import Reveal from '../components/Reveal.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import { SITE } from '../config.js'
import { GALLERIES } from '../data/galleries.js'
import { IMAGES } from '../data/images.js'
import { PRODUCTS } from '../data/products.js'
import { HIK_FEATURES, INSTALL, IVMS_FEATURES, REPAIR } from '../data/site.js'
import { cx } from '../lib/util.js'

export default function HomePage() {
  const [gallery, setGallery] = useState(null)
  const closeGallery = useCallback(() => setGallery(null), [])

  return (
    <>
      <Hero />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <HikConnect />
        <Ivms />
        <Install onOpen={setGallery} />
        <Repair />
        <Prices />
        <ProductsCta />
        <Contact />
      </div>
      <GallerySheet galleryKey={gallery} onClose={closeGallery} />
    </>
  )
}

/* ─── Hero ─────────────────────────────────────────────── */

const FLOATING = [
  { icon: 'dome', cls: 'grid left-3 top-[6.5rem] sm:left-[9%] sm:top-36', delay: '0s' },
  { icon: 'bellRing', cls: 'grid right-3 top-[7.5rem] sm:right-[9%] sm:top-40', delay: '-2s' },
  { icon: 'barrier', cls: 'hidden sm:grid left-[13%] top-[64%]', delay: '-4s' },
  { icon: 'scanFace', cls: 'hidden sm:grid right-[13%] top-[60%]', delay: '-3s' },
]

const HERO_CHIPS = [
  { icon: 'shieldCheck', text: '1 yil kafolat' },
  { icon: 'smartphone', text: 'Telefondan kuzatuv' },
  { icon: 'mapPin', text: 'Urganch bo’ylab o’rnatish' },
]

function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(6.5rem+env(safe-area-inset-top))] pb-6 sm:pt-36 sm:pb-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-grid absolute inset-0" />
        <div className="animate-glow absolute top-[-180px] left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--glow),transparent_65%)]" />
        {FLOATING.map((f) => (
          <span
            key={f.icon}
            className={cx(
              'animate-float absolute size-11 place-items-center rounded-2xl border border-line bg-surface/80 text-accent shadow-lg backdrop-blur',
              f.cls,
            )}
            style={{ animationDelay: f.delay }}
          >
            <Icon name={f.icon} className="size-5" />
          </span>
        ))}
      </div>

      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <div className="animate-fade-up inline-flex rounded-2xl bg-white px-5 py-3 shadow-lg ring-1 shadow-black/20 ring-black/5">
          <Img src={IMAGES.logo.src} w={IMAGES.logo.w} h={IMAGES.logo.h} alt="Hikvision" eager className="h-6 w-auto sm:h-7" />
        </div>

        <h1 className="animate-fade-up mt-7 text-[40px] leading-[1.05] font-extrabold tracking-tight [animation-delay:90ms] sm:text-6xl">
          Shoxzodbek <span className="text-brand">Hikvision</span> System
        </h1>

        <p className="animate-fade-up mt-6 inline-flex items-center gap-3 rounded-full border border-line bg-surface/70 py-2 pr-5 pl-2 text-left text-[15px] leading-snug font-bold backdrop-blur [animation-delay:180ms] sm:text-lg">
          <span className="bg-brand shadow-brand grid size-9 shrink-0 place-items-center rounded-full text-white">
            <Icon name="shieldCheck" className="size-5" />
          </span>
          Xavfsizligingiz biz uchun birinchi o’rinda
        </p>

        <div className="animate-fade-up mt-8 grid gap-3 [animation-delay:270ms] sm:flex sm:justify-center">
          <a
            href={`tel:${SITE.phone}`}
            className="bg-brand shadow-brand flex items-center justify-center gap-3.5 rounded-2xl px-6 py-3.5 text-white transition active:scale-[.98] sm:hover:-translate-y-0.5"
          >
            <span className="relative grid size-10 place-items-center rounded-xl bg-white/15">
              <span className="animate-ping-soft absolute inset-0 rounded-xl bg-white/30" />
              <Icon name="phone" className="relative size-5" />
            </span>
            <span className="text-left leading-tight">
              <b className="block text-[17px]">Qo’ng’iroq qilish</b>
              <span className="text-sm font-semibold tabular-nums opacity-90">{SITE.phoneLabel}</span>
            </span>
          </a>
          <Link
            to="/mahsulotlar"
            className="flex items-center justify-center gap-2.5 rounded-2xl border-2 border-accent/70 px-6 py-4 font-bold text-accent transition hover:bg-accent/10 active:scale-[.98]"
          >
            <Icon name="package" className="size-5" />
            Mahsulotlar
          </Link>
        </div>

        <ul className="animate-fade-up mt-7 flex flex-wrap justify-center gap-2 [animation-delay:360ms]">
          {HERO_CHIPS.map((c) => (
            <li
              key={c.text}
              className="flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[13px] font-bold text-muted backdrop-blur"
            >
              <Icon name={c.icon} className="size-4 text-accent" />
              {c.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ─── Kuzatuv ──────────────────────────────────────────── */

function FeatureList({ items, variant = 'right' }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((f, i) => (
        <Reveal
          as="li"
          key={f.text}
          variant={variant}
          delay={i * 80}
          className="flex items-center gap-3 rounded-2xl bg-surface-2 p-3"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
            <Icon name={f.icon} className="size-5" />
          </span>
          <span className="text-[15px] leading-snug font-semibold">{f.text}</span>
        </Reveal>
      ))}
    </ul>
  )
}

function HikConnect() {
  const { hikconnect: shot, 'hikconnect-icon': icon } = IMAGES
  return (
    <section id="kuzatuv" className="scroll-mt-20 pt-16 sm:pt-24">
      <SectionTitle
        eyebrow="Hik-Connect"
        title="Telefondan kuzatuv"
        sub="Kameralaringizni istalgan joydan telefoningizda ko’ring"
      />
      <Reveal variant="scale" className="overflow-hidden rounded-[28px] border border-line bg-surface md:grid md:grid-cols-2">
        <div className="relative">
          <Img src={shot.src} w={shot.w} h={shot.h} alt="Hik-Connect" className="aspect-[640/421] w-full object-cover md:h-full" />
          <div className="absolute bottom-3 left-3 flex items-center gap-2.5 rounded-2xl bg-black/60 py-2 pr-4 pl-2 text-white backdrop-blur-md">
            <Img src={icon.src} w={icon.w} h={icon.h} alt="" className="size-9 rounded-xl" />
            <span className="leading-tight">
              <b className="block text-sm">Hik-Connect</b>
              <span className="text-[11px] text-white/75">Mobil ilova</span>
            </span>
          </div>
        </div>
        <div className="p-5 sm:p-7 md:self-center">
          <h3 className="text-xl font-extrabold tracking-tight">Hamma narsa bir ilovada</h3>
          <FeatureList items={HIK_FEATURES} />
        </div>
      </Reveal>
    </section>
  )
}

function Ivms() {
  const { ivms: shot, 'ivms-icon': icon } = IMAGES
  return (
    <section className="pt-16 sm:pt-24">
      <SectionTitle
        eyebrow="iVMS-4200"
        title="Kompyuterdan kuzatuv"
        sub="Katta ekranda barcha kameralarni bir vaqtda ko’ring"
      />
      <div className="grid gap-4 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-6">
        <Reveal variant="left" className="rounded-[22px] border border-white/10 bg-[#0b0f17] p-2 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-1.5 px-2 pt-1 pb-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[11px] font-bold text-white/60">iVMS-4200</span>
          </div>
          <Img src={shot.src} w={shot.w} h={shot.h} alt="iVMS-4200" className="w-full rounded-xl" />
        </Reveal>

        <Reveal variant="right" className="rounded-[28px] border border-line bg-surface p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <Img src={icon.src} w={icon.w} h={icon.h} alt="" className="size-11 object-contain" />
            <h3 className="text-xl font-extrabold tracking-tight">Kompyuter dasturi</h3>
          </div>
          <FeatureList items={IVMS_FEATURES} />
          <div className="bg-brand shadow-brand mt-4 flex items-center gap-3.5 rounded-2xl p-4 text-white">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-white/15">
              <Icon name="shieldCheck" className="size-6" />
            </span>
            <span>
              <b className="block text-lg leading-tight font-extrabold">Kafolat: 1 yil</b>
              <span className="text-sm text-white/85">Ishimizga va jihozlarga kafolat beramiz</span>
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Xizmatlar ────────────────────────────────────────── */

function Install({ onOpen }) {
  return (
    <section id="xizmatlar" className="scroll-mt-20 pt-16 sm:pt-24">
      <SectionTitle eyebrow="Xizmatlar" title="Kamera o’rnatish" sub="Namunaviy turlar" />
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {INSTALL.map((s, i) => {
          const g = GALLERIES[s.gallery]
          const cover = g.items[0]
          return (
            <Reveal key={s.gallery} delay={(i % 4) * 70}>
              <button
                type="button"
                onClick={() => onOpen(s.gallery)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-line bg-surface text-left transition duration-300 hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl active:scale-[.97]"
              >
                <div className="relative flex aspect-[4/3] w-full items-center justify-center bg-white p-3">
                  <Img
                    src={cover.src}
                    w={cover.w}
                    h={cover.h}
                    alt={s.title}
                    className="max-h-full w-auto object-contain transition duration-500 group-hover:scale-105"
                  />
                  <span className="bg-brand shadow-brand absolute top-2.5 left-2.5 grid size-9 place-items-center rounded-xl text-white">
                    <Icon name={s.icon} className="size-[18px]" />
                  </span>
                  <span className="absolute right-2.5 bottom-2.5 flex items-center gap-1 rounded-full bg-black/70 px-2 py-0.5 text-[11px] font-bold text-white">
                    <Icon name="image" className="size-3" />
                    {g.items.length}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3.5">
                  <h3 className="text-[15px] leading-snug font-extrabold">{s.title}</h3>
                  <p className="mt-1 flex-1 text-[13px] leading-snug text-muted">{s.desc}</p>
                  <span className="mt-2.5 inline-flex items-center gap-0.5 text-[13px] font-bold text-accent">
                    Rasmlarni ko’rish
                    <Icon name="chevronRight" className="size-4 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            </Reveal>
          )
        })}
      </div>
    </section>
  )
}

function Repair() {
  return (
    <section className="pt-16 sm:pt-24">
      <SectionTitle
        eyebrow="Servis"
        title="Ta’mirlash va sozlash"
        sub="Nosoz yoki noto’g’ri sozlangan tizimni tuzatamiz"
      />
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        {REPAIR.map((r, i) => (
          <Reveal
            key={r.title}
            delay={(i % 3) * 80}
            className="flex items-start gap-4 rounded-3xl border border-line bg-surface p-4 transition hover:border-accent/50 sm:p-5"
          >
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
              <Icon name={r.icon} className="size-6" />
            </span>
            <div>
              <h3 className="leading-snug font-extrabold">{r.title}</h3>
              <p className="mt-1 text-sm leading-snug text-muted">{r.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function Prices() {
  return (
    <section id="narxlar" className="scroll-mt-20 pt-16 sm:pt-24">
      <SectionTitle eyebrow="Narxlar" title="O’rnatish xizmati" sub="Xizmat turi va hudud bo’yicha narxlar" />
      <PriceList />
    </section>
  )
}

/* ─── Mahsulotlar / Aloqa ──────────────────────────────── */

const PREVIEW = ['03', '11', '12', '15'].map((id) => PRODUCTS.find((p) => p.id === id))

function ProductsCta() {
  return (
    <section className="pt-16 sm:pt-24">
      <Reveal variant="scale">
        <Link
          to="/mahsulotlar"
          className="group bg-brand shadow-brand relative block overflow-hidden rounded-[28px] p-5 text-white sm:p-8"
        >
          <span aria-hidden className="absolute -top-16 -right-10 size-48 rounded-full bg-white/10 transition duration-700 group-hover:scale-110" />
          <span aria-hidden className="absolute -bottom-24 -left-12 size-60 rounded-full bg-black/10" />
          <div className="relative flex items-center gap-4">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-white/15 backdrop-blur">
              <Icon name="package" className="size-7" />
            </span>
            <span className="min-w-0 flex-1">
              <b className="block text-[22px] leading-tight font-extrabold">Mahsulotlar</b>
              <span className="text-sm leading-snug text-white/85">
                Kamera, NVR, domofon, shlagbaum, turniket va boshqa jihozlar
              </span>
            </span>
          </div>
          <div className="relative mt-5 flex items-center justify-between gap-3">
            <div className="flex -space-x-3">
              {PREVIEW.map((p) => (
                <span key={p.id} className="grid size-11 place-items-center overflow-hidden rounded-full bg-white p-1.5 ring-2 ring-[#f0303d]">
                  <Img src={p.src} w={p.w} h={p.h} className="max-h-full w-auto object-contain" />
                </span>
              ))}
              <span className="grid size-11 place-items-center rounded-full bg-white/20 text-xs font-extrabold ring-2 ring-[#f0303d] backdrop-blur">
                +{PRODUCTS.length - PREVIEW.length}
              </span>
            </div>
            <span className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2.5 text-sm font-extrabold text-[#e60012] transition-[gap] group-hover:gap-2.5">
              Ko’rish <Icon name="arrowRight" className="size-4" />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  )
}

function Contact() {
  return (
    <section id="aloqa" className="scroll-mt-20 pt-16 sm:pt-24">
      <SectionTitle eyebrow="Aloqa" title="Biz bilan bog’laning" />
      <Reveal className="mx-auto max-w-2xl space-y-3 rounded-[28px] border border-line bg-surface p-3.5 sm:p-5">
        <a
          href={`tel:${SITE.phone}`}
          className="group flex items-center gap-4 rounded-2xl bg-surface-2 p-4 transition active:scale-[.98]"
        >
          <span className="bg-brand shadow-brand relative grid size-12 shrink-0 place-items-center rounded-2xl text-white">
            <span className="animate-ping-soft absolute inset-0 rounded-2xl bg-accent/40" />
            <Icon name="phone" className="relative size-6" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-[13px] font-semibold text-muted">Telefon</span>
            <b className="block text-lg font-extrabold tabular-nums">{SITE.phoneLabel}</b>
          </span>
          <Icon name="chevronRight" className="size-5 text-muted transition group-hover:translate-x-1" />
        </a>

        <div className="grid grid-cols-2 gap-3">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(45deg,#f9a03f,#e1306c_50%,#7b3fe4)] py-3.5 font-bold text-white transition active:scale-[.97]"
          >
            <Icon name="instagram" className="size-5" /> Instagram
          </a>
          <a
            href={SITE.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl bg-[#229ed9] py-3.5 font-bold text-white transition active:scale-[.97]"
          >
            <Icon name="telegram" className="size-5" /> Telegram
          </a>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-surface-2 p-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent">
            <Icon name="mapPin" className="size-6" />
          </span>
          <span>
            <span className="text-[13px] font-semibold text-muted">Manzil</span>
            <b className="block leading-snug font-bold">{SITE.address}</b>
          </span>
        </div>
      </Reveal>
    </section>
  )
}
