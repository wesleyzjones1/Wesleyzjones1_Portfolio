import FactorioAnim from '../../components/animations/FactorioAnim'

export default {
  slug: 'factorio-blueprint-generator',
  title: 'Factorio Blueprint Generator',
  tagline: 'Generates Factorio blueprint strings from a description of the factory you want.',
  summary:
    'A JavaScript tool that builds Factorio blueprints programmatically instead of by hand. Describe the layout you want and it produces the encoded blueprint string the game can import directly.',

  status: 'live',
  featured: false,
  year: '2025',
  role: 'Sole developer',
  category: 'Tooling',

  tech: ['JavaScript', 'HTML', 'CSS'],
  mark: FactorioAnim,
  repo: 'wesleyzjones1/Factorio-blueprint-generator',

  links: [
    { label: 'Source', url: 'https://github.com/wesleyzjones1/Factorio-blueprint-generator', primary: true },
  ],

  highlights: [
    'Implements the game’s blueprint format: JSON, zlib-compressed and base64-encoded with a version prefix.',
    'Lays out entities on a grid with correct orientation so belts and inserters line up.',
    'Built to scratch my own itch after too many hours placing the same assembler rows by hand.',
  ],
}
