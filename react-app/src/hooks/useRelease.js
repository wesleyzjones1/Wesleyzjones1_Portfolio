import { useState, useEffect } from 'react'

/**
 * Fetches the latest GitHub release for the given owner/repo pair.
 * Returns { data, loading, error }.
 *
 * Uses the public GitHub Releases API — no auth token needed for public repos.
 * Rate limit: 60 unauthenticated requests/hour per IP.
 */
export function useRelease(owner, repo) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setData(null)
    setError(null)

    fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/releases/latest`,
      { headers: { Accept: 'application/vnd.github+json' } }
    )
      .then(r => {
        if (r.status === 404) throw new Error('No releases found')
        if (r.status === 403) throw new Error('API rate limit exceeded')
        if (!r.ok) throw new Error(`GitHub API: ${r.status}`)
        return r.json()
      })
      .then(d => { if (!cancelled) { setData(d); setLoading(false) } })
      .catch(e => { if (!cancelled) { setError(e.message); setLoading(false) } })

    return () => { cancelled = true }
  }, [owner, repo])

  return { data, loading, error }
}
