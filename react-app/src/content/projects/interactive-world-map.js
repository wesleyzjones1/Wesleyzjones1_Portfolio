import WorldMapAnim from '../../components/animations/WorldMapAnim'

export default {
  slug: 'interactive-world-map',
  title: 'Interactive World Map',
  tagline: 'A clickable SVG world map backed by the World Bank API.',
  summary:
    'An Angular application with an interactive SVG map of the world. Click any country to fetch and display its capital, region, income level and coordinates from the World Bank API.',

  status: 'live',
  featured: false,
  year: '2024',
  role: 'Sole developer',
  category: 'Web app',

  tech: ['Angular', 'TypeScript', 'SVG', 'REST API'],
  cover: 'projects/interactive-world-map.webp',
  mark: WorldMapAnim,
  repo: 'wesleyzjones1/Interactive-World-Map',

  links: [
    { label: 'Source', url: 'https://github.com/wesleyzjones1/Interactive-World-Map', primary: true },
  ],

  highlights: [
    'Every country is an addressable SVG region wired to a click handler.',
    'Angular HttpClient service layer against the World Bank country endpoint.',
    'Built while completing the Software Engineering degree; my first production-style Angular app.',
  ],
}
