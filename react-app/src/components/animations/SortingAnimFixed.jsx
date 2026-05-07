import { useEffect, useState } from 'react'

export default function SortingAnim() {
  const initialNumbers = [22, 10, 18, 8, 20, 12, 16, 6]
  const initialBars = initialNumbers.map((h, idx) => ({ id: idx, height: h }))

  const [state, setState] = useState({
    bars: initialBars,
    i: 0,
    j: 0,
    phase: 'sorting',
    randomIndex: 0,
    waitUntil: 0,
  })

  useEffect(() => {
    const tick = setInterval(() => {
      setState((prev) => {
        const n = prev.bars.length

        if (prev.phase === 'sorting') {
          const bars = [...prev.bars]
          const j = prev.j
          const i = prev.i

          // Compare heights and swap whole bar objects so their visual positions update
          if (j < n - 1 - i && bars[j].height > bars[j + 1].height) {
            const tmp = bars[j]
            bars[j] = bars[j + 1]
            bars[j + 1] = tmp
          }

          let nextI = i
          let nextJ = j + 1
          if (nextJ >= n - 1 - i) {
            nextI += 1
            nextJ = 0
          }

          if (nextI >= n - 1) {
            // finished sorting: wait 2s before randomizing
            return { ...prev, bars, i: n - 1, j: 0, phase: 'complete-wait', waitUntil: Date.now() + 2000 }
          }

          return { ...prev, bars, i: nextI, j: nextJ }
        }

        if (prev.phase === 'complete-wait') {
          if (Date.now() < prev.waitUntil) return prev
          return { ...prev, phase: 'randomizing', randomIndex: 0 }
        }

        if (prev.phase === 'randomizing') {
          const n = prev.bars.length
          if (prev.randomIndex >= n) {
            // finished randomization: wait 2s then start sorting
            return { ...prev, phase: 'post-random-wait', waitUntil: Date.now() + 2000 }
          }

          const bars = [...prev.bars]
          const newHeight = 6 + Math.floor(Math.random() * 17)
          // replace the bar object to trigger clean updates but keep the same id
          bars[prev.randomIndex] = { ...bars[prev.randomIndex], height: newHeight }
          return { ...prev, bars, randomIndex: prev.randomIndex + 1 }
        }

        if (prev.phase === 'post-random-wait') {
          if (Date.now() < prev.waitUntil) return prev
          return { ...prev, phase: 'sorting', i: 0, j: 0 }
        }

        return prev
      })
    }, 300)

    return () => clearInterval(tick)
  }, [])

  const { bars, i, j, phase } = state
  const sortedFrom = phase === 'sorting' ? bars.length - i : 0
  const heights = bars.map((b) => b.height)
  const min = Math.min(...heights)
  const max = Math.max(...heights)

  const barColor = (height) => {
    const t = max === min ? 1 : (height - min) / (max - min)
    const lightness = Math.round(24 + t * 28)
    return `hsl(214 42% ${lightness}%)`
  }

  // layout constants for horizontal sliding
  const BAR_WIDTH = 2
  const GAP = 1
  const STEP = BAR_WIDTH + GAP
  const containerWidth = bars.length * STEP
  const containerHeight = Math.max(max, 26)

  return (
    <>
      <style>{`
        .nav-anim-sort {
          position: relative;
          display: inline-block;
          padding-bottom: 1px;
        }
        .nav-anim-sort span {
          position: absolute;
          bottom: 0;
          left: 0;
          width: ${BAR_WIDTH}px;
          border-radius: 0;
          shape-rendering: crispedges;
          transition: transform 260ms ease, background-color 180ms linear, height 240ms ease, opacity 180ms linear;
          will-change: transform, height;
        }
        .nav-anim-sort span.sorted {
          /* uses computed color */
        }
        .nav-anim-sort span.active {
          background: #b04c4c !important;
        }
      `}</style>

      <span
        className="nav-anim nav-anim-sort"
        aria-hidden="true"
        style={{ width: `${containerWidth}px`, height: `${containerHeight}px` }}
      >
        {bars.map((bar, idx) => {
          const isActive = phase === 'sorting' && (idx === j || idx === j + 1)
          const isSorted = sortedFrom > 0 && idx >= sortedFrom
          const className = `${isActive ? 'active' : ''} ${isSorted ? 'sorted' : ''}`.trim()
          return (
            <span
              key={bar.id}
              className={className}
              style={{
                height: `${bar.height}px`,
                transform: `translateX(${idx * STEP}px)`,
                background: barColor(bar.height),
              }}
            />
          )
        })}
      </span>
    </>
  )
}
