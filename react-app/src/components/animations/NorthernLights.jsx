import { useEffect, useRef } from 'react'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// Default tuning values — spread as props to override any of them
const AURORA_DEFAULTS = {
  speed: 1,          // overall drift speed of the curtains
  intensity: 1,      // overall aurora brightness
  starFreq: 0.65,
  starGlitter: 0.5,
  starFlickerSpeed: 1,
  starFlickerShuffleInterval: 5,
}

// Each ribbon is one aurora "curtain": a band of vertical rays whose base
// undulates across the sky. Several at different heights/speeds give depth.
const RIBBONS = [
  { seed: 0,  baseY: 0.55, height: 0.34, drift: 1.0,  alpha: 1.0 },
  { seed: 37, baseY: 0.72, height: 0.24, drift: 1.35, alpha: 0.55 },
  { seed: 74, baseY: 0.38, height: 0.22, drift: 0.8,  alpha: 0.4 },
]

// ── Simplex 3D noise ─────────────────────────────────────────────────────
const _p = [151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180]
const _g3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]]
const perm = new Uint8Array(512), gp = new Array(512)
for (let i = 0; i < 512; i++) { perm[i] = _p[i & 255]; gp[i] = _g3[perm[i] % 12] }
const _dot = (g, x, y, z) => g[0]*x + g[1]*y + g[2]*z

function simplex3(xin, yin, zin) {
  const F3 = 1/3, G3 = 1/6
  const s = (xin + yin + zin) * F3
  const i = Math.floor(xin + s), j = Math.floor(yin + s), k = Math.floor(zin + s)
  const t = (i + j + k) * G3
  const x0 = xin-(i-t), y0 = yin-(j-t), z0 = zin-(k-t)
  let i1,j1,k1,i2,j2,k2
  if (x0>=y0) {
    if (y0>=z0)      {i1=1;j1=0;k1=0;i2=1;j2=1;k2=0}
    else if (x0>=z0) {i1=1;j1=0;k1=0;i2=1;j2=0;k2=1}
    else             {i1=0;j1=0;k1=1;i2=1;j2=0;k2=1}
  } else {
    if (y0<z0)       {i1=0;j1=0;k1=1;i2=0;j2=1;k2=1}
    else if (x0<z0)  {i1=0;j1=1;k1=0;i2=0;j2=1;k2=1}
    else             {i1=0;j1=1;k1=0;i2=1;j2=1;k2=0}
  }
  const x1=x0-i1+G3, y1=y0-j1+G3, z1=z0-k1+G3
  const x2=x0-i2+2*G3, y2=y0-j2+2*G3, z2=z0-k2+2*G3
  const x3=x0-1+3*G3, y3=y0-1+3*G3, z3=z0-1+3*G3
  const ii=i&255, jj=j&255, kk=k&255
  const contrib = (x, y, z, di, dj, dk) => {
    let t2 = 0.6 - x*x - y*y - z*z
    if (t2 < 0) return 0
    t2 *= t2
    return t2*t2*_dot(gp[ii+di+perm[jj+dj+perm[kk+dk]]], x, y, z)
  }
  return 32*(contrib(x0,y0,z0,0,0,0)+contrib(x1,y1,z1,i1,j1,k1)+contrib(x2,y2,z2,i2,j2,k2)+contrib(x3,y3,z3,1,1,1))
}

// Deterministic pseudo-random from a seed integer
const rand = n => { const x = Math.sin(n + 1) * 43758.5453123; return x - Math.floor(x) }

