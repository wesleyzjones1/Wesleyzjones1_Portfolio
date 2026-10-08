import { Link } from 'react-router-dom'
import { profile } from '../content/profile'
import { featuredProjects, heroProject, asset } from '../lib/projects'
import { usePageTitle } from '../hooks/usePageTitle'
import FeatureProject from '../components/FeatureProject'
import ProjectCard from '../components/ProjectCard'
import Reveal from '../components/ui/Reveal'
import { ArrowRight, Download, GitHub, LinkedIn, Mail, MapPin, interestIcons } from '../components/ui/Icons'

export default function Home() {
  usePageTitle()
  const hero = heroProject()
  const featured = featuredProjects().filter(p => p !== hero).slice(0, 3)
  const recentJobs = profile.experience.slice(0, 3)

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero__grid">
            <div>
              <div className="hero__eyebrow eyebrow"><span className="dot" aria-hidden="true" /> {profile.availability}</div>
              <h1 className="display h1 hero__title"><Headline text={profile.headline} /></h1>
              <p className="lead hero__intro">{profile.intro}</p>
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
                <source srcSet={asset('profile-640.webp')} type="image/webp" />
                <img className="hero__photo" src={asset('profile-640.jpg')} alt={`Portrait of ${profile.name}`} width="640" height="640" fetchPriority="high" />
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
              <h2 className="display h2">What you get when you hire me</h2>
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

      {/* ── Experience (condensed) ───────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Experience</span>
              <h2 className="display h2">Where I have worked</h2>
            </div>
            <Link to="/about" className="section-head__link">Full background <ArrowRight size={15} /></Link>
          </Reveal>
          <Reveal className="timeline">
            {recentJobs.map(job => (
              <div key={`${job.company}-${job.role}`} className="job">
                <div className="job__when"><strong>{job.start} – {job.end}</strong>{job.location}</div>
                <div>
                  <div className="job__role">{job.role}</div>
                  <div className="job__company">{job.company}</div>
                  <p className="job__summary">{job.summary}</p>
                  <div className="chips job__tags">{job.tags?.map(t => <span key={t} className="chip chip--outline">{t}</span>)}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── Beyond the code ──────────────────────────────────────── */}
      <section className="section section--sunk">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Beyond the code</span>
              <h2 className="display h2">What I am into</h2>
              <p className="lead">The interests that shape how I think about problems, on and off the clock.</p>
            </div>
          </Reveal>
          <div className="grid grid--4">
            {profile.interests.map((it, i) => {
              const Icon = interestIcons[it.icon] || interestIcons.star
              return (
                <Reveal key={it.title} delay={i * 70} className="card interest">
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
              <p className="cta__body">Hiring a software engineer or a technical lead? I would love to hear about the problem you are solving.</p>
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

/** Italicises the final clause of the headline for a little typographic lift. */
function Headline({ text }) {
  const idx = text.lastIndexOf(', ')
  if (idx === -1) return text
  return <>{text.slice(0, idx + 2)}<em>{text.slice(idx + 2)}</em></>
}
