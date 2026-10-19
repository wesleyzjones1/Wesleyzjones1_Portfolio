import { Link } from 'react-router-dom'
import { profile } from '../content/profile'
import { allProjects, heroProject, asset } from '../lib/projects'
import { usePageTitle } from '../hooks/usePageTitle'
import FeatureProject from '../components/FeatureProject'
import ProjectCard from '../components/ProjectCard'
import InterestGrid from '../components/InterestGrid'
import HelpBox from '../components/HelpBox'
import Reveal from '../components/ui/Reveal'
import { ArrowRight, Download, GitHub, LinkedIn, Mail, MapPin } from '../components/ui/Icons'

export default function Home() {
  usePageTitle()
  const hero = heroProject()
  const others = allProjects().filter(p => p !== hero)
  const { principles } = profile

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div>
              <h1 className="display h1 hero__title"><em>{profile.name}</em></h1>
              {profile.tagline && <p className="display hero__tagline">{profile.tagline}</p>}
              <p className="lead hero__intro">{profile.intro}</p>

              <div className="hero__cta">
                <a href="#work" className="btn btn--primary">See my work <ArrowRight size={15} /></a>
                <a className="btn" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer"><Download size={15} /> Résumé</a>
                <div className="hero__social">
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHub /> GitHub</a>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /> LinkedIn</a>
                  <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /> Email</a>
                </div>
              </div>
            </div>

            <figure className="hero__figure">
              <picture>
                <source srcSet={asset(`${profile.portrait}.webp`)} type="image/webp" />
                <img className="hero__photo" src={asset(`${profile.portrait}.jpg`)} alt={`Portrait of ${profile.name}`} width="800" height="1000" fetchPriority="high" />
              </picture>
              <figcaption className="hero__caption">
                <strong>{profile.role}</strong>
                <span><MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {profile.location}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── My beliefs ───────────────────────────────────────────── */}
      {principles && (
        <section className="section section--sunk" id="beliefs">
          <div className="container">
            <Reveal className="section-head">
              <div>
                <h2 className="display h2">{principles.title}</h2>
              </div>
            </Reveal>
            <div className="grid grid--4">
              {principles.items.map((item, i) => (
                <Reveal key={item.title} delay={i * 60}>
                  <div className="card belief lift">
                    <span className="belief__num">0{i + 1}</span>
                    <h3 className="belief__title">{item.title}</h3>
                    <p className="belief__body">{item.body}</p>
                    {item.proof && <Link to={item.proof.to} className="belief__proof">{item.proof.label} <ArrowRight size={13} /></Link>}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Projects ─────────────────────────────────────────────── */}
      <section className="section" id="work">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <h2 className="display h2">My projects</h2>
            </div>
            <Link to="/projects" className="section-head__link">All projects and repositories <ArrowRight size={15} /></Link>
          </Reveal>

          {hero && <Reveal><FeatureProject project={hero} /></Reveal>}

          {others.length > 0 && (
            <div className="grid grid--3 featured-grid" style={{ marginTop: 20 }}>
              {others.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 80}><ProjectCard project={p} /></Reveal>)}
            </div>
          )}
        </div>
      </section>

      {/* ── Beyond work (a few here, the full set on About) ──────── */}
      <section className="section section--sunk">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Beyond work</span>
              <h2 className="display h2">What I do when the laptop is closed</h2>
            </div>
            <Link to="/about" className="section-head__link">More about me <ArrowRight size={15} /></Link>
          </Reveal>
          <InterestGrid items={profile.interests.filter(it => it.home)} />
        </div>
      </section>

      <HelpBox />
    </>
  )
}
