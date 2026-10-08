import { useEffect } from 'react'
import { profile } from '../content/profile'

const SITE_TITLE = `${profile.name} · ${profile.role}`

/**
 * Sets the browser tab title for the current route. Pass nothing for the
 * home page; every other page gets "<title> · <name>".
 */
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} · ${profile.name}` : SITE_TITLE
  }, [title])
}
