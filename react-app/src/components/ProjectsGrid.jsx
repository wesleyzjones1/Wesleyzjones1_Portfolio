import ProjectCard from './ProjectCard'

const SearchIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

export default function ProjectsGrid({ repos, search, setSearch, onSelectProject }) {
  return (
    <div className="projects-page">
      <div className="projects-header">
        <h1 className="projects-title">
          Projects
          <span className="projects-count">{repos.length} repo{repos.length !== 1 ? 's' : ''}</span>
        </h1>

        <div className="projects-search">
          <SearchIcon />
          <input
            type="search"
            placeholder="Filter by name, tag, or description…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      {repos.length === 0 ? (
        <div className="projects-empty">
          No projects match &ldquo;{search}&rdquo;
        </div>
      ) : (
        <div className="projects-grid">
          {repos.map(r => (
            <ProjectCard
              key={`${r.owner}/${r.repo}`}
              project={r}
              onOpenProject={onSelectProject}
            />
          ))}
        </div>
      )}
    </div>
  )
}
