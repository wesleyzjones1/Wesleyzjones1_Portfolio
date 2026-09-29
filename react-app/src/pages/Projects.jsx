import { useMemo, useState } from 'react'
import { allProjects, categories } from '../lib/projects'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/ui/Reveal'

export default function Projects() {
  const projects = allProjects()
  const cats = categories()
  const [active, setActive] = useState('All')

  const visible = useMemo(
    () => (active === 'All' ? projects : projects.filter(p => p.category === active)),
    [projects, active]
  )

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Work</span>
          <h1 className="display h1">Projects</h1>
          <p className="lead">Shipped products, tools I built for myself, and experiments that taught me something. Each one has a short write-up.</p>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filters" role="tablist" aria-label="Filter projects by category">
            {['All', ...cats].map(c => {
              const count = c === 'All' ? projects.length : projects.filter(p => p.category === c).length
              return (
                <button key={c} type="button" role="tab" aria-selected={active === c} className={`filter${active === c ? ' is-active' : ''}`} onClick={() => setActive(c)}>
                  {c}<span className="filter__count">{count}</span>
                </button>
              )
            })}
          </div>

          <div className="grid grid--3">
            {visible.map((p, i) => <Reveal key={p.slug} delay={Math.min(i, 5) * 60}><ProjectCard project={p} /></Reveal>)}
          </div>
        </div>
      </section>
    </>
  )
}
