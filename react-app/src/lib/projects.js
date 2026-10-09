import { projects } from '../content/projects'

export const STATUS_LABELS = {
  live: 'Live',
  'coming-soon': 'Launching soon',
  'in-progress': 'In progress',
  archived: 'Archived',
}

export function allProjects() {
  return projects
}

export function featuredProjects() {
  return projects.filter(p => p.featured)
}

export function heroProject() {
  return projects.find(p => p.hero) || null
}

export function getProject(slug) {
  return projects.find(p => p.slug === slug) || null
}

export function categories() {
  const set = new Set(projects.map(p => p.category).filter(Boolean))
  return Array.from(set)
}

export function primaryLink(project) {
  if (!project.links?.length) return null
  return project.links.find(l => l.primary) || project.links[0]
}

export function neighbours(slug) {
  const i = projects.findIndex(p => p.slug === slug)
  if (i === -1) return { prev: null, next: null }
  return {
    prev: i > 0 ? projects[i - 1] : null,
    next: i < projects.length - 1 ? projects[i + 1] : null,
  }
}

/** Prefix a /public asset path with the Vite base so it works on GitHub Pages. */
export function asset(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
