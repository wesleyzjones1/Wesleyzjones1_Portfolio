import { asset } from '../lib/projects'

/** Grid of phone screens (or screenshots) with a kicker and caption each. */
export default function PhoneGallery({ items }) {
  if (!items?.length) return null
  return (
    <ul className="phones">
      {items.map(item => (
        <li key={item.src} className="phones__item">
          <img src={asset(item.src)} alt={item.caption || ''} width="600" height="1042" loading="lazy" />
          {item.kicker && <span className="phones__kicker">{item.kicker}</span>}
          {item.caption && <p className="phones__caption">{item.caption}</p>}
        </li>
      ))}
    </ul>
  )
}
