import { useRelease } from '../hooks/useRelease'
import { useRepository } from '../hooks/useRepository'

/* ── Icons ── */
const RepoIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
)

const TagIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </svg>
)

const ExternalIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

/* ── Helpers ── */
function formatDate(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

/** Grab first ~200 chars of release notes, text only, no markdown. */
function trimNotes(body) {
  if (!body) return null
  const plain = body.replace(/#{1,6}\s/g, '').replace(/[*_`[\]]/g, '').trim()
  const lines = plain.split('\n').map(l => l.trim()).filter(Boolean)
  const joined = lines.slice(0, 5).join(' ')
  return joined.length > 220 ? joined.slice(0, 220) + '…' : joined
}

function isHttpUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value)
}

/* ── Component ── */
export default function ProjectCard({ project, onOpenProject }) {
  const { owner, repo, displayName, description, githubPagesUrl, icon, tags } = project
  const { data: repoInfo } = useRepository(owner, repo)
  const { data: release, loading, error } = useRelease(owner, repo)
  const resolvedDisplayName = displayName || repoInfo?.name || repo
  const resolvedDescription = description || repoInfo?.description || 'No description available yet.'
  const repositoryUrl = repoInfo?.html_url || `https://github.com/${owner}/${repo}`
  const readmeUrl = `${repositoryUrl}#readme`
  const resolvedPagesUrl = githubPagesUrl || (isHttpUrl(repoInfo?.homepage) ? repoInfo.homepage : '')

  const notes = release ? trimNotes(release.body) : null

  const handleCardClick = () => {
    if (resolvedPagesUrl && onOpenProject) {
      onOpenProject(`${owner}/${repo}`)
    }
  }

  const stopCardClick = (event) => {
    event.stopPropagation()
  }

  return (
    <>
      <div
        className={`project-card${resolvedPagesUrl ? ' project-card-clickable' : ''}`}
        onClick={handleCardClick}
        role={resolvedPagesUrl ? 'button' : undefined}
        tabIndex={resolvedPagesUrl ? 0 : undefined}
        onKeyDown={resolvedPagesUrl ? (event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            handleCardClick()
          }
        } : undefined}
      >

        {/* Header */}
        <div className="card-header">
          <div className="card-icon">{icon || '📦'}</div>
          <div className="card-title-wrap">
            <div className="card-title">{resolvedDisplayName}</div>
            <div className="card-owner">{owner}/{repo}</div>
          </div>
        </div>

        {/* Description */}
        <p className="card-description">{resolvedDescription}</p>

        {/* Tags */}
        {tags?.length > 0 && (
          <div className="card-tags">
            {tags.map(t => <span key={t} className="card-tag">{t}</span>)}
          </div>
        )}

        {/* Latest Release */}
        <div className="card-release">
          {loading && (
            <div className="release-loading">
              <span className="spinner" />
              Fetching latest release…
            </div>
          )}
          {!loading && error && (
            <div className="release-error">{error}</div>
          )}
          {!loading && release && (
            <>
              <div className="card-release-header">
                <span className="release-tag"><TagIcon /> {release.tag_name}</span>
                <span className="release-date">{formatDate(release.published_at)}</span>
              </div>
              {notes && <p className="release-notes">{notes}</p>}
            </>
          )}
          {!loading && !release && !error && (
            <div className="release-error">Release not found.</div>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions">
          <a
            className="btn"
            href={readmeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stopCardClick}
          >
            README <ExternalIcon />
          </a>

          <a
            className="btn"
            href={repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={stopCardClick}
          >
            <RepoIcon /> Repository
          </a>

          {release && (
            <a
              className="btn"
              href={release.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stopCardClick}
            >
              <TagIcon /> Release <ExternalIcon />
            </a>
          )}
        </div>

      </div>
    </>
  )
}
