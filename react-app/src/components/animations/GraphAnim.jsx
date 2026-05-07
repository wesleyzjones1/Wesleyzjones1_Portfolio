export default function GraphAnim() {
  return (
    <>
      <style>{`
        .nav-anim-graph { overflow: visible; }
        .graph-line {
          stroke-dasharray: 55;
          stroke-dashoffset: 55;
          animation: draw-line 2.2s ease-in-out infinite;
        }
        @keyframes draw-line {
          0%, 8%   { stroke-dashoffset: 55; }
          60%, 75% { stroke-dashoffset: 0; }
          100%     { stroke-dashoffset: -55; }
        }
      `}</style>
      <svg className="nav-anim nav-anim-graph" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <polyline className="graph-line" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="2,22 7,14 12,17 18,7 24,9" />
      </svg>
    </>
  )
}
