export default {
  slug: 'datetrails',
  title: 'DateTrails',
  tagline: 'Date night, mapped out.',
  summary:
    'An app for planning dates as multi-stop itineraries, mapped from start to finish. Each date is a trail of chapters (dinner somewhere warm, a walk, dessert) that you can browse near you, build yourself, and then follow one stop at a time. Designed and built solo with Flutter and Supabase, launching on iPhone and Android.',

  status: 'coming-soon',
  hero: true,
  year: '2025 – 2026',
  role: 'Founder, designer and sole engineer',
  category: 'Mobile',

  tech: ['Flutter', 'Dart', 'Riverpod', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Google Maps', 'RevenueCat', 'AdMob', 'Sentry', 'Cloudflare Pages', 'GitHub Actions'],
  logo: 'projects/datetrails-mark.svg',
  /** The DateTrails header banner (from public/dateTrails_header.png), at its own wide shape. */
  cover: 'projects/datetrails/cover.webp',
  coverFit: 'natural',
  coverSize: [2080, 892],
  coverSrcSet: [['projects/datetrails/cover-1040.webp', 1040], ['projects/datetrails/cover.webp', 2080]],
  /** The home-page feature card: the same banner across the top, and the app icon beside the title. */
  featurePhoto: {
    srcSet: [['projects/datetrails/cover-1040.webp', 1040], ['projects/datetrails/cover.webp', 2080]],
    width: 2080,
    height: 892,
    alt: 'DateTrails: Date night, mapped out. Three phones showing the map of Los Angeles, the dates feed and a date in Old Pasadena.',
  },
  appIcon: 'projects/datetrails/app-icon.webp',
  // The screenshots below come from datetrails.com.
  /** The app-store screenshots, in the order the app is used. */
  screensStyle: 'store',
  screens: [
    { src: 'projects/datetrails/store-01.webp', kicker: 'Discover', caption: 'The Dates feed, with Kayaks in Marina del Rey on top.', alt: 'Date night, mapped out. The Dates feed, with Kayaks in Marina del Rey on top.' },
    { src: 'projects/datetrails/store-02.webp', kicker: 'Discover', caption: 'The map tab: every pin is a whole night out.', alt: 'Dates all around you. The map tab, every pin a whole night out.' },
    { src: 'projects/datetrails/store-03.webp', kicker: 'Discover', caption: 'A date’s page: time, cost, distance and when to go.', alt: 'Every detail, up front. A date’s page: time, cost, distance and when to go.' },
    { src: 'projects/datetrails/store-04.webp', kicker: 'Go', caption: 'The journey: dinner, a show, a walk home.', alt: 'One chapter at a time. The journey: dinner, a show, a walk home.' },
    { src: 'projects/datetrails/store-05.webp', kicker: 'Go', caption: 'On the date, with directions to every chapter in order.', alt: 'Go, step by step. On the date, with directions to every chapter in order.' },
    { src: 'projects/datetrails/store-06.webp', kicker: 'Remember', caption: 'Rate it and tell the next couple what worked.', alt: 'How was the date? Rate it and tell the next couple what worked.' },
    { src: 'projects/datetrails/store-07.webp', kicker: 'Remember', caption: 'Your profile’s lived dates, photos and favorites.', alt: 'Save a memory of each date. Your profile’s lived dates, photos and favorites.' },
    { src: 'projects/datetrails/store-08.webp', kicker: 'Create', caption: 'The Create Date screen, chapter by chapter.', alt: 'Craft your own date. The Create Date screen.' },
    { src: 'projects/datetrails/store-09.webp', kicker: 'Premium', caption: 'Filters by vibe, price, length and rating.', alt: 'Find your kind of date. Premium filters by vibe, price, length and rating.' },
    { src: 'projects/datetrails/store-10.webp', kicker: 'Streaks', caption: 'Pick a streak and get a gentle nudge.', alt: 'Keep the spark alive. Pick a streak and get a gentle nudge.' },
  ],
  repo: null, // private repository

  links: [
    { label: 'datetrails.com', url: 'https://datetrails.com/', primary: true },
  ],
  embed: true,
  embedPosition: 'end', // a marketing site, not a demo, so it follows the write-up
  embedEyebrow: 'The site',
  embedTitle: 'datetrails.com',
  storeBadges: true,

  metrics: [
    { value: '90k+', label: 'lines of Dart' },
    { value: '5,600+', label: 'automated tests' },
    { value: '20', label: 'screens' },
    { value: '10', label: 'edge functions' },
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
        'Great dates aren’t one place. They’re a sequence: dinner somewhere warm, a walk to shake it off, dessert to stretch the night out. DateTrails pins the whole evening to the map before you leave the house. Each chapter is a real place, a note on what to do there, and how long to stay. A night in Old Pasadena, for example:',
      ],
      bullets: [
        'Dinner in the Alleys (1 h 30 m): something quick and good between the brick buildings.',
        'The Play (2 h 20 m): a courtyard theatre and two hours in someone else’s story.',
        'Walk the Bridge (30 m): the arches lit up over the arroyo, ten minutes away.',
      ],
    },
    {
      heading: 'Not a dating app',
      body: [
        'There is no swiping, matching or messaging strangers. DateTrails is for planning the date itself: people browse the plans creators publish, then go on them with whoever they like. It is for adults 18 and over.',
      ],
    },
    {
      heading: 'How it works',
      bullets: [
        'Discover: every date near you on one map or in the feed. Each pin is a whole plan someone has already worked out, color-coded by the kind of night, showing how long it takes and how far away it starts. Search for what you feel like, or type @ to find a creator.',
        'Plan: build your own the way you’d tell a friend about it. Search for real venues, drop each chapter where it belongs, add up to ten photos, and leave tips like “book the play first, dinner two hours before curtain”.',
        'Go: tap Start Date and the plan becomes a guide, one chapter at a time, with the map for that stop, directions or the address a tap away, and a progress bar for the night.',
        'Remember: add a memory photo and rate the date out of five hearts, so the good ones rise for everyone. Memories fill the Lived tab on your profile, or stay private with one switch, and a streak keeps a date every week or fortnight.',
      ],
    },
    {
      heading: 'Free, with an optional Premium',
      body: [
        'Saving, creating and going on dates are unlimited for everyone. The free tier shows ads, searches the full 100-mile radius, and lets your first three dates skip the ad gate entirely. Premium, at $2.99 a month or $29.99 a year with a 14-day free trial, removes the ads and adds advanced filters (category, price, chapters, duration, activity level, rating and time of day) plus sorting by newest, top rated, most popular, price or length.',
      ],
    },
    {
      heading: 'Privacy',
      body: [
        'Location is only used live, to show dates near you. It is never stored, and you can browse without granting access. Data is never sold and is shared only with the services that run the app. An account can be deleted in the app (Settings, Account, Delete account) or from the website.',
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
        'Backend: Supabase Postgres with row-level security, SQL RPC functions for the feed and aggregates, and edge functions for account deletion and export, the RevenueCat webhook, content checks, moderation, and push and support notifications.',
        'Maps: Google Maps with custom-rendered markers, zoom-based clustering, and rank-ordered pin stacking so the top pin in a pile is the best-rated date.',
        'Monetization and telemetry: RevenueCat subscriptions, AdMob banners for free users, Sentry crash reporting, OneSignal push.',
        'Web: a static landing and legal site plus a Cloudflare Pages Function that server-renders share-link previews from Supabase.',
      ],
    },
    {
      heading: 'Quality and delivery',
      body: [
        'Every push runs static analysis, the full test suite with a coverage floor, and the database security harness. The suite is roughly 5,600 test cases across about 400 files, including integration tests. Releases go out through the same pipeline that builds the signed Android bundle.',
      ],
    },
    {
      heading: 'Status',
      body: [
        'DateTrails is launching on iPhone and Android: free to use, with an optional Premium subscription, for adults 18 and over. datetrails.com has the product tour, FAQ, privacy policy, terms, and the contact and account-deletion pages. The repository is private while it is being released; I am happy to walk through the code and architecture in an interview.',
      ],
    },
  ],
}
