// ── AuroraDebugPanel ────────────────────────────────────────────────────────
// Dev-only tuning panel for NorthernLights.
// To remove: delete <AuroraDebugPanel> from Home.jsx and delete this file.
// ──────────────────────────────────────────────────────────────────────────
import { useState } from 'react'

const SLIDERS = [
  { key: 'freq',          label: 'Speed',             min: 0.01, max: 0.4,  step: 0.01 },
  { key: 'tileW',         label: 'Tile Width',        min: 15,   max: 150,  step: 5    },
  { key: 'tileH',         label: 'Tile Height',       min: 40,   max: 400,  step: 10   },
  { key: 'noiseScale',    label: 'Noise Scale',       min: 0.2,  max: 6.0,  step: 0.05 },
  { key: 'noiseBias',     label: 'Noise Bias (black⇄white)', min: -1,   max: 1,    step: 0.05 },
  { key: 'rotateAngle',   label: 'Rotation (rad)',    min: -1.5, max: 1.5,  step: 0.05 },
  { key: 'rotationNoise', label: 'Rotation Jitter',  min: 0,    max: 1.5,  step: 0.05 },
  { key: 'skew',          label: 'Skew',              min: -1,   max: 1,    step: 0.01 },
  { key: 'greenAmount',   label: 'Green Amount',      min: 0,    max: 3,    step: 0.05 },
  { key: 'blueAmount',    label: 'Blue Amount',       min: 0,    max: 3,    step: 0.05 },
  { key: 'redAmount',     label: 'Red Amount',        min: 0,    max: 3,    step: 0.05 },
  { key: 'starFreq',      label: 'Star Density',      min: 0,    max: 1,    step: 0.05 },
  { key: 'starGlitter',   label: 'Star Glitter %',    min: 0,    max: 1,    step: 0.01 },
  { key: 'starFlickerSpeed', label: 'Star Flicker Speed', min: 0.1, max: 2.0, step: 0.05 },
  { key: 'starFlickerShuffleInterval', label: 'Flicker Shuffle Interval (s)', min: 1, max: 12, step: 1 },
]

export default function AuroraDebugPanel({ values, onChange }) {
  const [open, setOpen] = useState(true)

  const copyValues = () => {
    const out = Object.entries(values)
      .map(([k, v]) => `  ${k}: ${typeof v === 'boolean' ? v : v},`)
      .join('\n')
    navigator.clipboard.writeText(`{\n${out}\n}`)
  }

  return (
    <div style={{
      position: 'fixed', top: 12, right: 12, zIndex: 9999,
      width: open ? 280 : 48,
      background: 'rgba(0,0,0,0.82)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 10,
      fontFamily: 'monospace',
      fontSize: 11,
      color: '#e0e8ff',
      overflow: 'hidden',
      transition: 'width 0.2s',
      backdropFilter: 'blur(8px)',
    }}>
      {/* header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '8px 10px', borderBottom: open ? '1px solid rgba(255,255,255,0.08)' : 'none',
        cursor: 'pointer', userSelect: 'none',
      }} onClick={() => setOpen(o => !o)}>
        {open && <span style={{ fontWeight: 700, letterSpacing: 1, color: '#7df7c0' }}>AURORA TUNER</span>}
        <span style={{ marginLeft: 'auto', fontSize: 14, opacity: 0.7 }}>{open ? '✕' : '⚙'}</span>
      </div>

      {open && (
        <div style={{ padding: '8px 10px 12px', maxHeight: '85vh', overflowY: 'auto' }}>
          {/* Noise map toggle */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={values.noiseMap}
              onChange={e => onChange('noiseMap', e.target.checked)}
              style={{ accentColor: '#7df7c0', width: 14, height: 14 }}
            />
            <span style={{ color: values.noiseMap ? '#7df7c0' : '#aaa', fontWeight: 600 }}>
              Noise Map (B&W)
            </span>
          </label>

          {/* Sliders */}
          {SLIDERS.map(({ key, label, min, max, step }) => (
            <div key={key} style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                <span style={{ opacity: 0.75 }}>{label}</span>
                <span style={{ color: '#7df7c0' }}>{values[key]}</span>
              </div>
              <input
                type="range"
                min={min} max={max} step={step}
                value={values[key]}
                onChange={e => onChange(key, parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#7df7c0', cursor: 'pointer' }}
              />
            </div>
          ))}

          {/* Copy button */}
          <button
            onClick={copyValues}
            style={{
              marginTop: 6, width: '100%', padding: '5px 0',
              background: 'rgba(125,247,192,0.12)', border: '1px solid rgba(125,247,192,0.3)',
              borderRadius: 6, color: '#7df7c0', cursor: 'pointer', fontSize: 11,
            }}>
            Copy Values to Clipboard
          </button>
        </div>
      )}
    </div>
  )
}
