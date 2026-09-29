export default {
  slug: 'datetrails',
  title: 'DateTrails',
  tagline: 'A mobile app for discovering, planning and sharing multi-stop dates.',
  summary:
    'A Flutter and Supabase social app where people build date itineraries (dinner, a walk, dessert) on a map, publish them to a feed, and go on them stop by stop. Designed, built and shipped end to end by me: client, backend, payments, moderation, CI and store release.',

  status: 'coming-soon',
  featured: true,
  hero: true,
  year: '2025 – 2026',
  role: 'Founder, designer and sole engineer',
  category: 'Mobile',

  tech: ['Flutter', 'Dart', 'Riverpod', 'Supabase', 'PostgreSQL', 'Edge Functions', 'Google Maps', 'RevenueCat', 'AdMob', 'Sentry', 'Cloudflare Pages', 'GitHub Actions'],
  logo: 'projects/datetrails-mark.svg',
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
    'Server-side paginated feed RPC with full-text search, category and rating filters, blocked-creator exclusion and haversine nearest-first sorting.',
    'Map clustering computed in Web Mercator pixel space so a tap on a cluster is guaranteed to split it, plus collision-aware pin label layout.',
    'Row-level security on every table, verified by a dedicated RLS and RPC test harness that runs in CI.',
    'Freemium tier driven by RevenueCat webhooks into Postgres, with ad slots and premium gating resolved from a single entitlement provider.',
    'Share links rendered server-side by a Cloudflare Pages Function so a date looks right in iMessage, Slack and social previews.',
    'Moderation pipeline: reporting, blocking, automated content checks in edge functions, and account export and deletion for privacy compliance.',
  ],

  sections: [
    {
      heading: 'The problem',
      body: [
        'Planning a good date is a logistics problem disguised as a romantic one. Most apps stop at "find a restaurant". DateTrails treats the whole evening as the unit: a sequence of stops on a map, with timing, cost and a story, that someone else can pick up and reuse.',
        'The product is a dating-oriented social app (18+) with profiles, a published feed, ratings, follows, streaks, moderation and a freemium subscription tier.',
      ],
    },
    {
      heading: 'My role',
      body: [
        'Everything. Product definition, UX and visual design, the Flutter client, the Postgres schema and security model, the Supabase edge functions, payments and ads integration, the marketing site, the CI pipeline and the App Store and Google Play release process.',
        'Working alone on something this size forced discipline: written architecture docs, a feature map that maps every feature to its files, and a pre-launch security audit I ran against my own code.',
      ],
    },
    {
      heading: 'Architecture',
      bullets: [
        'Client: Flutter with Riverpod for state, imperative navigation, a WCAG-checked light and dark design system, and a local draft store so a half-written date survives an app restart.',
        'Backend: Supabase Postgres with row-level security, SQL RPC functions for the feed and aggregates, and seven edge functions (account deletion and export, RevenueCat webhook, content checks, moderation, push and support notifications).',
        'Maps: Google Maps with custom-rendered markers, zoom-based clustering, and rank-ordered pin stacking so the top pin in a pile is the best-rated date.',
        'Monetization and telemetry: RevenueCat subscriptions, AdMob banner slots for free users, Sentry crash reporting, OneSignal push.',
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
        'DateTrails is in final pre-release testing and will be available on iOS and Android shortly. The repository is private while it is being released; I am happy to walk through the code and architecture in an interview.',
      ],
    },
  ],
}
