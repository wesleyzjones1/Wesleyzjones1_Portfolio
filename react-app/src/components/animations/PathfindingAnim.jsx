import { useEffect, useState } from 'react'

const GRID = 4
const START = 0
const END = GRID * GRID - 1

function neighbors(cell) {
  const x = cell % GRID
  const y = Math.floor(cell / GRID)
  const result = []
  if (x > 0) result.push(cell - 1)
  if (x < GRID - 1) result.push(cell + 1)
  if (y > 0) result.push(cell - GRID)
  if (y < GRID - 1) result.push(cell + GRID)
  return result
}

function buildScenario() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    const walls = new Set()
    for (let i = 0; i < GRID * GRID; i += 1) {
      if (i === START || i === END) continue
        if (Math.random() < 0.33) walls.add(i)
    }

    const queue = [START]
    const visited = new Set([START])
    const order = []
    const parent = new Map()

    while (queue.length) {
      const cur = queue.shift()
      order.push(cur)
      if (cur === END) break

      const nextCells = neighbors(cur)
      for (let idx = 0; idx < nextCells.length; idx += 1) {
        const nxt = nextCells[idx]
        if (visited.has(nxt) || walls.has(nxt)) continue
        visited.add(nxt)
        parent.set(nxt, cur)
        queue.push(nxt)
      }
    }

    if (!visited.has(END)) continue

    const route = []
    let cur = END
    while (cur !== undefined) {
      route.push(cur)
      if (cur === START) break
      cur = parent.get(cur)
    }
    route.reverse()

    if (route.length < 5) continue

    return {
      walls,
      searchOrder: order,
      routeOrder: route,
    }
  }

  return {
    walls: new Set([2, 6, 9, 10]),
    searchOrder: [0, 1, 4, 8, 12, 13, 14, 15],
    routeOrder: [0, 4, 8, 12, 13, 14, 15],
  }
}

export default function PathfindingAnim() {
  const [sim, setSim] = useState(() => ({
    ...buildScenario(),
    phase: 'search',
    searchStep: 0,
    routeStep: 0,
    fade: 1,
    waitUntil: 0,
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setSim((prev) => {
        if (prev.phase === 'search') {
          if (prev.searchStep < prev.searchOrder.length) {
            return { ...prev, searchStep: prev.searchStep + 1 }
          }
          return { ...prev, phase: 'route' }
        }

        if (prev.phase === 'route') {
          if (prev.routeStep < prev.routeOrder.length) {
            return { ...prev, routeStep: prev.routeStep + 1 }
          }
          return { ...prev, phase: 'hold', waitUntil: Date.now() + 2000 }
        }

        if (prev.phase === 'hold') {
          if (Date.now() < prev.waitUntil) return prev
            return { ...prev, phase: 'fade', fade: 0, waitUntil: Date.now() + 900 }
        }

        if (prev.phase === 'fade') {
          if (Date.now() < prev.waitUntil) return prev

          return {
            ...buildScenario(),
            phase: 'search',
            searchStep: 0,
            routeStep: 0,
            fade: 1,
            waitUntil: 0,
          }
        }

        return prev
      })
    }, 420)

    return () => clearInterval(timer)
  }, [])

  const shownSearch = new Set(sim.searchOrder.slice(0, sim.searchStep))
  const shownRoute = new Set(sim.routeOrder.slice(0, sim.routeStep))

  return (
    <>
      <style>{`
        .nav-anim-path {
          width: 23px;
          height: 23px;
          display: grid;
          grid-template-columns: repeat(4, 5px);
          grid-template-rows: repeat(4, 5px);
          gap: 1px;
          border-radius: 2px;
          overflow: hidden;
          background: #101828;
        }
        .path-cell {
          width: 5px;
          height: 5px;
          border-radius: 1px;
          background: #1b2231;
          transition: background-color 120ms linear, opacity 900ms ease;
        }
        .path-cell.wall {
          background: #587aa7;
        }
        .path-cell.search {
          background: rgba(90, 176, 109, 0.44);
        }
        .path-cell.route {
          background: #48c997;
        }
        .path-cell.start {
          background: #00d68f;
        }
        .path-cell.end {
          background: #ff6b6b;
        }
      `}</style>
      <span className="nav-anim nav-anim-path" aria-hidden="true">
        {Array.from({ length: GRID * GRID }, (_, cell) => {
          const classes = ['path-cell']
          if (sim.walls.has(cell)) classes.push('wall')
          if (shownSearch.has(cell)) classes.push('search')
          if (shownRoute.has(cell)) classes.push('route')
          if (cell === START) classes.push('start')
          if (cell === END) classes.push('end')

          // keep start/end fully opaque during fade; other cells follow sim.fade
          const cellStyle = { transition: 'opacity 900ms ease' }
          if (cell === START || cell === END) {
            cellStyle.opacity = 1
          } else {
            cellStyle.opacity = sim.fade
          }

          return <span key={cell} className={classes.join(' ')} style={cellStyle} />
        })}
      </span>
    </>
  )
}
