import FactorioAnim from '../../components/animations/FactorioAnim'

export default {
  slug: 'factorio-blueprint-generator',
  title: 'Factorio Blueprint Generator',
  tagline: 'Turns any image into a Factorio blueprint you can paste straight into the game.',
  summary:
    'A browser tool that converts a picture into a Factorio blueprint string. Load an image, tune the resolution, black-and-white threshold and noise reduction, choose transport belts, pipes or concrete as the "pixels", and copy the encoded blueprint to the clipboard. The preview is drawn over a real map tile so you can judge the result at in-game scale before you build it.',

  status: 'live',
  featured: false,
  year: '2026',
  role: 'Sole developer',
  category: 'Tooling',

  tech: ['JavaScript', 'Canvas', 'HTML', 'CSS'],
  cover: 'projects/factorio-blueprint-generator.webp',
  mark: FactorioAnim,
  repo: 'wesleyzjones1/Factorio-blueprint-generator',

  links: [
    { label: 'Live demo', url: 'https://wesleyzjones1.github.io/Factorio-blueprint-generator/', primary: true },
    { label: 'Source', url: 'https://github.com/wesleyzjones1/Factorio-blueprint-generator' },
  ],
  embed: true,

  highlights: [
    'Canvas pipeline: downsample, threshold to black and white, optional inversion and noise reduction, all re-rendered live as the sliders move.',
    'Writes the game’s real blueprint format: entity JSON, zlib-compressed and base64-encoded behind the version byte, so the output imports directly.',
    'Three entity palettes (transport belt, pipe, concrete) and a zoomed preview over an actual map tile so small images stay legible.',
    'Built because decorating a factory by hand was too slow and, honestly, too fun to leave alone.',
  ],
}
