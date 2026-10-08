export default {
  slug: 'utilityhub',
  title: 'UtilityHub',
  tagline: '55 browser-based tools for text, math, colour, images, code and time, in one installable site.',
  summary:
    'A React single-page app that collects 55 everyday utilities (formatters, converters, calculators, image tools, a regex tester, a video-to-GIF converter) behind one search box. Everything runs client-side, the site installs as a progressive web app and works offline, and the interface is translated into six languages.',

  status: 'live',
  featured: true,
  year: '2026',
  role: 'Sole developer',
  category: 'Web app',

  tech: ['React', 'JavaScript', 'Vite', 'React Router', 'Vitest', 'Testing Library', 'PWA', 'GitHub Actions'],
  cover: 'projects/utilityhub.webp',
  repo: 'wesleyzjones1/UtilityHub',

  links: [
    { label: 'Live demo', url: 'https://wesleyzjones1.github.io/UtilityHub/', primary: true },
    { label: 'Source', url: 'https://github.com/wesleyzjones1/UtilityHub' },
  ],
  embed: true,

  metrics: [
    { value: '55', label: 'tools' },
    { value: '6', label: 'languages' },
    { value: '104', label: 'test files' },
  ],

  highlights: [
    'One registry file is the single source of truth: add an entry and a component, and the tool gets a route, a category listing, search keywords and a place in the command palette.',
    'Shared page templates (single panel, dual panel, image drop, image to text) so a new tool is mostly its transform function.',
    'Search, a command palette and favourites, with a hash router so deep links survive a refresh on GitHub Pages.',
    'Every tool, template and utility has a Vitest and Testing Library test beside it: 104 test files in the repository.',
    'Installable as a PWA with a service worker; even the heavy tools (video to GIF, background removal) run entirely in the browser.',
  ],

  sections: [
    {
      heading: 'Engineering notes',
      bullets: [
        'Tools are grouped into six categories (text, web and code, math, image, time, colour); the registry keeps them alphabetical within a category so the listing never needs hand-sorting.',
        'Translations live in one file and are tested, so a missing key fails the suite instead of showing up as English on the Japanese site.',
        'Deployed by GitHub Actions on every push to main with a relative base path, so the same build runs from any subdirectory.',
      ],
    },
  ],
}
