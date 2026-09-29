import { asset } from '../../lib/projects'

/** Small square mark for a project: its logo, its animated mark, or an initial. */
export default function ProjectMark({ project }) {
  if (project.logo) {
    return <span className="mark mark--logo"><img src={asset(project.logo)} alt="" /></span>
  }
  const Anim = project.mark
  if (Anim) return <span className="mark"><Anim /></span>
  return <span className="mark" aria-hidden="true">{project.title.charAt(0)}</span>
}
