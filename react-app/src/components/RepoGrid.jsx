import { Link } from 'react-router-dom'
import { allProjects } from '../lib/projects'
import { ArrowRight, ArrowUpRight, GitHub, Star } from './ui/Icons'

const LANGUAGE_COLORS = {
  JavaScript: '#e3c531', TypeScript: '#3178c6', Python: '#3572a5', Dart: '#00b4ab',
  'C++': '#f34b7d', C: '#6e6e6e', HTML: '#e34c26', CSS: '#563d7c', Java: '#b07219', Shell: '#89e051',
}

function monthYear(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

/** Grid of public repositories, with a link to the write-up when one exists. */
export default function RepoGrid({ repos }) {
  const writeUps = new Map(
    allProjects().filter(p => p.repo).map(p => [p.repo.split('/')[1].toLowerCase(), p.slug])
  )
  return (
    <ul className="repos">
      {repos.map(r => {
        const slug = writeUps.get(r.name.toLowerCase())
        return (
          <li key={r.name} className="repo">
            <div className="repo__head">
              <a className="repo__name" href={r.url} target="_blank" rel="noopener noreferrer"><GitHub size={15} /> {r.name}</a>
              {r.stars > 0 && <span className="repo__stars"><Star size={12} /> {r.stars}</span>}
            </div>
            {r.description && <p className="repo__desc">{r.description}</p>}
            <div className="repo__meta">
              {r.language && <span className="repo__lang"><i style={{ background: LANGUAGE_COLORS[r.language] || 'var(--text-3)' }} /> {r.language}</span>}
              {r.pushedAt && <span>Updated {monthYear(r.pushedAt)}</span>}
            </div>
            <div className="repo__links">
              {slug && <Link to={`/projects/${slug}`}>Write-up <ArrowRight size={13} /></Link>}
              {r.homepage && <a href={r.homepage} target="_blank" rel="noopener noreferrer">Live <ArrowUpRight size={12} /></a>}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
