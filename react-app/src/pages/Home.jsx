import { Link } from 'react-router-dom'
import { profile } from '../content/profile'
import { featuredProjects, heroProject, asset } from '../lib/projects'
import FeatureProject from '../components/FeatureProject'
import ProjectCard from '../components/ProjectCard'
import Trail from '../components/Trail'
import Reveal from '../components/ui/Reveal'
import { ArrowRight, Download, GitHub, LinkedIn, Mail, MapPin, interestIcons } from '../components/ui/Icons'

export default function Home() {
  const hero = heroProject()
  const featured = featuredProjects().filter(p => p !== hero).slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div>
              <div className="hero__eyebrow eyebrow"><span className="dot" aria-hidden="true" /> {profile.availability}</div>
              <h1 className="display h1 hero__title">
                {profile.headline} <em>{profile.headlineAccent}</em>
              </h1>
              <p className="lead hero__intro">{profile.intro}</p>

              {profile.now?.length > 0 && (
                <ul className="now" aria-label="Currently">
                  <li className="now__label">Currently</li>
                  {profile.now.map(n => <li key={n}>{n}</li>)}
                </ul>
              )}

              <div className="hero__cta">
                <Link to="/projects" className="btn btn--primary">See my work <ArrowRight size={15} /></Link>
                <a className="btn" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer"><Download size={15} /> Résumé</a>
                <div className="hero__social">
                  <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHub /> GitHub</a>
                  <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedIn /> LinkedIn</a>
                  <a href={`mailto:${profile.email}`} aria-label="Email"><Mail /> Email</a>
                </div>
              </div>
            </div>

            <figure className="hero__figure">
              <span className="hero__photo-frame" aria-hidden="true" />
              <picture>
                <source srcSet={asset(`${profile.portrait}.webp`)} type="image/webp" />
                <img className="hero__photo" src={asset(`${profile.portrait}.jpg`)} alt={`Portrait of ${profile.name}`} width="800" height="1000" fetchPriority="high" />
              </picture>
              <figcaption className="hero__caption">
                <strong>{profile.role} · {profile.company}</strong>
                <span><MapPin size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> {profile.location}</span>
              </figcaption>
            </figure>
          </div>

          <Reveal className="facts" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            {profile.facts.map(f => (
              <div key={f.label} className="fact"><div className="fact__value">{f.value}</div><div className="fact__label">{f.label}</div></div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── The trail so far ─────────────────────────────────────── */}
      <section className="section section--sunk">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">The trail so far</span>
              <h2 className="display h2">Every stop taught me something.</h2>
            </div>
            <Link to="/about" className="section-head__link">The full story <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal>
            <Trail items={profile.journey} compact />
          </Reveal>
        </div>
      </section>

      {/* ── Featured work ────────────────────────────────────────── */}
      <section className="section" id="work">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="display h2">Things I have built</h2>
            </div>
            <Link to="/projects" className="section-head__link">All projects <ArrowRight size={15} /></Link>
          </Reveal>

          {hero && <Reveal><FeatureProject project={hero} /></Reveal>}

          {featured.length > 0 && (
            <div className="grid grid--3 featured-grid" style={{ marginTop: 20 }}>
              {featured.map((p, i) => <Reveal key={p.slug} delay={i * 80}><ProjectCard project={p} /></Reveal>)}
            </div>
          )}
        </div>
      </section>

      {/* ── How I work ───────────────────────────────────────────── */}
      <section className="section section--sunk">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">How I work</span>
              <h2 className="display h2">Hard work got me here. Working smart keeps me moving.</h2>
            </div>
          </Reveal>
          <Reveal className="pillars">
            {profile.strengths.map((s, i) => (
              <div key={s.title} className="pillar">
                <div className="pillar__num">0{i + 1}</div>
                <h3 className="pillar__title">{s.title}</h3>
                <p className="pillar__body">{s.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Beyond work ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Beyond work</span>
              <h2 className="display h2">What I do when the laptop is closed</h2>
            </div>
            <Link to="/about" className="section-head__link">More about me <ArrowRight size={15} /></Link>
          </Reveal>
          <div className="grid grid--3">
            {profile.interests.map((it, i) => {
              const Icon = interestIcons[it.icon] || interestIcons.star
              return (
                <Reveal key={it.title} delay={Math.min(i, 5) * 60} className="card interest">
                  <span className="interest__icon"><Icon /></span>
                  <h3 className="interest__title">{it.title}</h3>
                  <p className="interest__body">{it.body}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="section--tight">
        <div className="container">
          <Reveal className="cta">
            <div>
              <h2 className="display cta__title">Let&apos;s talk.</h2>
              <p className="cta__body">Hiring for a senior engineer or a technical lead, or building something that needs both hardware and software sense? I would love to hear about it.</p>
            </div>
            <div className="cta__actions">
              <Link to="/contact" className="btn btn--primary"><Mail size={15} /> Get in touch</Link>
              <a className="btn" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer"><Download size={15} /> Résumé</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
