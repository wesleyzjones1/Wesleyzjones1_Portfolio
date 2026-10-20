import { asset } from '../lib/projects'

// Intrinsic size of each kind of image, so the grid reserves the right space before they load.
const SIZES = { phone: [600, 1042], store: [560, 1214] }

/**
 * Grid of phone screens with a kicker and caption each. `variant="store"` is for
 * app-store screenshots: full-bleed artwork with its own headline.
 */
export default function PhoneGallery({ items, variant = 'phone' }) {
  if (!items?.length) return null
  const [width, height] = SIZES[variant] || SIZES.phone
  return (
    <ul className={`phones${variant === 'store' ? ' phones--store' : ''}`}>
      {items.map(item => (
        <li key={item.src} className="phones__item">
          <img src={asset(item.src)} alt={item.alt || item.caption || ''} width={width} height={height} loading="lazy" decoding="async" />
          {item.kicker && <span className="phones__kicker">{item.kicker}</span>}
          {item.caption && <p className="phones__caption">{item.caption}</p>}
        </li>
      ))}
    </ul>
  )
}
