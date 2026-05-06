const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const HomeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
)

const GridIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
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
      {/* Header */}
      <div className="sidebar-header">
        <button className="sidebar-logo" onClick={() => navigate('home')} title="Home">
          <div className="sidebar-logo-icon">◈</div>
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
          <span className="nav-item-icon"><HomeIcon /></span>
          <span className="nav-item-label">Home</span>
        </button>

        <button
          className={`nav-item${page === 'projects' ? ' active' : ''}`}
          onClick={() => navigate('projects')}
        >
          <span className="nav-item-icon"><GridIcon /></span>
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
              <span className="nav-item-icon">{r.icon || '📦'}</span>
              <span className="nav-item-label">{label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
