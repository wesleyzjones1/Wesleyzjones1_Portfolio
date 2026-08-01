const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
)

const ArrowRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
)

const PinIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

const BriefcaseIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
)

const PROFILE = {
  name: 'Wesley Jones',
  title: 'Software Engineer',
  company: 'Universal Switching',
  location: 'Thousand Oaks, CA',
  bio: 'I build practical web applications and interactive engineering tools, turning complex ideas into clear, reliable user experiences with React and JavaScript.',
  about: 'I build portfolio and product-focused applications with a strong emphasis on frontend performance, clean UI, and maintainable code. My recent work includes algorithm and graph visualization projects that demonstrate problem-solving, data modeling, and interactive design.',
  github: 'https://github.com/wesleyzjones1',
  linkedin: 'https://www.linkedin.com/in/wesleyzjones1',
  email: 'wesleyzjones1@gmail.com',
  tech: ['React', 'JavaScript', 'Python', 'Node.js', 'HTML/CSS', 'Git', 'Vite', 'GitHub Actions'],
  experience: [
    {
      role: 'Software Engineer',
      company: 'Universal Switching',
      location: 'Thousand Oaks, CA',
      summary: 'Building web applications and interactive engineering tools with a focus on frontend performance and dependable, maintainable code.',
    },
  ],
}

const FEATURED_COUNT = 4

export default function Home({ setPage, repos = [] }) {
  const featured = repos.slice(0, FEATURED_COUNT)

  return (
    <div className="home-page">
      {/* ── Hero ── */}
      <section className="home-hero">
        <div className="home-avatar-wrap">
          <img src="profile.jpg" alt={PROFILE.name} className="home-avatar" />
        </div>

        <div className="home-hero-text">
          <p className="home-greeting">Hello, I&apos;m</p>
          <h1 className="home-name">{PROFILE.name}</h1>
          <p className="home-title">{PROFILE.title}</p>
          <div className="home-meta">
            <span className="home-meta-item"><BriefcaseIcon /> {PROFILE.company}</span>
            <span className="home-meta-item"><PinIcon /> {PROFILE.location}</span>
          </div>
          <p className="home-bio">{PROFILE.bio}</p>

          <div className="home-links">
            <button type="button" className="home-link-btn primary" onClick={() => setPage('projects')}>
              <GridIcon /> View Projects
            </button>
            <a href={PROFILE.github} target="_blank" rel="noopener noreferrer" className="home-link-btn">
              <GithubIcon /> GitHub <ExternalIcon />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noopener noreferrer" className="home-link-btn">
              <LinkedInIcon /> LinkedIn <ExternalIcon />
            </a>
            <button type="button" className="home-link-btn" onClick={() => setPage('contact')}>
              <MailIcon /> Contact
            </button>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="home-section">
        <h2 className="home-section-title">About Me</h2>
        <div className="home-prose">
          <p className="home-section-body">{PROFILE.about}</p>
        </div>
      </section>

      {/* ── Featured projects ── */}
      {featured.length > 0 && (
        <section className="home-section">
          <div className="home-section-head">
            <h2 className="home-section-title">Featured Projects</h2>
            <button type="button" className="home-view-all" onClick={() => setPage('projects')}>
              View all <ArrowRightIcon />
            </button>
          </div>
          <div className="featured-grid">
            {featured.map(r => (
              <FeaturedCard key={r.id} project={r} onClick={() => setPage(r.id)} />
            ))}
          </div>
        </section>
      )}

      {/* ── Technologies ── */}
      <section className="home-section">
        <h2 className="home-section-title">Technologies</h2>
        <div className="tech-badges">
          {PROFILE.tech.map(t => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="home-section">
        <h2 className="home-section-title">Experience</h2>
        <div className="experience-list">
          {PROFILE.experience.map(job => (
            <div key={`${job.company}-${job.role}`} className="experience-item">
              <div className="experience-head">
                <span className="experience-role">{job.role}</span>
                <span className="experience-company">{job.company}</span>
              </div>
              <div className="experience-location"><PinIcon /> {job.location}</div>
              <p className="experience-summary">{job.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact CTA ── */}
      <section className="home-cta">
        <div>
          <h2 className="home-cta-title">Have a project in mind?</h2>
          <p className="home-cta-body">I&apos;m always open to talking about new work, collaborations, or ideas.</p>
        </div>
        <button type="button" className="home-link-btn primary" onClick={() => setPage('contact')}>
          <MailIcon /> Get in Touch
        </button>
      </section>
    </div>
  )
}

function FeaturedCard({ project, onClick }) {
  const Anim = project.animation || null
  return (
    <button type="button" className="featured-card" onClick={onClick}>
      <div className="featured-card-header">
        <div className="featured-card-icon">{Anim ? <Anim /> : (project.icon || '📦')}</div>
        <span className="featured-card-title">{project.displayName}</span>
      </div>
      {project.description && <p className="featured-card-desc">{project.description}</p>}
      {project.tags?.length > 0 && (
        <div className="card-tags">
          {project.tags.map(t => <span key={t} className="card-tag">{t}</span>)}
        </div>
      )}
    </button>
  )
}
