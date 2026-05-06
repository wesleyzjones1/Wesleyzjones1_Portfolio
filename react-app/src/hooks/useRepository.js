import { useEffect, useState } from 'react'

/**
 * Fetches GitHub repository metadata for public repos.
 * Returns { data, loading, error }.
 */
export function useRepository(owner, repo) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!owner || !repo) {
      setData(null)
      setLoading(false)
      setError('Invalid repository name')
      return
    }

    let cancelled = false
    setLoading(true)
    setData(null)
    setError(null)

    fetch(
      `https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`,
      { headers: { Accept: 'application/vnd.github+json' } }
    )
      .then(r => {
        if (r.status === 404) throw new Error('Repository not found')
        if (r.status === 403) throw new Error('API rate limit exceeded')
        if (!r.ok) throw new Error(`GitHub API: ${r.status}`)
        return r.json()
      })
      .then(d => {
        if (!cancelled) {
          setData(d)
          setLoading(false)
        }
      })
      .catch(e => {
        if (!cancelled) {
          setError(e.message)
          setLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [owner, repo])

  return { data, loading, error }
}
