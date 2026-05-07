/**
 * repos.js — Configure your GitHub repositories here.
 *
 * Easiest setup (recommended):
 *   repository      — "owner/repo" or "repo" (string, required)
 *
 * Optional overrides:
 *   displayName     — Custom title (otherwise derived from repo name)
 *   description     — Custom description (otherwise pulled from GitHub repo metadata)
 *   githubPagesUrl  — Custom live URL (otherwise uses repo homepage when available)
 *   icon            — Emoji icon (default "📦")
 *   tags            — String[] labels shown on the card
 *   animation       — Sidebar animation component (import from ./components/animations/)
 *
 * Legacy fields still supported:
 *   owner, repo
 *
 * To add a new project, copy one object and change only `repository`.
 */

import PathfindingAnim from './components/animations/PathfindingAnim'
import GraphAnim from './components/animations/GraphAnim'
import SortingAnim from './components/animations/SortingAnim'
import FactorioAnim from './components/animations/FactorioAnim'

export const repos = [
  {
    repository: 'Pathfinding-Visualizer',
    animation: PathfindingAnim,
    tags: ['React', 'Algorithms', 'Visualization', 'Vite'],
  },

  {
    repository: 'Graph_Plotter',
    animation: GraphAnim,
    tags: ['Javascript', 'Equations', 'Visualization', 'Graphing'],
  },

  {
    repository: 'Sorting-Algorithm-Visualizer',
    animation: SortingAnim,
    tags: ['Javascript', 'Algorithms', 'Visualization', 'Sorting'],
  },

  {
    repository: 'Factorio-blueprint-generator',
    animation: FactorioAnim,
    tags: ['Javascript', 'Games', 'Visualization'],
  },

  // ── Add more repos below ──────────────────────────────────────────────────
  // {
  //   repository: 'your-repo-name',
  //   animation: MyAnim,   // import from ./components/animations/
  //   tags: ['JavaScript', 'HTML'],
  // },
]
