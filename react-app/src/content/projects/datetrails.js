export default {
  slug: 'datetrails',
  title: 'DateTrails',
  tagline: 'Plan the whole date, chapter by chapter.',
  summary:
    'A mobile app for building multi-stop date itineraries on a map. Think of an adventure book, but for a specific place: each date is a trail of chapters (dinner, a walk, dessert) that other people can rate and go on. Designed, built and shipped solo with Flutter and Supabase.',

  status: 'coming-soon',
  featured: true,
  hero: true,
  year: '2025 – 2026',
  role: 'Founder, designer and sole engineer',
  category: 'Mobile',

  tech: ['Flutter', 'Dart', 'Riverpod', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Google Maps', 'RevenueCat', 'AdMob', 'Sentry', 'Cloudflare Pages', 'GitHub Actions'],
  logo: 'projects/datetrails-mark.svg',
  cover: 'projects/datetrails/feature-graphic.webp',
  coverFit: 'contain',
  coverBg: '#fdece6',
  /** Two phone screens for the home-page feature card: [back, front]. */
  featureImages: ['projects/datetrails/journey.webp', 'projects/datetrails/feed.webp'],
  /** Phone screens for the case study, in the order the app is used. */
  gallery: [
    { src: 'projects/datetrails/map.webp', kicker: 'Discover', caption: 'Every date near you on a map, pinned by the kind of evening it is.' },
    { src: 'projects/datetrails/feed.webp', kicker: 'Discover', caption: 'A feed of published dates with ratings, stops, hours, price and distance.' },
    { src: 'projects/datetrails/detail.webp', kicker: 'Plan', caption: 'The details at a glance, then the route.' },
    { src: 'projects/datetrails/journey.webp', kicker: 'Plan', caption: 'The journey: each chapter with its timing, and a tip to plan ahead.' },
    { src: 'projects/datetrails/on-date.webp', kicker: 'Go', caption: 'On the date, one chapter at a time, with the map, directions and tips.' },
    { src: 'projects/datetrails/review.webp', kicker: 'Remember', caption: 'Rate the date and keep a memory photo.' },
  ],
  repo: null, // private repository

  links: [
    { label: 'datetrails.com', url: 'https://datetrails.com', primary: true },
  ],
  storeBadges: true,

  metrics: [
    { value: '85k+', label: 'lines of Dart' },
    { value: '4,800+', label: 'automated tests' },
    { value: '20', label: 'screens' },
    { value: '7', label: 'edge functions' },
  ],

  highlights: [
    'Server-side paginated feed with full-text search, category and rating filters, blocked-creator exclusion and nearest-first sorting.',
    'Map clustering computed in Web Mercator pixel space so a tap on a cluster is guaranteed to split it, plus collision-aware pin labels.',
    'Row-level security on every table, verified by a dedicated security test harness that runs in CI.',
    'Freemium tier driven by RevenueCat webhooks into Postgres; ad slots and premium gating resolved from a single entitlement provider.',
    'Share links rendered server-side by a Cloudflare Pages Function so a date looks right in iMessage, Slack and social previews.',
    'Moderation pipeline: reporting, blocking, automated content checks in edge functions, and account export and deletion.',
  ],

  sections: [
    {
      heading: 'A date is a trail',
      body: [
        'Great dates are not one place. They are a sequence: somewhere to eat, somewhere to walk, somewhere to end up. Most apps stop at “find a restaurant”. DateTrails treats the whole evening as the unit: a trail of chapters on a map, with timing, cost and a story, that someone else can pick up and go on.',
        'It is a dating-oriented social app (18+) with profiles, a published feed, ratings, follows, streaks, moderation and a free tier with an optional premium subscription.',
      ],
    },
    {
      heading: 'Why I built it',
      body: [
        'Two years ago I wrote a mission statement for my life. One line in it says I want to create products that bring people closer together. DateTrails is the most direct thing I have built toward that line: it exists so two people spend a better evening together.',
      ],
    },
    {
      heading: 'My role',
      body: [
        'Everything. Product definition, UX and visual design, the Flutter client, the Postgres schema and security model, the Supabase edge functions, payments and ads, the marketing site, the CI pipeline, and the App Store and Google Play release process.',
        'Working alone on something this size forced discipline: written architecture docs, a feature map that ties every feature to its files, and a pre-launch security audit I ran against my own code.',
      ],
    },
    {
      heading: 'Architecture',
      bullets: [
        'Client: Flutter with Riverpod for state, a WCAG-checked light and dark design system, and a local draft store so a half-written date survives an app restart.',
        'Backend: Supabase Postgres with row-level security, SQL RPC functions for the feed and aggregates, and seven edge functions (account deletion and export, RevenueCat webhook, content checks, moderation, push and support notifications).',
        'Maps: Google Maps with custom-rendered markers, zoom-based clustering, and rank-ordered pin stacking so the top pin in a pile is the best-rated date.',
        'Monetization and telemetry: RevenueCat subscriptions, AdMob banners for free users, Sentry crash reporting, OneSignal push.',
        'Web: a static landing and legal site plus a Cloudflare Pages Function that server-renders share-link previews from Supabase.',
      ],
    },
    {
      heading: 'Quality and delivery',
      body: [
        'Every push runs static analysis, the full test suite with a coverage floor, and the database security harness. The suite is roughly 4,800 test cases across about 430 files, including integration tests. Releases go out through the same pipeline that builds the signed Android bundle.',
      ],
    },
    {
      heading: 'Status',
      body: [
        'DateTrails is in final pre-release testing and will be free to use on iOS and Android shortly. The repository is private while it is being released; I am happy to walk through the code and architecture in an interview.',
      ],
    },
  ],
}
