import { Link } from 'react-router-dom'
import { ArrowRight, Heart } from './ui/Icons'

/**
 * A trail of waypoints. `compact` renders a horizontal trail on wide screens
 * (title and organisation only); the default renders a vertical trail with
 * the full text of each stop.
 */
export default function Trail({ items, compact = false }) {
  return (
    <ol className={`trail${compact ? ' trail--compact' : ''}`}>
      {items.map((stop, i) => (
        <li key={`${stop.year}-${i}`} className={`trail__stop${stop.highlight ? ' is-highlight' : ''}`}>
          <span className="trail__pin" aria-hidden="true">{stop.highlight ? <Heart size={11} /> : null}</span>
          <span className="trail__when">{stop.year}</span>
          <div className="trail__body">
            <h3 className="trail__title">{stop.title}</h3>
            <div className="trail__org">{stop.org}</div>
            {!compact && stop.body && <p className="trail__text">{stop.body}</p>}
            {!compact && stop.link && (
              <Link to={stop.link} className="trail__link">Read the case study <ArrowRight size={13} /></Link>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
