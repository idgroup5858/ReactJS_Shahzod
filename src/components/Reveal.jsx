import { useEffect, useRef } from 'react'

/* Scroll qilganda element ekranga kirishi bilan silliq paydo bo'ladi.
   variant: up | scale | left | right; delay — ketma-ket chiqish uchun (ms).
   Bitta umumiy IntersectionObserver ishlatiladi. */

let observer = null
function getObserver() {
  if (!observer) {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
    )
  }
  return observer
}

export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, style, children, ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = getObserver()
    obs.observe(el)
    return () => obs.unobserve(el)
  }, [])

  return (
    <Tag ref={ref} data-reveal={variant} style={{ '--d': `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