export default function NorthernLights(props) {
  const auroraRef = useRef(null)
  const starsRef  = useRef(null)
  // Single live-ref: animation loop always reads latest values without remounting
  const p = useRef({ ...AURORA_DEFAULTS, ...props })
  useEffect(() => {
    p.current = { ...AURORA_DEFAULTS, ...props }
  })

  useEffect(() => {
    const aurora = auroraRef.current
    const stars  = starsRef.current
    const ctx    = aurora.getContext('2d')
    const sCtx   = stars.getContext('2d')
    // The curtains are drawn on a low-res buffer, then upscaled + CSS-blurred.
    // Keeps the per-frame ray count small and gives the soft aurora glow for free.
    const BUFFER_SCALE = 5
    const buffer = document.createElement('canvas')
    const bCtx = buffer.getContext('2d')
    // Per-mount random seed so each load looks different
    const noiseSeed = Math.random() * 1000

    // Precomputed star data used for per-frame flicker
    let starsData = []
    let lastStarKey = ''
    const paintSky = () => {
      const w = stars.width, h = stars.height
      const sky = sCtx.createLinearGradient(0, 0, 0, h)
      sky.addColorStop(0, '#020208')
      sky.addColorStop(0.6, '#050a16')
      sky.addColorStop(1, '#0a1220')
      sCtx.fillStyle = sky
      sCtx.fillRect(0, 0, w, h)
    }
    const drawStars = () => {
      const { starFreq } = p.current
      const w = stars.width, h = stars.height
      sCtx.clearRect(0, 0, w, h)
      paintSky()
      starsData.length = 0
      const count = Math.round(starFreq * 700)
      for (let i = 0; i < count; i++) {
        // offset rand inputs by the noiseSeed so star layout changes per load
        const seedOffset = Math.floor(noiseSeed)
        starsData.push({
          x: rand(i * 3 + seedOffset) * w,
          y: rand(i * 3 + 1 + seedOffset) * h,
          size: rand(i * 3 + 2 + seedOffset) * 1.6 + 0.3,
          baseAlpha: rand(i * 5 + seedOffset) * 0.6 + 0.12,
          flickerSpeed: (0.2 + rand(i * 23 + seedOffset) * 0.8) * (p.current.starFlickerSpeed || 1),
          phase: rand(i * 13 + seedOffset) * Math.PI * 2,
          flickerAmp: 0.1 + rand(i * 19 + seedOffset) * 0.4,
        })
      }
      // draw once before animation starts to avoid flash
      for (let i = 0; i < starsData.length; i++) {
        const s = starsData[i]
        sCtx.beginPath()
        sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        sCtx.fillStyle = `rgba(255,255,255,${s.baseAlpha.toFixed(2)})`
        sCtx.fill()
      }
      lastStarKey = p.current.starFreq
    }

    const resize = () => {
      aurora.width  = stars.width  = window.innerWidth
      aurora.height = stars.height = window.innerHeight
      buffer.width  = Math.max(1, Math.ceil(aurora.width / BUFFER_SCALE))
      buffer.height = Math.max(1, Math.ceil(aurora.height / BUFFER_SCALE))
      drawStars()
    }
    resize()
    window.addEventListener('resize', resize)

    let time = 0, last = 0, raf

    const drawFrame = () => {
      const { speed, intensity } = p.current
      const t = time * 0.00006 * speed + noiseSeed

      // ── stars (flicker) ──
      const sw = stars.width, sh = stars.height
      sCtx.clearRect(0, 0, sw, sh)
      paintSky()
      if (p.current.starFreq !== lastStarKey) drawStars()

      const now = time * 0.001
      const epoch = Math.floor(now / (p.current.starFlickerShuffleInterval || 4))
      const glitter = p.current.starGlitter || 0
      for (let i = 0; i < starsData.length; i++) {
        const s = starsData[i]
        const flick = glitter > 0 && rand(i * 7 + epoch) < glitter
          ? 1 + s.flickerAmp * Math.sin(now * s.flickerSpeed + s.phase)
          : 1
        const a = clamp(s.baseAlpha * flick, 0.02, 1)
        sCtx.beginPath()
        sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        sCtx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`
        sCtx.fill()
      }

      // ── aurora curtains ──
      const bw = buffer.width, bh = buffer.height
      bCtx.clearRect(0, 0, bw, bh)
      bCtx.globalCompositeOperation = 'lighter'

      for (const ribbon of RIBBONS) {
        const rt = t * ribbon.drift
        for (let x = 0; x < bw; x++) {
          const u = x / bw
          // Bottom edge of the curtain: a slow large wave plus a smaller ripple
          const wave  = simplex3(u * 2.2, ribbon.seed, rt)
          const wave2 = simplex3(u * 5.5, ribbon.seed + 11, rt * 1.6)
          const baseY = (ribbon.baseY + wave * 0.1 + wave2 * 0.03) * bh
          // Ray length breathes along the curtain
          const lenN = 0.5 + 0.5 * simplex3(u * 3.1, ribbon.seed + 23, rt * 1.2)
          const rayLen = ribbon.height * bh * (0.45 + 0.75 * lenN)
          // High-frequency folds give the characteristic pleated-curtain bands
          const fold = 0.5 + 0.5 * simplex3(u * 14, ribbon.seed + 41, rt * 2.2)
          const a = clamp(Math.pow(fold, 1.8) * ribbon.alpha * intensity, 0, 1)
          if (a < 0.02) continue

          // Vertical ray: bright green base → teal → violet, fading upward
          const g = bCtx.createLinearGradient(0, baseY, 0, baseY - rayLen)
          g.addColorStop(0,    `rgba(85,255,160,${(a * 0.85).toFixed(3)})`)
          g.addColorStop(0.3,  `rgba(45,225,170,${(a * 0.5).toFixed(3)})`)
          g.addColorStop(0.65, `rgba(95,140,235,${(a * 0.26).toFixed(3)})`)
          g.addColorStop(1,    'rgba(150,80,220,0)')
          bCtx.fillStyle = g
          bCtx.fillRect(x, baseY - rayLen, 1, rayLen)

          // Faint pink fringe just below the bright lower edge (nitrogen glow)
          if (a > 0.15) {
            const fringeLen = bh * 0.045
            const f = bCtx.createLinearGradient(0, baseY, 0, baseY + fringeLen)
            f.addColorStop(0, `rgba(255,110,150,${(a * 0.3).toFixed(3)})`)
            f.addColorStop(1, 'rgba(255,110,150,0)')
            bCtx.fillStyle = f
            bCtx.fillRect(x, baseY, 1, fringeLen)
          }
        }
      }
      bCtx.globalCompositeOperation = 'source-over'

      // upscale the soft low-res buffer onto the visible canvas
      const w = aurora.width, h = aurora.height
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(buffer, 0, 0, w, h)
    }

    const step = ts => {
      time += Math.min((ts - last) || 0, 100)
      last = ts
      drawFrame()
      raf = requestAnimationFrame(step)
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) {
      // Render a single static sky instead of animating
      time = 1
      drawFrame()
    } else {
      raf = requestAnimationFrame(step)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="aurora-layer" aria-hidden="true">
      <canvas ref={starsRef} className="stars-canvas" />
      <img src="moon.png" className="aurora-moon" alt="" />
      <canvas ref={auroraRef} className="aurora-canvas" />
    </div>
  )
}
