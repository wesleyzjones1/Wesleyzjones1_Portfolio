export default function PathfindingAnim() {
  return (
    <>
      <style>{`
        .nav-anim-path {
          background-image:
            linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 7px 7px;
          border-radius: 2px;
        }
        .path-dot {
          position: absolute;
          width: 5px;
          height: 5px;
          background: currentColor;
          border-radius: 50%;
          box-shadow: 0 0 4px currentColor;
          animation: path-move 2.6s ease-in-out infinite;
        }
        @keyframes path-move {
          0%        { top: 3px;  left: 3px; }
          20%       { top: 3px;  left: 11px; }
          40%       { top: 10px; left: 11px; }
          60%       { top: 10px; left: 18px; }
          80%       { top: 17px; left: 18px; }
          95%, 100% { top: 17px; left: 18px; opacity: 0.15; }
        }
      `}</style>
      <span className="nav-anim nav-anim-path" aria-hidden="true">
        <span className="path-dot" />
      </span>
    </>
  )
}
