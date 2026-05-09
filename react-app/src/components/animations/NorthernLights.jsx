import { useEffect, useRef } from 'react'

// small helpers
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// Default tuning values — these become the slider defaults in AuroraDebugPanel
export const AURORA_DEFAULTS = {
  freq: 0.1,
  tileW: 40,
  tileH: 40,
  rotateAngle: 0.1,
  skew: 0.2,
  noiseScale: 2.5,
  rotationNoise: 0.2,
  greenAmount: 1,
  blueAmount: 0.6,
  redAmount: 0.3,
  redFreq: 0.4,
  greenFreq: 1,
  blueFreq: 0.6,
  starFreq: 0.65,
  noiseMap: false,
  noiseBias: 0.8,
  starGlitter: 0.5,
  starFlickerSpeed: 1,
  starFlickerShuffleInterval: 5,
}

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
  const p = useRef(props)
  p.current = { ...AURORA_DEFAULTS, ...props }

  useEffect(() => {
    const aurora = auroraRef.current
    const stars  = starsRef.current
    const ctx    = aurora.getContext('2d')
    const sCtx   = stars.getContext('2d')
    // Per-mount random seed so each load looks different
    const noiseSeed = Math.random() * 1000

    // Precomputed star data used for per-frame flicker
    let starsData = []
    let lastStarKey = ''
    const drawStars = () => {
      const { starFreq } = p.current
      const w = stars.width, h = stars.height
      sCtx.clearRect(0, 0, w, h)
      sCtx.fillStyle = '#00000f'
      sCtx.fillRect(0, 0, w, h)
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
      drawStars()
    }
    resize()
    window.addEventListener('resize', resize)

    const el = document.querySelector('.main-content')
    if (el) el.classList.add('aurora-bg')

    let time = 0, last = 0, raf

    const step = ts => {
      time += (ts - last) || 0
      last = ts

      const {
        freq, tileW, tileH, rotateAngle, skew,
        noiseScale, rotationNoise,
        noiseBias,
        greenAmount, blueAmount, redAmount,
        redFreq, greenFreq, blueFreq,
        noiseMap,
      } = p.current

      const w = aurora.width, h = aurora.height
      const cols = Math.ceil(w / tileW)
      const rows = Math.ceil(h / tileH)
      const tw = w / cols, th = h / rows
      const t  = time * freq / 1000

      // stars
      const sw = stars.width, sh = stars.height
      sCtx.clearRect(0, 0, sw, sh)
      sCtx.fillStyle = '#00000f'
      sCtx.fillRect(0, 0, sw, sh)
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

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
          const rotNoise = simplex3(x / (10 * noiseScale), y / (10 * noiseScale), t + noiseSeed)
          const rot  = rotateAngle + rotNoise * rotationNoise
          const cosR = Math.cos(rot), sinR = Math.sin(rot)
          const rx = x * cosR - y * sinR
          const ry = x * sinR + y * cosR

          let brightness = clamp((simplex3(rx / (4 * noiseScale), ry / (20 * noiseScale), t + noiseSeed) + 1) * 0.5, 0, 1)
          brightness = clamp(brightness + noiseBias * 0.45, 0, 1)

          let r, g, b
          if (noiseMap) {
            // Grayscale noise map for tuning
            const v = Math.round(brightness * 255)
            r = g = b = v
          } else {
            // shift the noise sampling offsets by noiseSeed so color bands vary per load
            const rMod = clamp((simplex3(rx * redFreq   / (5 * noiseScale) + 100 + noiseSeed, ry * redFreq   / (22 * noiseScale), t * 0.7 + noiseSeed) + 1) * 0.5, 0, 1)
            const gMod = clamp((simplex3(rx * greenFreq / (5 * noiseScale) + 200 + noiseSeed, ry * greenFreq / (22 * noiseScale), t * 0.5 + noiseSeed) + 1) * 0.5, 0, 1)
            const bMod = clamp((simplex3(rx * blueFreq  / (5 * noiseScale) + 300 + noiseSeed, ry * blueFreq  / (22 * noiseScale), t * 0.8 + noiseSeed) + 1) * 0.5, 0, 1)
            r = Math.round(brightness * rMod * redAmount   * 255)
            g = Math.round(brightness * gMod * greenAmount * 255)
            b = Math.round(brightness * bMod * blueAmount  * 255)
          }

          const intensity = (r + g + b) / (3 * 255)
          const alpha = clamp(0.10 + intensity * 0.9, 0, 0.95)
          const skewPx = ((y / rows) - 0.5) * w * skew
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha.toFixed(3)})`
          ctx.fillRect(x * tw + skewPx, y * th, tw, th)
        }
      }

      ctx.globalCompositeOperation = 'source-over'
      raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      if (el) el.classList.remove('aurora-bg')
    }
  }, [])

  return (
    <>
      <canvas ref={starsRef}  className="stars-canvas"  />
      <canvas ref={auroraRef} className="aurora-canvas" />
    </>
  )
}
