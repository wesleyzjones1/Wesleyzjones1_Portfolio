import ClockAnim from '../../components/animations/ClockAnim'

export default {
  slug: 'countdown-timer',
  title: 'Countdown Timer Widget',
  tagline: 'A frameless, always-on-top desktop timer built with React and Electron.',
  summary:
    'A minimal desktop countdown widget. Set minutes and seconds, click to start, and watch an animated progress ring shift from green to red as time runs out. Frameless, draggable, glassmorphic, and packaged as a Windows executable with no console window.',

  status: 'live',
  featured: false,
  year: '2026',
  role: 'Sole developer',
  category: 'Desktop',

  tech: ['React', 'Electron', 'Vite', 'SVG'],
  cover: 'projects/countdown-timer.webp',
  mark: ClockAnim,
  repo: 'wesleyzjones1/Countdown-Timer',

  links: [
    { label: 'Web demo', url: 'https://wesleyzjones1.github.io/Countdown-Timer/', primary: true },
    { label: 'Source', url: 'https://github.com/wesleyzjones1/Countdown-Timer' },
  ],
  embed: true,

  highlights: [
    'Three-phase state machine UI: setup, running, finished, with hover-to-restart.',
    'Electron main process and a preload IPC bridge for window controls and drag regions.',
    'Snaps to any screen corner and stays above other windows.',
    'Packaged with a one-command Windows build.',
  ],
}
