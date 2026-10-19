import { useEffect, useRef, useState } from 'react'

function shouldSkipAnimation() {
  if (typeof window === 'undefined') return true
  return typeof IntersectionObserver === 'undefined'
}

/**
 * Fades children in as they scroll into view, by fading a cover away above them
 * rather than fading the children themselves (see .reveal in global.css).
 * Renders immediately when IntersectionObserver is unavailable.
 */
export default function Reveal({ className = '', delay = 0, style, children, ...rest }) {
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
    <div ref={ref} className={`reveal${visible ? ' is-visible' : ''} ${className}`.trim()} style={delay ? { ...style, '--reveal-delay': `${delay}ms` } : style} {...rest}>
      {children}
    </div>
  )
}
