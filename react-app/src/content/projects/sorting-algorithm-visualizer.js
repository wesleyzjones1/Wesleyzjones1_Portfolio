import SortingAnim from '../../components/animations/SortingAnim'

export default {
  slug: 'sorting-algorithm-visualizer',
  title: 'Sorting Algorithm Visualizer',
  tagline: 'Five sorting algorithms, animated step by step with live comparison and swap counts.',
  summary:
    'A zero-dependency JavaScript visualizer for bubble, insertion, selection, quick and merge sort. Generate a random array, choose an algorithm and speed, and watch the bars sort themselves while comparisons, swaps and elapsed time update live.',

  status: 'live',
  featured: true,
  year: '2025',
  role: 'Sole developer',
  category: 'Web app',

  tech: ['JavaScript', 'HTML', 'CSS'],
  cover: 'projects/sorting-algorithm-visualizer.webp',
  mark: SortingAnim,
  repo: 'wesleyzjones1/Sorting-Algorithm-Visualizer',

  links: [
    { label: 'Live demo', url: 'https://wesleyzjones1.github.io/Sorting-Algorithm-Visualizer-/', primary: true },
    { label: 'Source', url: 'https://github.com/wesleyzjones1/Sorting-Algorithm-Visualizer' },
  ],
  embed: true,

  highlights: [
    'Adjustable array size and speed, from slow step-through to instant.',
    'Colour-coded bars highlight the elements being compared and swapped.',
    'Each algorithm shows its best, average and worst-case complexity alongside the animation.',
    'Second-generation interface after a full redesign of the original version.',
  ],
}
