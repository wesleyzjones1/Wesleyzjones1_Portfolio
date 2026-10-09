export default function SearchAnim() {
  return (
    <svg className="nav-anim nav-anim-search" width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
      <style>{`
        .nav-anim-search .hit { animation: search-hit 12s ease-in-out infinite; }
        .nav-anim-search .hit:nth-child(2) { animation-delay: 4s; }
        .nav-anim-search .hit:nth-child(3) { animation-delay: 8s; }
        @keyframes search-hit { 0%, 20%, 100% { opacity: .3; } 8% { opacity: 1; } }
      `}</style>
      <g>
        <line className="hit" x1="4" y1="6" x2="12" y2="6" />
        <line className="hit" x1="4" y1="11" x2="10" y2="11" />
        <line className="hit" x1="4" y1="16" x2="11" y2="16" />
      </g>
      <circle cx="17" cy="15" r="4.5" stroke="var(--accent)" />
      <line x1="20.4" y1="18.4" x2="23.5" y2="21.5" stroke="var(--accent)" strokeWidth="2" />
    </svg>
  )
}
