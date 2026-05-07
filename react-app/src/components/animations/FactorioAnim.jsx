export default function FactorioAnim() {
  return (
    <span className="nav-anim nav-anim-factorio-gear" aria-hidden="true" style={{ width: 30, height: 30 }}>
      <style>{`
        .nav-anim-factorio-gear {
          width: 30px;
          height: 30px;
          display: inline-block;
          border-radius: 50%;
          overflow: hidden;
        }
        .nav-anim-factorio-gear img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
          transform-origin: center;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
          filter: brightness(80%);
          animation: factorio-img-spin 60s linear infinite;
        }
        @keyframes factorio-img-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      <img src="gear.png" alt="" />
    </span>
  )
}
