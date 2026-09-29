import { Link } from 'react-router-dom'
import { profile } from '../../content/profile'
import { GitHub, LinkedIn, Mail } from '../ui/Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <strong style={{ color: 'var(--text)' }}>{profile.name}</strong> · {profile.role} · {profile.location}
        </div>
        <div className="footer__links">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer"><GitHub /> GitHub</a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer"><LinkedIn /> LinkedIn</a>
          <a href={`mailto:${profile.email}`}><Mail /> Email</a>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer__meta">© {new Date().getFullYear()} · Built with React &amp; Vite</div>
      </div>
    </footer>
  )
}
