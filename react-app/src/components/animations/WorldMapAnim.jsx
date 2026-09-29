export default function WorldMapAnim() {
  return (
    <svg className="nav-anim nav-anim-world" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <style>{`
        .nav-anim-world .meridian { animation: world-meridian 14s linear infinite; transform-origin: 13px 13px; }
        @keyframes world-meridian { 0% { transform: scaleX(1); } 50% { transform: scaleX(-1); } 100% { transform: scaleX(1); } }
        .nav-anim-world .pin { animation: world-pin 14s ease-in-out infinite; }
        @keyframes world-pin { 0%, 70%, 100% { opacity: .35; } 20%, 50% { opacity: 1; } }
      `}</style>
      <circle cx="13" cy="13" r="9.5" />
      <line x1="3.5" y1="13" x2="22.5" y2="13" opacity=".45" />
      <ellipse className="meridian" cx="13" cy="13" rx="4.5" ry="9.5" opacity=".6" />
      <circle className="pin" cx="16" cy="9.5" r="1.6" fill="var(--accent)" stroke="none" />
    </svg>
  )
}
