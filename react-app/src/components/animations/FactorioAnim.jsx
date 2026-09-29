export default function FactorioAnim() {
  return (
    <svg className="nav-anim nav-anim-factorio" width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <style>{`
        .nav-anim-factorio .gear-a { transform-origin: 9px 13px; animation: factorio-spin-a 16s linear infinite; }
        .nav-anim-factorio .gear-b { transform-origin: 19px 9px; animation: factorio-spin-b 16s linear infinite; }
        @keyframes factorio-spin-a { to { transform: rotate(360deg); } }
        @keyframes factorio-spin-b { to { transform: rotate(-360deg); } }
      `}</style>
      <g className="gear-a" stroke="currentColor" strokeWidth="1.5">
        <circle cx="9" cy="13" r="4.2" />
        <circle cx="9" cy="13" r="1.3" fill="currentColor" stroke="none" opacity=".5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
          <line key={a} x1="9" y1="7.2" x2="9" y2="5.6" transform={`rotate(${a} 9 13)`} />
        ))}
      </g>
      <g className="gear-b" stroke="var(--accent)" strokeWidth="1.4">
        <circle cx="19" cy="9" r="2.8" />
        {[0, 60, 120, 180, 240, 300].map(a => (
          <line key={a} x1="19" y1="5.4" x2="19" y2="4.2" transform={`rotate(${a} 19 9)`} />
        ))}
      </g>
    </svg>
  )
}
