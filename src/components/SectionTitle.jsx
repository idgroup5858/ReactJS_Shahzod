import Reveal from './Reveal.jsx'

export default function SectionTitle({ eyebrow, title, sub }) {
  return (
    <Reveal className="mb-7 text-center sm:mb-10">
      {eyebrow && (
        <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.2em] text-accent uppercase">
          <span className="h-px w-6 bg-accent/60" />
          {eyebrow}
          <span className="h-px w-6 bg-accent/60" />
        </div>
      )}
      <h2 className="text-[27px] leading-tight font-extrabold tracking-tight sm:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-2 max-w-md text-[15px] text-muted sm:text-base">{sub}</p>}
    </Reveal>
  )
}
