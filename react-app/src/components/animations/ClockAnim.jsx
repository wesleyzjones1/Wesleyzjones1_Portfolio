import { useEffect, useState } from 'react'

const CX = 15
const CY = 15

export default function ClockAnim() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  const sec = time.getSeconds()
  const min = time.getMinutes()
  const hr  = time.getHours() % 12

  const sDeg = sec * 6
  const mDeg = min * 6 + sec * 0.1
  const hDeg = hr * 30 + min * 0.5

  const hand = (deg, len) => {
    const rad = (deg - 90) * (Math.PI / 180)
    const x = (CX + Math.cos(rad) * len).toFixed(2)
    const y = (CY + Math.sin(rad) * len).toFixed(2)
    return `M${CX},${CY} L${x},${y}`
  }

  return (
    <svg
      className="nav-anim nav-anim-clock"
      aria-hidden="true"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <defs>
        <filter id="clock-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <radialGradient id="clock-face-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(40,200,64,0.07)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Face background glow */}
      <circle cx={CX} cy={CY} r="13" fill="url(#clock-face-grad)" />
      {/* Face ring */}
      <circle cx={CX} cy={CY} r="13" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="0.8" />

      {/* Hour ticks */}
      {Array.from({ length: 12 }, (_, i) => {
        const rad = (i * 30 - 90) * (Math.PI / 180)
        const isCardinal = i % 3 === 0
        return (
          <line
            key={i}
            x1={(CX + Math.cos(rad) * 10.5).toFixed(2)}
            y1={(CY + Math.sin(rad) * 10.5).toFixed(2)}
            x2={(CX + Math.cos(rad) * 13).toFixed(2)}
            y2={(CY + Math.sin(rad) * 13).toFixed(2)}
            stroke={isCardinal ? '#28c840' : 'currentColor'}
            strokeOpacity={isCardinal ? 0.45 : 0.25}
            strokeWidth={isCardinal ? 1 : 0.6}
          />
        )
      })}

      {/* Hour hand */}
      <path d={hand(hDeg, 6)} stroke="#28c840" strokeWidth="1.8" strokeLinecap="round" filter="url(#clock-glow)" />
      {/* Minute hand */}
      <path d={hand(mDeg, 9)} stroke="#28c840" strokeWidth="1.2" strokeLinecap="round" filter="url(#clock-glow)" />
      {/* Second hand */}
      <path d={hand(sDeg, 11)} stroke="#28c840" strokeWidth="0.7" strokeLinecap="round" strokeOpacity="0.85" filter="url(#clock-glow)" />

      {/* Center dot */}
      <circle cx={CX} cy={CY} r="1.3" fill="#28c840" filter="url(#clock-glow)" />
    </svg>
  )
}
