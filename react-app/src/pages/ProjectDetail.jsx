import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject, primaryLink, asset } from '../lib/projects'
import { useRepository } from '../hooks/useRepository'
import { usePageTitle } from '../hooks/usePageTitle'
import StatusBadge from '../components/ui/StatusBadge'
import StoreBadges from '../components/ui/StoreBadges'
import ProjectMark from '../components/ui/ProjectMark'
import PhoneGallery from '../components/PhoneGallery'
import Reveal from '../components/ui/Reveal'
import NotFound from './NotFound'
import { ArrowLeft, ArrowUpRight, GitHub, Star } from '../components/ui/Icons'

function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />
  return <Detail key={project.slug} project={project} />
}

function Detail({ project }) {
  usePageTitle(project.title)
  const link = primaryLink(project)
  const embedUrl = project.embed && link ? link.url : null
  const demoFirst = embedUrl && project.embedPosition !== 'end'
  const [owner, repo] = (project.repo || '').split('/')
  const { data: repoInfo } = useRepository(owner, repo)

  return (
    <article>
      <section className="page-head" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link to="/projects" className="back"><ArrowLeft size={15} /> All projects</Link>

          <div className="detail-head">
            <div>
              <div className="detail-head__top">
                <ProjectMark project={project} />
                <StatusBadge status={project.status} />
                {project.category && <span className="chip chip--outline">{project.category}</span>}
              </div>
              <h1 className="display h1 detail-head__title">{project.title}</h1>
              <p className="lead">{project.tagline}</p>

              <div className="detail-head__actions">
                {project.links?.map(l => (
                  <a key={l.url} className={`btn${l.primary ? ' btn--primary' : ''}`} href={l.url} target="_blank" rel="noopener noreferrer">
                    {/github\.com/i.test(l.url) ? <GitHub size={15} /> : null}
                    {l.label} <ArrowUpRight size={14} />
                  </a>
                ))}
              </div>
              {project.storeBadges && <div style={{ marginTop: 16 }}><StoreBadges /></div>}

              {repoInfo && (
                <div className="repo-strip">
                  <span>Last updated <b>{formatDate(repoInfo.pushed_at)}</b></span>
                  {/* GitHub's language guess can be skewed by committed build output; only show it when it matches the stack. */}
                  {repoInfo.language && project.tech?.includes(repoInfo.language) && <span>Primary language <b>{repoInfo.language}</b></span>}
                  {repoInfo.stargazers_count > 0 && <span><Star size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> <b>{repoInfo.stargazers_count}</b></span>}
                </div>
              )}
            </div>

            <dl className="detail-meta">
              {project.role && <div><dt>Role</dt><dd>{project.role}</dd></div>}
              {project.year && <div><dt>Timeline</dt><dd>{project.year}</dd></div>}
              {project.tech?.length > 0 && <div><dt>Stack</dt><dd><div className="chips">{project.tech.map(t => <span key={t} className="chip">{t}</span>)}</div></dd></div>}
            </dl>
          </div>
        </div>
      </section>

      <section className="section--tight" style={{ paddingTop: 0 }}>
        <div className="container">
          {demoFirst && <LiveDemo project={project} url={embedUrl} lead />}

          {/* The cover would repeat the live demo right above it, so demo-first pages skip it. */}
          {project.cover && !demoFirst && (
            <Reveal className={`detail-cover${project.coverFit ? ` detail-cover--${project.coverFit}` : ''}`} style={project.coverBg ? { background: project.coverBg } : undefined}>
              <img
                src={asset(project.cover)}
                srcSet={project.coverSrcSet?.map(([path, w]) => `${asset(path)} ${w}w`).join(', ')}
                sizes={project.coverSrcSet ? '(max-width: 1120px) 100vw, 1040px' : undefined}
                alt={`${project.title} artwork`}
                width={project.coverSize?.[0] ?? 1280} height={project.coverSize?.[1] ?? 800}
              />
            </Reveal>
          )}

          {project.metrics?.length > 0 && (
            <Reveal className="metrics-row">
              {project.metrics.map(m => (
                <div key={m.label} className="metric-tile"><div className="metric__value">{m.value}</div><div className="metric__label">{m.label}</div></div>
              ))}
            </Reveal>
          )}

          {project.comparisons?.length > 0 && (
            <Reveal className="compare-section">
              <h2>Before and after</h2>
              {project.comparisonsNote && <p>{project.comparisonsNote}</p>}
              <div className="compare-list">
                {project.comparisons.map(c => (
                  <figure key={c.title} className="compare">
                    <figcaption className="compare__title">{c.title}{c.caption && <span>{c.caption}</span>}</figcaption>
                    <div className="compare__pair">
                      <div className="compare__side">
                        <span className="compare__label">Before</span>
                        <img src={asset(c.before)} alt={`${c.title}, before the redesign`} loading="lazy" />
                      </div>
                      <div className="compare__side compare__side--after">
                        <span className="compare__label">After</span>
                        <img src={asset(c.after)} alt={`${c.title}, after the redesign`} loading="lazy" />
                      </div>
                    </div>
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          <div className="detail-body">
            <Reveal className="detail-section">
              <h2>Overview</h2>
              <div className="prose"><p>{project.summary}</p></div>
            </Reveal>
          </div>

          {project.screens?.length > 0 && (
            <Reveal className="detail-gallery">
              <PhoneGallery items={project.screens} variant={project.screensStyle} />
            </Reveal>
          )}

          <div className="detail-body">

            {project.highlights?.length > 0 && (
              <Reveal className="detail-section">
                <h2>Highlights</h2>
                <ul className="detail-bullets">{project.highlights.map(h => <li key={h}>{h}</li>)}</ul>
              </Reveal>
            )}

            {project.sections?.map(s => (
              <Reveal key={s.heading} className="detail-section">
                <h2>{s.heading}</h2>
                {s.body && <div className="prose">{s.body.map((p, i) => <p key={i}>{p}</p>)}</div>}
                {s.bullets && <ul className="detail-bullets" style={s.body ? { marginTop: 12 } : undefined}>{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>}
              </Reveal>
            ))}
          </div>

          {project.gallery?.length > 0 && (
            <Reveal className="compare-section compare-section--after-body">
              <h2>Screens</h2>
              <div className="gallery">
                {project.gallery.map(g => (
                  <figure key={g.src}>
                    <img src={asset(g.src)} alt={g.alt || g.caption || ''} loading="lazy" />
                    {g.caption && <figcaption>{g.caption}</figcaption>}
                  </figure>
                ))}
              </div>
            </Reveal>
          )}

          {embedUrl && !demoFirst && <LiveDemo project={project} url={embedUrl} />}
        </div>
      </section>
    </article>
  )
}

/**
 * The project's primary link in a browser-style frame. As the `lead` it opens
 * the page, wider than the text column and without a heading; otherwise it
 * closes the page under its own heading.
 */
function LiveDemo({ project, url, lead = false }) {
  // The lead demo is already on screen, so it arrives with the page instead of on scroll.
  const Wrapper = lead ? 'div' : Reveal
  const [loaded, setLoaded] = useState(false)
  return (
    <Wrapper className={`embed${lead ? ' embed--lead' : ''}`}>
      {!lead && (
        <div className="section-head" style={{ marginBottom: 16 }}>
          <div>
            <span className="eyebrow">{project.embedEyebrow || 'Try it'}</span>
            <h2 className="h3 display">{project.embedTitle || 'Live demo'}</h2>
          </div>
        </div>
      )}
      <div className="embed__frame">
        <div className="embed__bar">
          <span className="dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="embed__url">{url.replace(/^https?:\/\//, '')}</span>
          <a href={url} target="_blank" rel="noopener noreferrer">Open in new tab <ArrowUpRight size={13} /></a>
        </div>
        <div className="embed__viewport">
          <iframe src={url} title={`${project.title} live demo`} loading={lead ? 'eager' : 'lazy'} sandbox="allow-scripts allow-same-origin allow-forms allow-popups" onLoad={() => setLoaded(true)} />
          {!loaded && <div className="embed__loading" aria-hidden="true">Loading {lead ? 'demo' : 'site'}…</div>}
        </div>
        <div className="embed__mobile">
          <p>This demo is built for a larger screen. Open it full-size in a new tab.</p>
          <a className="btn btn--primary" href={url} target="_blank" rel="noopener noreferrer">Open live demo <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </Wrapper>
  )
}
