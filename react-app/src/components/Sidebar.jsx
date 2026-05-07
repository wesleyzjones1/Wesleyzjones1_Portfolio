const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const NAV_ANIM_STYLES = `
  .nav-anim {
    width: 26px; height: 26px;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; position: relative;
  }
  @keyframes door-pulse {
    0%, 100% { opacity: 0.35; }
    50%       { opacity: 1; }
  }
  .home-door { animation: none; opacity: 1; }
  .nav-anim-projects {
    display: grid;
    grid-template-columns: repeat(2, 10px);
    grid-template-rows: repeat(2, 10px);
    gap: 2px;
  }
  .nav-anim-projects span { background: currentColor; border-radius: 1px; }
  @keyframes tile-pop {
    0%, 55%, 100% { opacity: 0.25; transform: scale(0.82); }
    27%            { opacity: 1;    transform: scale(1); }
  }
  .nav-anim-projects span:nth-child(1) { animation: tile-pop 2s ease-in-out infinite 0s; }
  .nav-anim-projects span:nth-child(2) { animation: tile-pop 2s ease-in-out infinite 0.5s; }
  .nav-anim-projects span:nth-child(3) { animation: tile-pop 2s ease-in-out infinite 1s; }
  .nav-anim-projects span:nth-child(4) { animation: tile-pop 2s ease-in-out infinite 1.5s; }
`

const HomeAnim = () => (
  <span className="nav-anim" aria-hidden="true">
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10L11 3l8 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <rect className="home-door" x="8" y="14" width="4.5" height="6" rx="0.5" />
    </svg>
  </span>
)

const ProjectsAnim = () => (
  <span aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26 }}>
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0" y="0" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="0" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="18" y="0" width="6" height="6" rx="1" fill="currentColor" />

      <rect x="0" y="9" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="18" y="9" width="6" height="6" rx="1" fill="currentColor" />

      <rect x="0" y="18" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="9" y="18" width="6" height="6" rx="1" fill="currentColor" />
      <rect x="18" y="18" width="6" height="6" rx="1" fill="currentColor" />
    </svg>
  </span>
)

const ChevronLeft = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
)

export default function Sidebar({ repos, page, setPage, search, setSearch, open, setOpen }) {
  const navigate = (p) => {
    setPage(p)
    // auto-close on small screens
    if (window.innerWidth < 768) setOpen(false)
  }

  return (
    <nav className="sidebar">
      <style>{NAV_ANIM_STYLES}</style>
      {/* Header */}
      <div className="sidebar-header">
        <button className="sidebar-logo" onClick={() => navigate('home')} title="Home">
          <div className="sidebar-logo-icon">
            <img src="profile.jpg" alt="Profile" className="sidebar-logo-avatar" />
          </div>
          <span className="sidebar-logo-text">My Portfolio</span>
        </button>
        <button
          className="sidebar-toggle"
          onClick={() => setOpen(o => !o)}
          title={open ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Search */}
      <div className="sidebar-search">
        <div className="search-wrap">
          <SearchIcon />
          <input
            type="search"
            placeholder="Search projects…"
            value={search}
            onChange={e => {
              setSearch(e.target.value)
              if (page !== 'projects') setPage('projects')
            }}
          />
        </div>
      </div>

      {/* Nav */}
      <div className="sidebar-nav">
        <span className="nav-label">Navigate</span>

        <button
          className={`nav-item${page === 'home' ? ' active' : ''}`}
          onClick={() => navigate('home')}
        >
          <span className="nav-item-icon"><HomeAnim /></span>
          <span className="nav-item-label">Home</span>
        </button>

        <button
          className={`nav-item${page === 'projects' ? ' active' : ''}`}
          onClick={() => navigate('projects')}
        >
          <span className="nav-item-icon"><ProjectsAnim /></span>
          <span className="nav-item-label">Projects</span>
        </button>

        <div className="nav-divider" />
        <span className="nav-label">Repositories</span>

        {repos.map(r => {
          const id = `${r.owner}/${r.repo}`
          const label = r.displayName || r.repo || id
          return (
            <button
              key={id}
              className={`nav-item${page === id ? ' active' : ''}`}
              onClick={() => navigate(id)}
              title={label}
            >
              <span className="nav-item-icon">{r.animation ? <r.animation /> : (r.icon || '📦')}</span>
              <span className="nav-item-label">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
