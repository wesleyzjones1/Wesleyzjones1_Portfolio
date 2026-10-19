import { asset } from '../lib/projects'
import Reveal from './ui/Reveal'
import { interestIcons } from './ui/Icons'

/** The "Beyond work" cards, shared by the home and about pages. */
export default function InterestGrid({ items }) {
  return (
    <div className="grid grid--3">
      {items.map((it, i) => {
        const Icon = interestIcons[it.icon] || interestIcons.star
        return (
          <Reveal key={it.title} delay={(i % 3) * 80}>
            <div className={`card interest lift${it.image ? ' interest--photo' : ''}`}>
              {it.image
                ? <img className="interest__image" src={asset(it.image)} alt="" loading="lazy" decoding="async" />
                : <span className="interest__icon"><Icon /></span>}
              <h3 className="interest__title">{it.title}</h3>
              <p className="interest__body">{it.body}</p>
            </div>
          </Reveal>
        )
      })}
    </div>
  )
}
