import { Apple, Play } from './Icons'

/** Disabled-looking store badges for a project that has not launched yet. */
export default function StoreBadges() {
  return (
    <div className="store-badges" aria-label="App store availability">
      <span className="store-badge" title="Coming soon">
        <Apple size={20} />
        <span><small>Coming soon on the</small><b>App Store</b></span>
      </span>
      <span className="store-badge" title="Coming soon">
        <Play size={20} />
        <span><small>Coming soon on</small><b>Google Play</b></span>
      </span>
    </div>
  )
}
