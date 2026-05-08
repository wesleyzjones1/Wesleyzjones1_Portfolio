import React from 'react'

export default function WorldMapAnim() {
  return (
    <span className="nav-anim nav-anim-world-map" aria-hidden="true">
      <style>{`
        .nav-anim-world-map { width: 30px; height: 30px; display:inline-block }
        .nav-anim-world-map img { width:100%; height:100%; display:block; transform-origin:50% 50%; filter:brightness(0.8); animation: nav-anim-world-rotate 45s linear infinite }
        @keyframes nav-anim-world-rotate { to { transform: rotate(360deg) } }
      `}</style>
      <img src="/globe.svg" alt="" />
    </span>
  )
}
