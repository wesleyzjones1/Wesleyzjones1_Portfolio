import { Link } from 'react-router-dom'
import { asset, primaryLink } from '../lib/projects'
import StatusBadge from './ui/StatusBadge'
import StoreBadges from './ui/StoreBadges'
import { ArrowRight, ArrowUpRight } from './ui/Icons'

/** Full-width feature card used for the headline project on the home page. */
export default function FeatureProject({ project }) {
  const link = primaryLink(project)
  return (
    <article className="feature">
      <div className="feature__body">
        <div className="feature__top">
          <span className="eyebrow">Featured project</span>
          <StatusBadge status={project.status} />
        </div>
        <h3 className="display feature__title">{project.title}</h3>
        <p className="feature__tagline">{project.tagline}</p>
        <p className="feature__summary">{project.summary}</p>

        {project.metrics?.length > 0 && (
          <div className="feature__metrics">
            {project.metrics.map(m => (
              <div key={m.label}><div className="metric__value">{m.value}</div><div className="metric__label">{m.label}</div></div>
            ))}
          </div>
        )}

        <div className="chips">
          {project.tech.slice(0, 7).map(t => <span key={t} className="chip">{t}</span>)}
        </div>

        <div className="feature__actions">
          <Link to={`/projects/${project.slug}`} className="btn btn--primary">Read the case study <ArrowRight size={15} /></Link>
          {link && <a className="btn" href={link.url} target="_blank" rel="noopener noreferrer">{link.label} <ArrowUpRight size={14} /></a>}
        </div>
        {project.storeBadges && <StoreBadges />}
      </div>

      <div className="feature__visual" aria-hidden="true">
        <svg className="feature__route" viewBox="0 0 400 400" preserveAspectRatio="none" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M-20 330 C 80 300, 90 180, 180 200 S 300 120, 420 40" />
          <path d="M-20 120 C 60 140, 120 60, 200 90 S 330 260, 420 300" />
        </svg>
        {project.logo && <img className="feature__logo" src={asset(project.logo)} alt="" />}
      </div>
    </article>
  )
}
