/**
 * Refreshes src/content/repos.json from the GitHub API.
 *
 * Runs in CI before every build (with GITHUB_TOKEN for a higher rate limit),
 * and can be run locally with `npm run sync-repos`. If the API cannot be
 * reached the committed snapshot is kept, so a build never fails on this.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const OUT = new URL('../src/content/repos.json', import.meta.url)
const current = JSON.parse(readFileSync(OUT, 'utf8'))
const user = current.user

const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'wesleyzjones-portfolio' }
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`

try {
  const res = await fetch(`https://api.github.com/users/${user}/repos?per_page=100&sort=pushed&type=owner`, { headers })
  if (!res.ok) throw new Error(`GitHub API responded ${res.status}`)
  const list = await res.json()
  const byName = new Map(current.repos.map(r => [r.name.toLowerCase(), r]))
  const repos = list
    .filter(r => !r.fork && !r.archived && !r.private)
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
  writeFileSync(OUT, JSON.stringify({ user, fetchedAt: new Date().toISOString(), repos }, null, 2) + '\n')
  console.log(`repos.json refreshed: ${repos.length} public repositories for ${user}`)
} catch (err) {
  console.warn(`repos.json not refreshed (${err.message}); keeping the committed snapshot of ${current.repos.length} repositories.`)
}
