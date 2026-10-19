import { Link } from 'react-router-dom'
import { profile } from '../content/profile'
import { asset } from '../lib/projects'
import Reveal from './ui/Reveal'
import { Download, Mail } from './ui/Icons'

/** The "How I can help" call to action that closes the home, projects and about pages. */
export default function HelpBox() {
  const { help } = profile
  if (!help) return null
  return (
    <section className="section--tight">
      <div className="container">
        <Reveal className="help">
          <div className="help__head">
            <span className="eyebrow">{help.eyebrow}</span>
            <h2 className="display h3">{help.title}</h2>
          </div>
          <div className="help__content">
            <p className="help__body">{help.body}</p>
            {help.services?.length > 0 && (
              <ul className="chips help__services" aria-label="Kinds of work">
                {help.services.map(s => <li key={s} className="chip chip--outline">{s}</li>)}
              </ul>
            )}
          </div>
          <div className="help__actions">
            <Link to="/contact" className="btn btn--primary"><Mail size={15} /> Get in touch</Link>
            <a className="btn" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer"><Download size={15} /> Résumé</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
