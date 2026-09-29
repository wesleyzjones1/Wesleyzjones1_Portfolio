import { useEffect, useRef, useState } from 'react'

function shouldSkipAnimation() {
  if (typeof window === 'undefined') return true
  if (typeof IntersectionObserver === 'undefined') return true
  return Boolean(window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
}

/**
 * Fades children up as they scroll into view. Renders immediately when the
 * browser prefers reduced motion or IntersectionObserver is unavailable.
 */
export default function Reveal({ className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(shouldSkipAnimation)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return undefined
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect() }
    }, { rootMargin: '0px 0px -5% 0px', threshold: 0.01 })
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return (
    <div ref={ref} className={`reveal${visible ? ' is-visible' : ''} ${className}`.trim()} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </div>
  )
}
