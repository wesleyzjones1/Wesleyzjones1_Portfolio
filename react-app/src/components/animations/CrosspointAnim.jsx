/** A 3×3 crosspoint matrix; one connection lights at a time, slowly, in order. */
export default function CrosspointAnim() {
  const cells = [0, 1, 2, 3, 4, 5, 6, 7, 8]
  return (
    <svg className="nav-anim nav-anim-crosspoint" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <style>{`
        .nav-anim-crosspoint .crosspoint-cell { fill: currentColor; opacity: .28; animation: crosspoint-route 13.5s ease-in-out infinite; }
        @keyframes crosspoint-route {
          0%, 100% { fill: currentColor; opacity: .28; }
          3% { fill: var(--accent); opacity: 1; }
          9% { fill: var(--accent); opacity: .85; }
          13% { fill: currentColor; opacity: .28; }
        }
      `}</style>
      <rect x="2" y="2" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.2" opacity=".35" />
      {cells.map(i => (
        <rect
          key={i}
          className="crosspoint-cell"
          x={5.5 + (i % 3) * 5.5}
          y={5.5 + Math.floor(i / 3) * 5.5}
          width="4"
          height="4"
          rx="1"
          style={{ animationDelay: `${i * 1.5}s` }}
        />
      ))}
    </svg>
  )
}
