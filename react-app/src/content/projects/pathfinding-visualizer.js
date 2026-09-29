import PathfindingAnim from '../../components/animations/PathfindingAnim'

export default {
  slug: 'pathfinding-visualizer',
  title: 'Pathfinding Visualizer',
  tagline: 'Watch ten pathfinding algorithms search a live grid in real time.',
  summary:
    'An interactive React tool for visualizing and comparing classic pathfinding algorithms. Draw walls, place the start and end, pick an algorithm and watch it search, then see the shortest path traced back with live iteration, path-length and timing stats.',

  status: 'live',
  featured: true,
  year: '2025',
  role: 'Sole developer',
  category: 'Web app',

  tech: ['React', 'Vite', 'JavaScript', 'CSS'],
  cover: 'projects/pathfinding-visualizer.webp',
  mark: PathfindingAnim,
  repo: 'wesleyzjones1/Pathfinding-Visualizer',

  links: [
    { label: 'Live demo', url: 'https://wesleyzjones1.github.io/Pathfinding-Visualizer/', primary: true },
    { label: 'Source', url: 'https://github.com/wesleyzjones1/Pathfinding-Visualizer' },
  ],
  embed: true,

  metrics: [
    { value: '10', label: 'algorithms' },
    { value: '0', label: 'dependencies at runtime' },
  ],

  highlights: [
    'A*, Dijkstra, BFS, DFS, Greedy Best-First, Bidirectional, Jump Point Search, IDDFS, Best-First and any-angle Theta*.',
    'Procedural preset generators fill the grid with mazes, spirals, fortresses and scatter layouts.',
    'Adjustable speed from step-through to instant, with live statistics as the search runs.',
    'Responsive grid that resizes to the window, with light and dark themes.',
  ],

  sections: [
    {
      heading: 'Why I built it',
      body: [
        'Reading about heuristics is one thing; watching A* and Greedy Best-First make different choices on the same maze is another. I wanted a tool where the difference between "optimal" and "fast" is something you can see.',
      ],
    },
    {
      heading: 'Engineering notes',
      bullets: [
        'Each algorithm is written as a generator so the UI can step through the frontier at any speed without the algorithm knowing about rendering.',
        'Theta* required a line-of-sight check over the grid, which is a nice example of a small geometric primitive changing the character of the result.',
        'No backend and no runtime dependencies beyond React; deployed to GitHub Pages from CI.',
      ],
    },
  ],
}
