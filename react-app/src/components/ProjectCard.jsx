import { Link } from 'react-router-dom'
import { asset } from '../lib/projects'
import ProjectMark from './ui/ProjectMark'
import StatusBadge from './ui/StatusBadge'
import { ArrowRight } from './ui/Icons'

export default function ProjectCard({ project }) {
  const href = `/projects/${project.slug}`
  return (
    <Link to={href} className="project-card" aria-label={`${project.title}: ${project.tagline}`}>
      <div
        className={`project-card__cover${project.cover ? '' : ' project-card__cover--placeholder'}${project.coverFit === 'contain' ? ' project-card__cover--contain' : ''}`}
        style={project.coverBg ? { background: project.coverBg } : undefined}
      >
        {project.cover
          ? <img src={asset(project.cover)} alt="" loading="lazy" width="1280" height="800" />
          : <ProjectMark project={project} />}
        <span className="project-card__status"><StatusBadge status={project.status} /></span>
      </div>
      <div className="project-card__body">
        <div className="project-card__head">
          <ProjectMark project={project} />
          <h3 className="project-card__title">{project.title}</h3>
        </div>
        <p className="project-card__tagline">{project.tagline}</p>
        {project.tech?.length > 0 && (
          <div className="chips">
            {project.tech.slice(0, 4).map(t => <span key={t} className="chip">{t}</span>)}
            {project.tech.length > 4 && <span className="chip chip--outline">+{project.tech.length - 4}</span>}
          </div>
        )}
        <div className="project-card__foot">
          <span className="muted" style={{ fontSize: 13 }}>{project.year}</span>
          <span className="project-card__more">View project <ArrowRight size={14} /></span>
        </div>
      </div>
    </Link>
  )
}
