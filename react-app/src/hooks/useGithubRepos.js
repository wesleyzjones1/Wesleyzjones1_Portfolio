import { useEffect, useState } from 'react'
import snapshot from '../content/repos.json'

const API = `https://api.github.com/users/${snapshot.user}/repos?per_page=100&sort=pushed&type=owner`

const hidden = new Set((snapshot.hide || []).map(n => n.toLowerCase()))

function normalise(list, fallback) {
  const byName = new Map(fallback.map(r => [r.name.toLowerCase(), r]))
  return list
    .filter(r => !r.fork && !r.archived && !r.private && !hidden.has(r.name.toLowerCase()))
    .map(r => ({
      name: r.name,
      description: r.description || byName.get(r.name.toLowerCase())?.description || '',
      language: r.language,
      stars: r.stargazers_count,
      url: r.html_url,
      homepage: r.homepage || '',
      pushedAt: r.pushed_at,
      topics: r.topics || [],
    }))
}

/**
 * The public repositories list. Starts from the snapshot in repos.json
 * (refreshed in CI on every deploy) and upgrades to live GitHub data when
 * the API answers. Rate limits or offline simply leave the snapshot in place.
 */
export function useGithubRepos() {
  const [repos, setRepos] = useState(() => snapshot.repos.filter(r => !hidden.has(r.name.toLowerCase())))
  const [live, setLive] = useState(false)

  useEffect(() => {
    let cancelled = false
    fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then(list => {
        if (cancelled || !Array.isArray(list)) return
        const fresh = normalise(list, snapshot.repos)
        if (fresh.length) { setRepos(fresh); setLive(true) }
      })
      .catch(() => { /* keep the snapshot */ })
    return () => { cancelled = true }
  }, [])

  return { repos, live, user: snapshot.user, fetchedAt: snapshot.fetchedAt }
}
