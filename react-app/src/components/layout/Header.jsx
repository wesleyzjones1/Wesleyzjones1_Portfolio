import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { profile } from '../../content/profile'
import { asset } from '../../lib/projects'
import { Download, Menu, Close, Sun, Moon } from '../ui/Icons'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Work' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Header({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const initials = profile.name.split(' ').map(w => w[0]).join('').slice(0, 2)

  return (
    <header className={`header${scrolled ? ' is-scrolled' : ''}`}>
      <div className="container header__inner">
        <Link to="/" className="brand" aria-label={`${profile.name} – home`}>
          <span className="brand__mark" aria-hidden="true">{initials}</span>
          <span>{profile.name}</span>
        </Link>

        <nav className="nav" aria-label="Primary">
          {LINKS.map(l => (
            <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button type="button" className="btn btn--ghost btn--icon theme-toggle" onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} title={theme === 'dark' ? 'Light theme' : 'Dark theme'}>
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <a className="btn btn--sm header__resume" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer">
            <Download size={15} /> Résumé
          </a>
          <button type="button" className="btn btn--ghost btn--icon menu-btn" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'}>
            {open ? <Close size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className={`mobile-nav${open ? ' is-open' : ''}`} aria-label="Mobile">
        {LINKS.map(l => (
          <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)} className={({ isActive }) => `nav__link${isActive ? ' is-active' : ''}`}>
            {l.label}
          </NavLink>
        ))}
        <a className="btn" href={asset(profile.resumeFile)} target="_blank" rel="noopener noreferrer">
          <Download size={15} /> Download résumé
        </a>
      </nav>
    </header>
  )
}
