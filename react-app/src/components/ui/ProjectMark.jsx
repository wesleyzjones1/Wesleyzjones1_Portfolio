import { useRef } from 'react'
import { asset } from '../../lib/projects'
import { useInView } from '../../hooks/useInView'

/** Small square mark for a project: its logo, its animated mark, or an initial. */
export default function ProjectMark({ project }) {
  if (project.logo) {
    return <span className="mark mark--logo"><img src={asset(project.logo)} alt="" /></span>
  }
  if (project.mark) return <AnimatedMark project={project} />
  return <span className="mark" aria-hidden="true">{project.title.charAt(0)}</span>
}

/** Runs the mark's animation only while it is on screen (CSS marks pause via data-paused). */
function AnimatedMark({ project }) {
  const Anim = project.mark
  const ref = useRef(null)
  const active = useInView(ref)
  return (
    <span ref={ref} className="mark" data-paused={active ? undefined : ''}>
      <Anim active={active} />
    </span>
  )
}
