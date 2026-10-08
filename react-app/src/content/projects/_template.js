/**
 * _template.js — copy this file to add a project.
 *
 *   1. Copy to  src/content/projects/<slug>.js
 *   2. Fill in the fields below (delete any you do not need).
 *   3. Import it in  src/content/projects/index.js  and add it to the list.
 *   4. Optional: drop a 1280×800 cover image in  public/projects/<slug>.webp
 *
 * Only `slug`, `title`, `tagline` and `summary` are required.
 * See docs/ADDING_A_PROJECT.md at the repo root for the full guide.
 */

export default {
  slug: 'my-project',                 // URL: /projects/my-project
  title: 'My Project',
  tagline: 'One line that says what it is.',
  summary: 'Two or three sentences for the card. What it does, why it exists, what is interesting about it.',

  status: 'live',                     // 'live' | 'coming-soon' | 'in-progress' | 'archived'
  featured: false,                    // true = shown on the home page
  year: '2026',
  role: 'Sole developer',
  category: 'Web app',                // used for the filter chips on /projects

  tech: ['React', 'Vite'],            // stack chips
  cover: 'projects/my-project.webp',  // optional; path inside /public
  // mark: MyAnim,                    // optional 26px animated mark, see components/animations
  repo: 'wesleyzjones1/my-project',   // optional; pulls "last updated" from GitHub

  links: [
    { label: 'Live demo', url: 'https://example.com', primary: true },
    { label: 'Source', url: 'https://github.com/wesleyzjones1/my-project' },
  ],
  embed: false,                       // true = show the primary link inside an iframe on the detail page
  // embedEyebrow: 'The site',        // optional; defaults to 'Try it'
  // embedTitle: 'example.com',       // optional; defaults to 'Live demo'

  metrics: [                          // optional, up to four
    { value: '10', label: 'algorithms' },
  ],
  highlights: [                       // optional bullet list on the detail page
    'Something concrete and measurable.',
  ],
  sections: [                         // optional case-study sections
    { heading: 'Overview', body: ['Paragraph one.', 'Paragraph two.'] },
    { heading: 'What I learned', bullets: ['Bullet one.', 'Bullet two.'] },
  ],
  comparisonsNote: 'Optional one-line note shown under the "Before and after" heading.',
  comparisons: [                      // optional before/after image pairs (paths inside /public)
    { title: 'Settings page', caption: 'Optional', before: 'projects/my-project/settings_old.webp', after: 'projects/my-project/settings_new.webp' },
  ],
  gallery: [                          // optional captioned screenshots
    { src: 'projects/my-project/search.webp', caption: 'The search window.', alt: 'Optional alt text' },
  ],
}
