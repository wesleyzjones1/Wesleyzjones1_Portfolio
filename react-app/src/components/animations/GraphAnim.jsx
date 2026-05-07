export default function GraphAnim() {
  return (
    <>
      <style>{`
        .nav-anim-graph {
          overflow: visible;
          border-radius: 3px;
        }
        .graph-axis {
          stroke: currentColor;
          opacity: 0.28;
        }
        .graph-curve {
          fill: none;
          stroke: var(--accent);
          stroke-width: 1.7;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 30;
          stroke-dashoffset: 30;
        }
        .graph-curve.c1 { animation: graph-curve-1 20s ease-in-out infinite; }
        .graph-curve.c2 { animation: graph-curve-2 20s ease-in-out infinite; }
        .graph-curve.c3 { animation: graph-curve-3 20s ease-in-out infinite; }
        @keyframes graph-curve-1 {
          0%, 6% { opacity: 0; stroke-dashoffset: 30; }
          12%, 26% { opacity: 1; stroke-dashoffset: 0; }
          34%, 100% { opacity: 0; stroke-dashoffset: -30; }
        }
        @keyframes graph-curve-2 {
          0%, 32% { opacity: 0; stroke-dashoffset: 30; }
          40%, 56% { opacity: 1; stroke-dashoffset: 0; }
          64%, 100% { opacity: 0; stroke-dashoffset: -30; }
        }
        @keyframes graph-curve-3 {
          0%, 62% { opacity: 0; stroke-dashoffset: 30; }
          70%, 86% { opacity: 1; stroke-dashoffset: 0; }
          100% { opacity: 0; stroke-dashoffset: -30; }
        }
      `}</style>
      <svg className="nav-anim nav-anim-graph" width="26" height="26" viewBox="0 0 26 26" fill="none">
        <line className="graph-axis" x1="3" y1="22" x2="23" y2="22" />
        <line className="graph-axis" x1="3" y1="22" x2="3" y2="4" />
        <path className="graph-curve c1" d="M3 20 Q8 9 13 16 T23 9" />
        <path className="graph-curve c2" d="M3 16 C7 22 10 4 14 10 S20 22 23 12" />
        <path className="graph-curve c3" d="M3 14 C7 6 10 24 14 12 S20 4 23 8" />
      </svg>
    </>
  )
}
