/**
 * repos.js — Configure your GitHub repositories here.
 *
 * Easiest setup (recommended):
 *   repository      — "owner/repo" (string, required)
 *
 * Optional overrides:
 *   displayName     — Custom title (otherwise derived from repo name)
 *   description     — Custom description (otherwise pulled from GitHub repo metadata)
 *   githubPagesUrl  — Custom live URL (otherwise uses repo homepage when available)
 *   icon            — Emoji icon (default "📦")
 *   tags            — String[] labels shown on the card
 *
 * Legacy fields still supported:
 *   owner, repo
 *
 * To add a new project, copy one object and change only `repository`.
 */

export const repos = [
  {
    repository: 'wesleyzjones1/Pathfinding-Visualizer',
    icon: '🗺️',
    tags: ['React', 'Algorithms', 'Visualization', 'Vite'],
  },

  {
    repository: 'wesleyzjones1/Graph_Plotter',
    icon: '📈',
    tags: ['Javascript', 'Equations', 'Visualization', 'Graphing'],
  },

  {
    repository: 'wesleyzjones1/Sorting-Algorithm-Visualizer',
    icon: '🔀',
    tags: ['Javascript', 'Algorithms', 'Visualization', 'Sorting'],
  },


  // ── Add more repos below ──────────────────────────────────────────────────
  // {
  //   repository: 'your-github-username/your-other-project',
  //   icon: '🚀',
  //   tags: ['JavaScript', 'HTML'],
  // },
]
