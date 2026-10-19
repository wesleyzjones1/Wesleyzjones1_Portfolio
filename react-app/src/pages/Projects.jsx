import { useMemo, useState } from 'react'
import { allProjects, categories, heroProject } from '../lib/projects'
import { usePageTitle } from '../hooks/usePageTitle'
import { useGithubRepos } from '../hooks/useGithubRepos'
import { profile } from '../content/profile'
import RepoGrid from '../components/RepoGrid'
import FeatureProject from '../components/FeatureProject'
import HelpBox from '../components/HelpBox'
import { ArrowUpRight, GitHub } from '../components/ui/Icons'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/ui/Reveal'

export default function Projects() {
  usePageTitle('Projects')
  const projects = allProjects()
  const cats = categories()
  const [active, setActive] = useState('All')
  const { repos, live } = useGithubRepos()

  // With every project showing, the hero project gets the wide feature card (as
  // on the home page) so the rest fill the grid evenly.
  const hero = active === 'All' ? heroProject() : null
  const visible = useMemo(
    () => (active === 'All' ? projects.filter(p => p !== hero) : projects.filter(p => p.category === active)),
    [projects, active, hero]
  )

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">Work</span>
          <h1 className="display h1">Projects</h1>
          <p className="lead">Professional work, shipped products, tools that took the busywork out of my own jobs, and experiments that taught me something.</p>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filters" role="group" aria-label="Filter projects by category">
            {['All', ...cats].map(c => {
              const count = c === 'All' ? projects.length : projects.filter(p => p.category === c).length
              return (
                <button key={c} type="button" aria-pressed={active === c} className={`filter${active === c ? ' is-active' : ''}`} onClick={() => setActive(c)}>
                  {c}<span className="filter__count">{count}</span>
                </button>
              )
            })}
          </div>

          {hero && <Reveal style={{ marginBottom: 20 }}><FeatureProject project={hero} /></Reveal>}

          <div className="grid grid--3 featured-grid">
            {visible.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 80}><ProjectCard project={p} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* ── Repositories ─────────────────────────────────────────── */}
      <section className="section section--sunk" id="github">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">On GitHub</span>
              <h2 className="display h2">Public repositories</h2>
              <p className="lead">{live ? 'Pulled live from GitHub just now.' : 'Refreshed from GitHub on every deploy.'} The write-ups above tell the story; here is the code.</p>
            </div>
            <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="section-head__link"><GitHub size={15} /> github.com/{repos.length ? profile.links.github.split('/').pop() : ''} <ArrowUpRight size={13} /></a>
          </Reveal>
          <Reveal>
            <RepoGrid repos={repos} />
          </Reveal>
        </div>
      </section>

      <HelpBox />
    </>
  )
}
