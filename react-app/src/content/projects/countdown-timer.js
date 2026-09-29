import ClockAnim from '../../components/animations/ClockAnim'

export default {
  slug: 'countdown-timer',
  title: 'Countdown Timer Widget',
  tagline: 'A frameless, always-on-top desktop timer built with React and Electron.',
  summary:
    'A minimal desktop countdown widget. Set minutes and seconds, click to start, and watch an animated progress ring shift from green to red as time runs out. Frameless, draggable, glassmorphic, and packaged as a Windows executable with no console window.',

  status: 'live',
  featured: false,
  year: '2025',
  role: 'Sole developer',
  category: 'Desktop',

  tech: ['React', 'Electron', 'Vite', 'SVG'],
  mark: ClockAnim,
  repo: 'wesleyzjones1/Countdown-Timer',

  links: [
    { label: 'Source', url: 'https://github.com/wesleyzjones1/Countdown-Timer', primary: true },
  ],

  highlights: [
    'Three-phase state machine UI: setup, running, finished, with hover-to-restart.',
    'Electron main process and a preload IPC bridge for window controls and drag regions.',
    'Snaps to any screen corner and stays above other windows.',
    'Packaged with a one-command Windows build.',
  ],
}
