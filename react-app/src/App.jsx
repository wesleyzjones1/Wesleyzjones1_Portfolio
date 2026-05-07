import { useEffect, useState, useMemo } from 'react'
import { repos } from './repos'
const DEFAULT_OWNER = 'wesleyzjones1'
import Sidebar from './components/Sidebar'
import Home from './components/Home'
import ProjectsGrid from './components/ProjectsGrid'
import { useRepository } from './hooks/useRepository'
import './App.css'

function titleFromRepoName(repoName) {
  if (!repoName) return 'Untitled Project'
  return repoName
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, ch => ch.toUpperCase())
}

function splitRepositoryRef(repository) {
  if (!repository || typeof repository !== 'string') {
    return { owner: '', repo: '' }
  }
  const trimmed = repository.trim()
  if (trimmed.includes('/')) {
    const [owner = '', repo = ''] = trimmed.split('/').map(v => v.trim())
    return { owner, repo }
  }
  return { owner: '', repo: trimmed }
}

function isHttpUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value)
}

export default function App() {
  const [page, setPage] = useState('home')
  const [search, setSearch] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const normalizedRepos = useMemo(() => {
    return repos
      .map((entry, index) => {
        const parsed = splitRepositoryRef(entry.repository)
        const owner = entry.owner || parsed.owner || DEFAULT_OWNER
        const repo = entry.repo || parsed.repo

        if (!owner || !repo) {
          return null
        }

        return {
          ...entry,
          owner,
          repo,
          displayName: entry.displayName || titleFromRepoName(repo),
          id: `${owner}/${repo}`,
          _order: index,
        }
      })
      .filter(Boolean)
  }, [])

  const filteredRepos = useMemo(() => {
    if (!search.trim()) return normalizedRepos
    const q = search.toLowerCase()
    return normalizedRepos.filter(
      r =>
        r.displayName.toLowerCase().includes(q) ||
        `${r.owner}/${r.repo}`.toLowerCase().includes(q) ||
        (r.description || '').toLowerCase().includes(q) ||
        (r.tags || []).some(t => t.toLowerCase().includes(q))
    )
  }, [normalizedRepos, search])

  const selectedProject = useMemo(
    () => normalizedRepos.find(r => r.id === page) || null,
    [normalizedRepos, page]
  )

  const handleSelectProject = (projectId) => {
    setPage(projectId)
  }

  return (
    <div className={`app-layout${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <Sidebar
        repos={normalizedRepos}
        page={page}
        setPage={setPage}
        search={search}
        setSearch={setSearch}
        open={sidebarOpen}
        setOpen={setSidebarOpen}
      />
      <main className={`main-content${selectedProject ? ' main-content-project' : ''}`}>
        {page === 'home' && <Home setPage={setPage} />}
        {page === 'projects' && (
          <ProjectsGrid
            repos={filteredRepos}
            search={search}
            setSearch={setSearch}
            onSelectProject={handleSelectProject}
          />
        )}
        {selectedProject && <ProjectLivePage project={selectedProject} />}
      </main>
    </div>
  )
}

function ProjectLivePage({ project }) {
  const { owner, repo, githubPagesUrl } = project
  const { data: repoInfo, loading } = useRepository(owner, repo)
  const [allowProjectScroll, setAllowProjectScroll] = useState(() => window.innerWidth >= 1200)

  useEffect(() => {
    const onResize = () => setAllowProjectScroll(window.innerWidth >= 1200)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const resolvedPagesUrl = githubPagesUrl || (isHttpUrl(repoInfo?.homepage) ? repoInfo.homepage : '')

  if (loading) {
    return <div className="project-live-state">Loading project...</div>
  }

  if (!resolvedPagesUrl) {
    return <div className="project-live-state">No live URL found for this project.</div>
  }

  return (
    <div className="project-live-page">
      <iframe
        className="project-live-iframe"
        src={resolvedPagesUrl}
        title={`${project.displayName} live preview`}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock allow-presentation"
        scrolling={allowProjectScroll ? 'auto' : 'no'}
      />
    </div>
  )
}
