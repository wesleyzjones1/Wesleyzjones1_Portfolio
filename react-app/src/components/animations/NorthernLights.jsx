import { useEffect, useRef } from 'react'

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// Default tuning values — spread as props to override any of them
const AURORA_DEFAULTS = {
  speed: 1,          // drift/shimmer rate of the curtains
  intensity: 1,      // overall aurora brightness
  starFreq: 0.65,
  starGlitter: 0.5,
  starFlickerSpeed: 1,
  starFlickerShuffleInterval: 5,
}

// Each ribbon is one aurora curtain: a band with a bright, sharply defined
// lower edge and fine vertical rays fading upward. `slope` tilts the band
// across the sky, `foldFreq` sets how fine the ray striations are, and `lean`
// fans the rays outward from center so they read as parallel field lines in
// perspective rather than a flat picket fence.
//
// `from`/`to`/`feather` window each curtain to part of the width. That is what
// keeps stretches of plain dark sky between and beside the curtains — an
// aurora that spans the whole frame evenly stops reading as one.
const RIBBONS = [
  { seed: 0,  baseY: 0.58, slope: 0.36,  height: 0.80, foldFreq: 62, waveFreq: 1.5, speed: 1.00, bright: 1.00, lean: 1.0, fringe: 0.035, from: 0.02, to: 0.66, feather: 0.20 },
  { seed: 41, baseY: 0.44, slope: 0.50,  height: 0.54, foldFreq: 96, waveFreq: 2.4, speed: 1.50, bright: 0.46, lean: 0.6, fringe: 0.02,  from: 0.34, to: 1.06, feather: 0.26 },
  { seed: 83, baseY: 0.80, slope: -0.24, height: 0.44, foldFreq: 44, waveFreq: 1.1, speed: 0.70, bright: 0.26, lean: 1.4, fringe: 0.03,  from: 0.58, to: 1.12, feather: 0.30 },
]

// ── Ray colour ramp ──────────────────────────────────────────────────────
// Indexed by height above the curtain's lower edge (0 = bright base, 1 = top).
// Bottom is oxygen green, fading through teal into the violet/magenta of the
// higher-altitude emission. Each entry is already multiplied by the vertical
// brightness profile, so the render loop is a table lookup and a multiply.
const RAMP_STEPS = 256
const RAMP_R = new Float32Array(RAMP_STEPS)
const RAMP_G = new Float32Array(RAMP_STEPS)
const RAMP_B = new Float32Array(RAMP_STEPS)

