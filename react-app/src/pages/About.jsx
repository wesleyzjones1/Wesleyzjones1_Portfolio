import { Link } from 'react-router-dom'
import { profile } from '../content/profile'
import { asset } from '../lib/projects'
import Trail from '../components/Trail'
import Reveal from '../components/ui/Reveal'
import { Award, Download, Mail, Quote, interestIcons } from '../components/ui/Icons'

export default function About() {
  const { beliefs, drives } = profile
  return (
    <>
      {/* ── Story ────────────────────────────────────────────────── */}
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">About</span>
          <h1 className="display h1">{profile.aboutTitle}</h1>
          <div className="story">
            <div className="prose lead">
              {profile.about.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <figure className="story__figure">
              <picture>
                <source srcSet={asset(`${profile.portrait}.webp`)} type="image/webp" />
                <img src={asset(`${profile.portrait}.jpg`)} alt={`Portrait of ${profile.name}`} width="800" height="1000" />
              </picture>
            </figure>
          </div>
          <div className="hero__cta" style={{ marginTop: 28 }}>
            <a className="btn btn--primary" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer"><Download size={15} /> Download résumé</a>
            <Link to="/contact" className="btn"><Mail size={15} /> Contact</Link>
          </div>
        </div>
      </section>

      {/* ── What drives me ───────────────────────────────────────── */}
      <section className="section section--sunk">
        <div className="container">
          <Reveal className="two-col">
            <div>
              <span className="eyebrow">Why</span>
              <h2 className="display h2">{drives.title}</h2>
            </div>
            <div className="prose">
              {drives.body.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── The trail ────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">The trail</span>
              <h2 className="display h2">Where I have worked, in order</h2>
            </div>
          </Reveal>
          <Reveal>
            <Trail items={profile.journey} />
          </Reveal>
        </div>
      </section>

      {/* ── Beyond work ──────────────────────────────────────────── */}
      <section className="section section--sunk">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Beyond work</span>
              <h2 className="display h2">What I do when the laptop is closed</h2>
            </div>
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

      {/* ── What I believe ───────────────────────────────────────── */}
      {beliefs && (
        <section className="section">
          <div className="container">
            <Reveal className="two-col">
              <div>
                <span className="eyebrow">Faith</span>
                <h2 className="display h2">{beliefs.title}</h2>
                <p className="prose" style={{ marginTop: 16 }}>{beliefs.intro}</p>
              </div>
              <div>
                <blockquote className="mission">
                  <Quote size={22} className="mission__mark" />
                  <p>{beliefs.mission}</p>
                  <footer>My mission statement</footer>
                </blockquote>
                {beliefs.poems?.length > 0 && (
                  <details className="poems">
                    <summary>Two poems</summary>
                    <p className="prose" style={{ marginTop: 12 }}>{beliefs.poemsIntro}</p>
                    {beliefs.poems.map(poem => (
                      <div key={poem.title} className="poem">
                        <h3 className="poem__title display">{poem.title}</h3>
                        <p className="poem__lines">{poem.lines.map((l, i) => <span key={i}>{l}<br /></span>)}</p>
                      </div>
                    ))}
                  </details>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── Education & certifications ───────────────────────────── */}
      <section className="section section--sunk">
        <div className="container">
          <div className="grid grid--2" style={{ gap: 40 }}>
            <Reveal>
              <span className="eyebrow" style={{ display: 'block', marginBottom: 14 }}>Education</span>
              <div className="edu-list">
                {profile.education.map(e => (
                  <div key={`${e.degree}-${e.school}`} className="card edu">
                    <div className="edu__degree">{e.degree}</div>
                    <div className="edu__school">{e.school}{e.year ? ` · ${e.year}` : ''}</div>
                    {e.details && <p className="edu__details">{e.details}</p>}
                  </div>
                ))}
              </div>
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

      {/* ── Skills ───────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Skills</span>
              <h2 className="display h2">Both sides of the problem</h2>
              <p className="lead">I see the hardware and the software dimensions of a problem, and keep sight of the goal instead of getting lost in the details.</p>
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
