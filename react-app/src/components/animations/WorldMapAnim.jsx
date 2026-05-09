import React from 'react'

export default function WorldMapAnim() {
  return (
    <span className="nav-anim nav-anim-world-map" aria-hidden="true">
      <style>{`
        .nav-anim-world-map { width: 30px; height: 30px; display:inline-block }
        .nav-anim-world-map img {
          width:30px; height:30px; display:block; transform-origin:50% 50%;
          animation: nav-anim-world-rotate 45s linear infinite;
          will-change: transform;
          -webkit-backface-visibility: hidden; backface-visibility: hidden;
          image-rendering: -webkit-optimize-contrast; image-rendering: crisp-edges;
        }
        @keyframes nav-anim-world-rotate { to { transform: rotate(360deg) } }
      `}</style>
      <img src="globe.png" alt="" width="30" height="30" />
    </span>
  )
}
