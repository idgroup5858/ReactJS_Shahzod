import { useEffect, useRef, useState } from 'react'
import { asset, cx } from '../lib/util.js'

/* Ekranga yaqinlashganda yuklanadi va silliq ochiladi */
export default function Img({ src, w, h, alt = '', className, eager = false }) {
  const ref = useRef(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true)
  }, [src])

  return (
    <img
      ref={ref}
      src={asset(src)}
      width={w}
      height={h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      onLoad={() => setLoaded(true)}
      className={cx('transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0', className)}
    />
  )
}
