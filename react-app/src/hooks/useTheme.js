import { useCallback, useEffect, useState } from 'react'

const KEY = 'theme'

function systemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function readStored() {
  try { return localStorage.getItem(KEY) } catch { return null }
}

/**
 * Light/dark theme. Follows the system until the visitor picks one; the
 * choice persists in localStorage. index.html applies the same rule before
 * React loads so there is no flash.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => readStored() || systemTheme())

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mq) return
    const onChange = () => { if (!readStored()) setTheme(systemTheme()) }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    setTheme(t => {
      const next = t === 'dark' ? 'light' : 'dark'
      try { localStorage.setItem(KEY, next) } catch { /* private mode */ }
      return next
    })
  }, [])

  return { theme, toggle }
}
