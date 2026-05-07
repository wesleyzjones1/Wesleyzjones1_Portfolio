import { useEffect, useState } from 'react'

const INITIAL = [22, 10, 18, 8, 20, 12, 16, 6]
const TICK = 600
const POST_COMPARE_MS = 50

export default function SortingAnim() {
  const [state, setState] = useState({
    bars: INITIAL,
    i: 0,
    j: 0,
    phase: 'sorting',
    comparing: false,
    postCompareWait: false,
    randomIndex: 0,
    waitUntil: 0,
  })

  useEffect(() => {
    const id = setInterval(() => {
      setState((prev) => {
        const { bars: b, i, j, phase, postCompareWait, randomIndex, waitUntil } = prev
        const n = b.length

        if (phase === 'sorting') {
          if (postCompareWait) {
            if (Date.now() < waitUntil) return prev
            let nextI = i, nextJ = j + 1
            if (nextJ >= n - 1 - i) { nextI += 1; nextJ = 0 }
            if (nextI >= n - 1) return { ...prev, i: n - 1, j: 0, phase: 'complete-wait', waitUntil: Date.now() + 2000, postCompareWait: false }
            return { ...prev, i: nextI, j: nextJ, postCompareWait: false }
          }

          const needsSwap = j < n - 1 - i && b[j] > b[j + 1]

          // First tick: set comparing to highlight the pair
          if (!prev.comparing) return { ...prev, comparing: true }

          // Second tick: we've been comparing; perform swap if needed, then short wait
          const bars = [...b]
          if (needsSwap) {
            ;[bars[j], bars[j + 1]] = [bars[j + 1], bars[j]]
          }
          return { ...prev, bars, comparing: false, postCompareWait: true, waitUntil: Date.now() + POST_COMPARE_MS }
        }

        if (phase === 'complete-wait') {
          if (Date.now() < waitUntil) return prev
          return { ...prev, phase: 'randomizing', randomIndex: 0 }
        }

        if (phase === 'randomizing') {
          if (randomIndex >= n) return { ...prev, phase: 'post-random-wait', waitUntil: Date.now() + 2000 }
          const bars = b.map((h, idx) => idx === randomIndex ? 6 + Math.floor(Math.random() * 17) : h)
          return { ...prev, bars, randomIndex: randomIndex + 1 }
        }

        if (phase === 'post-random-wait') {
          if (Date.now() < waitUntil) return prev
          return { ...prev, phase: 'sorting', i: 0, j: 0 }
        }

        return prev
      })
    }, TICK)
    return () => clearInterval(id)
  }, [])

  const { bars, j, phase, comparing, postCompareWait } = state
  const min = Math.min(...bars), max = Math.max(...bars)
  const barColor = (h) => `hsl(214 42% ${Math.round(24 + ((max === min ? 1 : (h - min) / (max - min)) * 28))}%)`

  const BAR_WIDTH = 2, GAP = 1, STEP = BAR_WIDTH + GAP

  return (
    <>
      <style>{`
        .nav-anim-sort { position: relative; display: inline-block; }
        .nav-anim-sort span { position: absolute; bottom: 0; width: ${BAR_WIDTH}px; transition: height 200ms ease, background-color 400ms ease; }
        .nav-anim-sort span.active { background: #b04c4c !important; }
      `}</style>
      <span className="nav-anim nav-anim-sort" aria-hidden="true" style={{ width: `${bars.length * STEP}px`, height: `${Math.max(max, 24)}px` }}>
        {bars.map((h, idx) => (
          <span
            key={idx}
            className={phase === 'sorting' && (idx === j || idx === j + 1) && (comparing || postCompareWait) ? 'active' : ''}
            style={{ left: `${idx * STEP}px`, height: `${h}px`, background: barColor(h) }}
          />
        ))}
      </span>
    </>
  )
}
