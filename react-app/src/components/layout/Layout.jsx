import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useTheme } from '../../hooks/useTheme'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'instant' }) }, [pathname])
  return null
}

export default function Layout() {
  const { theme, toggle } = useTheme()
  return (
    <>
      <ScrollToTop />
      <Header theme={theme} onToggleTheme={toggle} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
