import { Link } from 'react-router-dom'
import { profile } from '../content/profile'
import { asset } from '../lib/projects'
import { usePageTitle } from '../hooks/usePageTitle'
import InterestGrid from '../components/InterestGrid'
import HelpBox from '../components/HelpBox'
import Reveal from '../components/ui/Reveal'
import { Download, Mail, Quote } from '../components/ui/Icons'

export default function About() {
  usePageTitle('About')
  const { beliefs } = profile
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

      {/* ── Beyond work ──────────────────────────────────────────── */}
      <section className="section section--sunk">
        <div className="container">
          <Reveal className="section-head">
            <div>
              <span className="eyebrow">Beyond work</span>
              <h2 className="display h2">What I do when the laptop is closed</h2>
            </div>
          </Reveal>
          <InterestGrid items={profile.interests} />
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
              <blockquote className="mission">
                <Quote size={22} className="mission__mark" />
                <p>{beliefs.mission}</p>
                <footer>My mission statement</footer>
              </blockquote>
            </Reveal>
          </div>
        </section>
      )}

      <HelpBox />
    </>
  )
}
