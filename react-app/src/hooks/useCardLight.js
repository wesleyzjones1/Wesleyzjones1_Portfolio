import { useEffect } from 'react'

/** How far from a .near-light element's edge, in px, the mouse starts to light it. */
const RANGE = 200

/**
 * Card light: a glow that follows the mouse (drawn by .lift::before and
 * .near-light::before in global.css). Sets --mx/--my, the pointer relative to
 * the element.
 * - .lift cards light up while the mouse is on them (CSS :hover).
 * - .near-light elements (the name in the header) light up as the mouse comes
 *   near, brighter the closer it is: --light, 0–1.
 * Runs at most once a frame, and only the lit elements repaint. Mice only;
 * touch screens have no pointer to follow.
 */
export function useCardLight() {
  useEffect(() => {
    if (!window.matchMedia?.('(hover: hover) and (pointer: fine)').matches) return
    let x = 0, y = 0, target = null, inside = false, frame = 0
    let lit = new Set()

    const update = () => {
      frame = 0
      // Read every position first, then write, so the page is laid out once.
      const card = inside ? target?.closest('.lift') : null
      const writes = card ? [[card, card.getBoundingClientRect(), null]] : []
      if (inside) {
        for (const el of document.querySelectorAll('.near-light')) {
          const r = el.getBoundingClientRect()
          const d = Math.hypot(Math.max(r.left - x, 0, x - r.right), Math.max(r.top - y, 0, y - r.bottom))
          if (d < RANGE) writes.push([el, r, 1 - (d / RANGE) ** 2])
        }
      }
      const next = new Set()
      for (const [el, r, light] of writes) {
        el.style.setProperty('--mx', `${x - r.left}px`)
        el.style.setProperty('--my', `${y - r.top}px`)
        if (light !== null) { el.style.setProperty('--light', light.toFixed(3)); next.add(el) }
      }
      for (const el of lit) if (!next.has(el)) el.style.setProperty('--light', '0')
      lit = next
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    const onMove = e => {
      if (e.pointerType !== 'mouse') return
      x = e.clientX; y = e.clientY; target = e.target; inside = true
      schedule()
    }
    // Leaving the window turns every light off.
    const onOut = e => { if (!e.relatedTarget) { inside = false; schedule() } }
    // Things scroll under a mouse that stays still.
    const onScroll = () => { if (inside) schedule() }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onOut)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])
}