{
  // Deliberately no saturated cyan/blue stage — real curtains go from green
  // straight to a muted violet-rose, and a bright blue band in the middle
  // immediately reads as fake.
  const stops = [
    { at: 0.00, c: [0.16, 1.00, 0.34] },
    { at: 0.30, c: [0.13, 0.96, 0.40] },
    { at: 0.60, c: [0.16, 0.68, 0.46] },
    { at: 0.85, c: [0.34, 0.32, 0.52] },
    { at: 1.00, c: [0.52, 0.24, 0.48] },
  ]
  for (let i = 0; i < RAMP_STEPS; i++) {
    const du = i / (RAMP_STEPS - 1)
    let a = stops[0], b = stops[stops.length - 1]
    for (let s = 0; s < stops.length - 1; s++) {
      if (du >= stops[s].at && du <= stops[s + 1].at) { a = stops[s]; b = stops[s + 1]; break }
    }
    const k = b.at > a.at ? (du - a.at) / (b.at - a.at) : 0
    // Bright at the base, decaying upward — the sharp lower edge of a curtain.
    // The base itself fades in over a couple of pixels so the ray bottoms are
    // a soft edge rather than a hard cut that looks like a horizon.
    const prof = clamp(du / 0.02, 0, 1) * (1 - du) * Math.exp(-du * 1.9)
    RAMP_R[i] = (a.c[0] + (b.c[0] - a.c[0]) * k) * prof
    RAMP_G[i] = (a.c[1] + (b.c[1] - a.c[1]) * k) * prof
    RAMP_B[i] = (a.c[2] + (b.c[2] - a.c[2]) * k) * prof
  }
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
  const p = useRef({ ...AURORA_DEFAULTS, ...props })
  useEffect(() => {
    p.current = { ...AURORA_DEFAULTS, ...props }
  })

  useEffect(() => {
    const aurora = auroraRef.current
    const stars  = starsRef.current
    const ctx    = aurora.getContext('2d')
    const sCtx   = stars.getContext('2d')

    // Rays are drawn into a reduced-resolution buffer that is upscaled onto
    // the visible canvas — a ray ends up a few screen pixels wide, which is
    // what the light actually looks like, and keeps the per-frame pixel count
    // small. The diffuse magenta/airglow wash has no fine detail at all, so it
    // gets a much coarser buffer still.
    const RAY_SCALE = 4
    const HAZE_W = 80, HAZE_H = 50

    const rays = document.createElement('canvas')
    const rCtx = rays.getContext('2d')
    const haze = document.createElement('canvas')
    haze.width = HAZE_W
    haze.height = HAZE_H
    const hCtx = haze.getContext('2d')
    const hazeImg = hCtx.createImageData(HAZE_W, HAZE_H)
    for (let i = 3; i < hazeImg.data.length; i += 4) hazeImg.data[i] = 255

    let rayImg = null      // ImageData for the ray buffer
    let acc = null         // float RGB accumulator, 3 per pixel
    let edgeArr = null     // per-column curtain edge (buffer px)
    let lenArr = null      // per-column ray length (buffer px)
    let intenArr = null    // per-column ray brightness

    // Per-mount random seed so each load looks different
    const noiseSeed = Math.random() * 1000

    // Precomputed star data used for per-frame flicker.
    // The sky gradient and the stars at rest never change, so they are baked
    // into an offscreen canvas once and blitted each frame. Only the handful
    // of stars currently glittering get redrawn, and only ever brighter than
    // the baked-in version, so painting over the top is enough.
    let starsData = []
    let lastStarKey = ''
    const skyBase = document.createElement('canvas')
    const skyCtx = skyBase.getContext('2d')

    const drawStars = () => {
      const { starFreq } = p.current
      const w = stars.width, h = stars.height
      skyBase.width = w
      skyBase.height = h
      const sky = skyCtx.createLinearGradient(0, 0, 0, h)
      sky.addColorStop(0, '#01030c')
      sky.addColorStop(0.55, '#050c1c')
      sky.addColorStop(1, '#081524')
      skyCtx.fillStyle = sky
      skyCtx.fillRect(0, 0, w, h)

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
      for (let i = 0; i < starsData.length; i++) {
        const s = starsData[i]
        skyCtx.beginPath()
        skyCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        skyCtx.fillStyle = `rgba(255,255,255,${s.baseAlpha.toFixed(2)})`
        skyCtx.fill()
      }
      lastStarKey = p.current.starFreq
    }

    const resize = () => {
      aurora.width  = stars.width  = window.innerWidth
      aurora.height = stars.height = window.innerHeight
      // Cap the ray buffer so very large displays don't blow up the frame cost
      rays.width  = clamp(Math.ceil(aurora.width / RAY_SCALE), 120, 520)
      rays.height = clamp(Math.ceil(aurora.height / RAY_SCALE), 90, 340)
      const bw = rays.width, bh = rays.height
      rayImg = rCtx.createImageData(bw, bh)
      for (let i = 3; i < rayImg.data.length; i += 4) rayImg.data[i] = 255
      acc = new Float32Array(bw * bh * 3)
      edgeArr = new Float32Array(bw)
      lenArr = new Float32Array(bw)
      intenArr = new Float32Array(bw)
      drawStars()
    }
    resize()
    window.addEventListener('resize', resize)

    let time = 0, last = 0, raf

    // The broad, structureless magenta wash and the green airglow near the
    // horizon. No fine detail, so a tiny buffer stretched over the screen is
    // indistinguishable from the real thing and costs almost nothing.
    const drawHaze = (t) => {
      const d = hazeImg.data
      const amp = p.current.intensity
      // The magenta drifts slowly across the middle of the sky rather than
      // sitting everywhere — it reads as one cloud with edges, not a tint.
      const magCx = 0.46 + 0.14 * simplex3(noiseSeed + 400, 0, t * 0.4)
      for (let gy = 0; gy < HAZE_H; gy++) {
        const v = gy / HAZE_H
        // magenta rides high in the sky and is gone well before the horizon
        const magGate = clamp((0.66 - v) / 0.42, 0, 1) * clamp(v / 0.06, 0, 1)
        // airglow hugs the horizon
        const glowGate = clamp((v - 0.52) / 0.4, 0, 1)
        for (let gx = 0; gx < HAZE_W; gx++) {
          const u = gx / HAZE_W
          const mx = clamp(1 - Math.abs(u - magCx) / 0.62, 0, 1)
          const m = simplex3(u * 1.7 + 30 + noiseSeed, v * 1.9, t * 0.5)
          const mag = clamp((m * 0.5 + 0.5 - 0.38) * 1.9, 0, 1) * magGate * mx
          const g = simplex3(u * 1.5 - 20 + noiseSeed, v * 1.7, t * 0.32)
          const glow = clamp((g * 0.5 + 0.5 - 0.52) * 2.0, 0, 1) * glowGate
          const i = (gy * HAZE_W + gx) * 4
          // A dusty rose veil, not a pink cloud: red-led, low saturation, and
          // dim enough that the green rays still read through it.
          d[i]     = clamp((mag * 62) * amp, 0, 255)
          d[i + 1] = clamp((mag * 24 + glow * 34) * amp, 0, 255)
          d[i + 2] = clamp((mag * 44 + glow * 20) * amp, 0, 255)
        }
      }
      hCtx.putImageData(hazeImg, 0, 0)
    }

    const drawRays = (t) => {
      const bw = rays.width, bh = rays.height
      const amp = p.current.intensity
      acc.fill(0)

      for (const rib of RIBBONS) {
        const rt = t * rib.speed
        // Per column: where the curtain's lower edge sits, how far the rays
        // reach, and how bright this particular ray is right now.
        for (let x = 0; x < bw; x++) {
          const u = x / bw
          // Fine folds are what read as individual rays. They drift sideways
          // over time, which is most of the visible movement.
          const su = u + t * 0.22

          const w1 = simplex3(u * rib.waveFreq, rib.seed + noiseSeed, rt)
          const w2 = simplex3(u * rib.waveFreq * 2.7, rib.seed + 5 + noiseSeed, rt * 1.8)
          // Ray-scale jitter on the lower edge — without it every ray ends on
          // the same smooth curve and the curtain reads as a solid silhouette
          // rather than a bundle of separate rays.
          const jit = simplex3(su * rib.foldFreq * 0.7, rib.seed + 91 + noiseSeed, rt * 1.5)
          edgeArr[x] = (rib.baseY + rib.slope * (u - 0.5) + w1 * 0.10 + w2 * 0.035 + jit * 0.015) * bh
          const ln = 0.55 + 0.45 * (0.5 + 0.5 * simplex3(u * 2.2, rib.seed + 13 + noiseSeed, rt * 0.9))
          lenArr[x] = rib.height * bh * ln
          const f1 = simplex3(su * rib.foldFreq, rib.seed + 31 + noiseSeed, rt * 2.6)
          const f2 = simplex3(su * rib.foldFreq * 2.4, rib.seed + 47 + noiseSeed, rt * 3.4)
          const fold = clamp(0.5 + 0.5 * (f1 * 0.68 + f2 * 0.32), 0, 1)
          // Slow large-scale gain decides which stretch of the curtain is
          // flaring — this is what produces the blown-out white-green cores.
          const gain = 0.5 + 0.5 * simplex3(u * 2.6, rib.seed + 71 + noiseSeed, rt * 1.15)
          // Window the curtain to part of the width so it has ends, drifting
          // slowly so it doesn't sit in the same place forever.
          const wd = 0.07 * simplex3(rib.seed + 200 + noiseSeed, 0, rt * 0.45)
          const env = clamp((u - rib.from - wd) / rib.feather, 0, 1) *
                      clamp((rib.to + wd - u) / rib.feather, 0, 1)
          if (env <= 0) { intenArr[x] = 0; continue }
          // Neighbouring rays differ in brightness, so the curtain has bright
          // and faint rays side by side instead of one even wall of light.
          const rayVar = 0.5 + 0.5 * simplex3(su * rib.foldFreq * 0.5, rib.seed + 131 + noiseSeed, rt * 0.8)
          // A steep curve on the folds opens dark lanes between the rays
          intenArr[x] = fold * fold * (0.6 + 8.0 * gain * gain) * (0.5 + 1.0 * rayVar) *
                        env * rib.bright * amp
        }

        const fringePx = rib.fringe * bh
        const leanMax = rib.lean * bw * 0.05
        for (let x = 0; x < bw; x++) {
          const edge = edgeArr[x], len = lenArr[x]
          if (len <= 1) continue
          const lean = (x / bw - 0.5) * 2 * leanMax
          const y0 = Math.max(0, Math.ceil(edge - len))
          const y1 = Math.min(bh - 1, Math.floor(edge + fringePx))

          for (let y = y0; y <= y1; y++) {
            if (y <= edge) {
              const du = (edge - y) / len
              // Rays lean as they rise, so sample the fold pattern from the
              // column the ray started in rather than straight down.
              let src = x + ((lean * du) | 0)
              if (src < 0) src = 0
              else if (src >= bw) src = bw - 1
              const I = intenArr[src]
              if (I < 0.004) continue
              const k = (du * (RAMP_STEPS - 1)) | 0
              const o = (y * bw + x) * 3
              acc[o]     += I * RAMP_R[k]
              acc[o + 1] += I * RAMP_G[k]
              acc[o + 2] += I * RAMP_B[k]
            } else if (fringePx > 0) {
              // Faint pink border just under the bright edge
              const I = intenArr[x]
              if (I < 0.05) continue
              const pf = (1 - (y - edge) / fringePx) * 0.22 * I
              const o = (y * bw + x) * 3
              acc[o]     += pf
              acc[o + 1] += pf * 0.16
              acc[o + 2] += pf * 0.34
            }
          }
        }
      }

      // Extended Reinhard tone map: mid brightnesses stay vivid and saturated,
      // and anything past the white point rolls off to a blown-out white-green
      // core instead of clipping into a flat slab of colour.
      const d = rayImg.data
      const n = bw * bh
      const INV_W2 = 1 / (2.2 * 2.2)
      for (let i = 0, o = 0, j = 0; i < n; i++, o += 3, j += 4) {
        const r = acc[o], g = acc[o + 1], b = acc[o + 2]
        d[j]     = Math.min(1, r * (1 + r * INV_W2) / (1 + r)) * 255
        d[j + 1] = Math.min(1, g * (1 + g * INV_W2) / (1 + g)) * 255
        d[j + 2] = Math.min(1, b * (1 + b * INV_W2) / (1 + b)) * 255
      }
      rCtx.putImageData(rayImg, 0, 0)
    }

    const drawFrame = () => {
      // ── stars (flicker) ──
      if (p.current.starFreq !== lastStarKey) drawStars()
      sCtx.drawImage(skyBase, 0, 0)

      const now = time * 0.001
      const epoch = Math.floor(now / (p.current.starFlickerShuffleInterval || 4))
      const glitter = p.current.starGlitter || 0
      if (glitter > 0) {
        for (let i = 0; i < starsData.length; i++) {
          if (rand(i * 7 + epoch) >= glitter) continue
          const s = starsData[i]
          // only ever brighter than the baked star, so overpainting suffices
          const boost = s.flickerAmp * (0.5 + 0.5 * Math.sin(now * s.flickerSpeed + s.phase))
          const extra = s.baseAlpha * boost
          if (extra < 0.02) continue
          sCtx.beginPath()
          sCtx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
          sCtx.fillStyle = `rgba(255,255,255,${clamp(extra, 0, 1).toFixed(3)})`
          sCtx.fill()
        }
      }

      // ── aurora ──
      const t = time * 0.00008 * p.current.speed + noiseSeed
      drawHaze(t)
      drawRays(t)

      const w = aurora.width, h = aurora.height
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, w, h)
      ctx.imageSmoothingEnabled = true
      ctx.drawImage(haze, 0, 0, w, h)
      // Aurora light is emissive — the layers add rather than occlude
      ctx.globalCompositeOperation = 'lighter'
      ctx.drawImage(rays, 0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'
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
