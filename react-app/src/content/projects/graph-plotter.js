import GraphAnim from '../../components/animations/GraphAnim'

export default {
  slug: 'graph-plotter',
  title: 'Graph Plotter',
  tagline: 'An equation plotter that parses expressions and finds their intercepts.',
  summary:
    'A browser-based plotter for exploring algebraic expressions in real time. Type an expression such as (x-2)(x-1)x(x+1)(x+2), pan and zoom the plane, click the curve to inspect points, and read computed intercepts, including repeated roots, from the toolbar.',

  status: 'live',
  featured: true,
  year: '2025',
  role: 'Sole developer',
  category: 'Web app',

  tech: ['JavaScript', 'Canvas', 'HTML', 'CSS'],
  cover: 'projects/graph-plotter.webp',
  mark: GraphAnim,
  repo: 'wesleyzjones1/Graph_Plotter',

  links: [
    { label: 'Live demo', url: 'https://wesleyzjones1.github.io/Graph_Plotter/', primary: true },
    { label: 'Source', url: 'https://github.com/wesleyzjones1/Graph_Plotter' },
  ],
  embed: true,

  highlights: [
    'Hand-written expression parser that handles implicit multiplication, powers and nested factors.',
    'Intercept detection that reports repeated and touching roots correctly.',
    'Smooth pan and zoom with a dedicated renderer, plus click-to-inspect markers on the curve.',
    'A small test file for the polynomial logic, because parsers are where bugs hide.',
  ],

  sections: [
    {
      heading: 'Engineering notes',
      bullets: [
        'The parser and the renderer are separate modules, so the maths can be tested without a canvas.',
        'Root finding combines sampling with refinement so intercepts stay accurate as you zoom.',
        'Theme preference persists in localStorage; the whole project is static with no build step.',
      ],
    },
  ],
}
