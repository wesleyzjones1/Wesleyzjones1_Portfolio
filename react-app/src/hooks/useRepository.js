import { useEffect, useState } from 'react'

/**
 * Fetches GitHub repository metadata for public repos.
 * Returns { data, loading, error }.
 *
 * State is keyed by the owner/repo pair and only written from the fetch
 * callbacks, so switching repos never needs a synchronous reset inside the
 * effect — `loading` is derived from whether the stored result is stale.
 */
export function useRepository(owner, repo) {
  const key = owner && repo ? `${owner}/${repo}` : null
  const [result, setResult] = useState({ key: null, data: null, error: null })

  useEffect(() => {
    if (!key) return

    let cancelled = false
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
        if (!cancelled) setResult({ key, data: d, error: null })
      })
      .catch(e => {
        if (!cancelled) setResult({ key, data: null, error: e.message })
      })

    return () => {
      cancelled = true
    }
  }, [key, owner, repo])

  if (!key) {
    return { data: null, loading: false, error: 'Invalid repository name' }
  }
  const fresh = result.key === key
  return {
    data: fresh ? result.data : null,
    loading: !fresh,
    error: fresh ? result.error : null,
  }
}
