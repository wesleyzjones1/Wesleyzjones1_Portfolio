import { Link } from 'react-router-dom'
import { profile } from '../content/profile'
import { asset } from '../lib/projects'
import { usePageTitle } from '../hooks/usePageTitle'
import Reveal from '../components/ui/Reveal'
import { Award, Download, Mail, interestIcons } from '../components/ui/Icons'

export default function About() {
  usePageTitle('About')
  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">About</span>
          <h1 className="display h1">From job sites to shipped software.</h1>
          <div className="prose lead" style={{ marginTop: 22 }}>
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          </div>
          <div className="hero__cta" style={{ marginTop: 28 }}>
            <a className="btn btn--primary" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer"><Download size={15} /> Download résumé</a>
            <Link to="/contact" className="btn"><Mail size={15} /> Contact</Link>
          </div>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Beyond the code</span>
              <h2 className="display h2">What I am into</h2>
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

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Experience</span>
              <h2 className="display h2">Work history</h2>
            </div>
          </Reveal>
          <div className="timeline">
            {profile.experience.map(job => (
              <Reveal key={`${job.company}-${job.role}`} className="job">
                <div className="job__when"><strong>{job.start} – {job.end}</strong>{job.location}</div>
                <div>
                  <div className="job__role">{job.role}</div>
                  <div className="job__company">{job.company}</div>
                  {job.bullets?.length > 0 && <ul className="job__bullets">{job.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
                  {job.tags?.length > 0 && <div className="chips job__tags">{job.tags.map(t => <span key={t} className="chip chip--outline">{t}</span>)}</div>}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--sunk">
        <div className="container">
          <div className="grid grid--2" style={{ gap: 40 }}>
            <Reveal>
              <span className="eyebrow" style={{ display: 'block', marginBottom: 14 }}>Education</span>
              {profile.education.map(e => (
                <div key={e.degree} className="card edu">
                  <div className="edu__degree">{e.degree}</div>
                  <div className="edu__school">{e.school} · {e.location} · {e.year}</div>
                  {e.details && <p className="edu__details">{e.details}</p>}
                </div>
              ))}
            </Reveal>
            <Reveal delay={80}>
              <span className="eyebrow" style={{ display: 'block', marginBottom: 14 }}>Certifications</span>
              <div className="cert-list">
                {profile.certifications.map(c => (
                  <div key={c.name} className="cert">
                    <span className="cert__icon"><Award /></span>
                    <div><div className="cert__name">{c.name}</div><div className="cert__issuer">{c.issuer}</div></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Skills</span>
              <h2 className="display h2">Tools I reach for</h2>
            </div>
          </Reveal>
          <Reveal className="skills">
            {profile.skills.map(g => (
              <div key={g.group} className="skill-group">
                <div className="skill-group__name">{g.group}</div>
                <div className="chips">{g.items.map(s => <span key={s} className="chip">{s}</span>)}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  )
}
