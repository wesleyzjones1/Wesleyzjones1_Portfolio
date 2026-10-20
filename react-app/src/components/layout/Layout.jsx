import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useTheme } from '../../hooks/useTheme'
import { useCardLight } from '../../hooks/useCardLight'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function Layout() {
  const { theme, toggle } = useTheme()
  const { pathname } = useLocation()
  useCardLight()
  return (
    <>
      <ScrollToTop />
      <Header theme={theme} onToggleTheme={toggle} />
      {/* Keyed by route so each page fades in on navigation. */}
      <main key={pathname} className="page">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
