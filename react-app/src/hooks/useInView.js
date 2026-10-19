import { useEffect, useState } from 'react'

/**
 * True while the element is on (or within `rootMargin` of) the screen.
 * Used to pause animations nobody can see, so they cost nothing off screen.
 */
export function useInView(ref, rootMargin = '100px') {
  const [inView, setInView] = useState(() => typeof IntersectionObserver === 'undefined')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])

  return inView
}
