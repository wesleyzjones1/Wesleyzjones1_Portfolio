/**
 * profile.js — everything about *you* lives here.
 *
 * Edit this file to change the hero, about page, experience, education,
 * certifications, skills and interests. No component code needs to change.
 */

export const profile = {
  name: 'Wesley Jones',
  firstName: 'Wesley',
  role: 'Software Engineer',
  company: 'Universal Switching Corporation',
  location: 'Thousand Oaks, CA',
  email: 'wesleyzjones1@gmail.com',
  links: {
    github: 'https://github.com/wesleyzjones1',
    linkedin: 'https://www.linkedin.com/in/wesleyzjones1',
  },
  /** File in /public. Replace the PDF there when your resume changes. */
  resumeFile: 'Wesley_Jones_Resume.pdf',

  /* ── Hero ─────────────────────────────────────────────────────────── */
  headline: 'I build software that ships, from firmware to the app store.',
  intro:
    'Software engineer with a Bachelor of Science in Software Engineering and a track record that runs from embedded firmware and network systems to full-stack web and mobile products. Currently at Universal Switching, where I lead software delivery on hardware switching platforms, and about to launch DateTrails, a mobile app I designed, built and shipped end to end.',
  availability: 'Open to software engineering and technical leadership roles',

  /** Short, verifiable facts for the hero strip. */
  facts: [
    { value: '50+', label: 'Firmware releases shipped' },
    { value: '12+', label: 'Projects led, team of five' },
    { value: '5', label: 'Industry certifications' },
    { value: 'B.S.', label: 'Software Engineering' },
  ],

  /* ── How I work ───────────────────────────────────────────────────── */
  strengths: [
    {
      title: 'Own the whole problem',
      body: 'I have shipped work at every layer: firmware on switching hardware, the web control interface on top of it, a Postgres backend with row-level security, and a Flutter client in the app stores. I am comfortable being the person who has to make the whole thing work.',
    },
    {
      title: 'Reliability is a feature',
      body: 'At Universal Switching I raised software update reliability by 70% across the product line. DateTrails ships behind a CI gate with static analysis, a coverage floor, and a security harness that tests every database policy.',
    },
    {
      title: 'Lead through clarity',
      body: 'I have directed a team of five engineers across a dozen projects and handled the hardest customer escalations myself. Clear written specs, honest status, and small reviewable changes are how I keep teams moving.',
    },
  ],

  /* ── About page ───────────────────────────────────────────────────── */
  about: [
    'I came to software through building physical things. I spent close to a decade in architecture and construction, drafting plans in Revit and AutoCAD, managing residential builds, and later designing production processes for a tiny-home builder, where the automation I introduced sped up production by 30%.',
    'That background shaped how I write software. I care about specifications that a stranger can follow, systems that fail loudly instead of silently, and finishing the last 10% that turns a prototype into a product. I finished my Bachelor of Science in Software Engineering at Western Governors University in 2024 while working full time, and moved into an engineering role at Universal Switching the same year.',
    'Today I split my time between embedded and web work on switching platforms at Universal Switching and DateTrails, a Flutter and Supabase social app for planning multi-stop dates. DateTrails is the largest thing I have built: product, design, client, backend, payments, moderation, CI and store release, all mine.',
  ],

  /* ── Beyond the code ───────────────────────────────────────────────
   * These are the things that tell a recruiter who you are, not just what
   * you have done. Rewrite freely; keep each to two or three sentences.
   */
  interests: [
    {
      title: 'Building with my hands',
      body: 'Ten years around job sites and drafting tables left me with a workshop habit. I still design and build furniture and small structures, and I plan them the way I plan software: measure, draw, then cut.',
      icon: 'hammer',
    },
    {
      title: 'Maps and places',
      body: 'I am fascinated by how places connect. That interest shows up in the interactive world map I built against the World Bank API and in DateTrails, which is at heart a map of good evenings out.',
      icon: 'map',
    },
    {
      title: 'Games as systems',
      body: 'Factorio is my favourite kind of game: a logistics problem that never stops growing. I wrote a tool that turns any image into an importable blueprint of belts, pipes or concrete, because decorating a factory by hand was too slow and, honestly, too fun to leave alone.',
      icon: 'gear',
    },
    {
      title: 'Making algorithms visible',
      body: 'I learn best when I can see a system move. Several of my side projects exist so that pathfinding, sorting and polynomial behaviour can be watched instead of just read about.',
      icon: 'eye',
    },
  ],

  /* ── Experience ───────────────────────────────────────────────────── */
  experience: [
    {
      role: 'Software Engineer',
      company: 'Universal Switching Corporation',
      location: 'Burbank, CA',
      start: 'Sep 2024',
      end: 'Present',
      summary: 'Embedded firmware, web control interfaces and technical leadership for RF and video switching platforms.',
      bullets: [
        'Developed and deployed 50+ custom embedded firmware solutions across multiple switching platforms, improving performance and stability and raising software update reliability by 70%.',
        'Directed 12+ projects and coordinated a team of five engineers, owning delivery timelines, technical accuracy and alignment with company objectives.',
        'Overhauled the system’s web-based control interface and shipped numerous new features, with a focus on usability and client-oriented solutions.',
        'Lead technical support for software-related cases, working directly with clients to diagnose and resolve complex hardware and firmware issues.',
        'Partnered with cross-functional teams to isolate and resolve critical hardware and software issues, improving product reliability and quality.',
      ],
      tags: ['C / C++', 'Embedded firmware', 'Web UI', 'Team lead'],
    },
    {
      role: 'Field Technician',
      company: 'Insane Impact',
      location: 'Remote / nationwide travel',
      start: 'Jul 2022',
      end: 'Sep 2024',
      summary: 'Network diagnostics and large-format LED installations across the country.',
      bullets: [
        'Diagnosed and resolved complex network issues, improving performance and reliability at customer sites.',
        'Travelled nationwide to install and configure operating systems and led the programming of complex LED installations.',
        'Delivered project milestones ahead of schedule under tight, high-pressure timelines.',
      ],
      tags: ['Networking', 'Field engineering', 'LED systems'],
    },
    {
      role: 'Process Developer',
      company: 'Piccola Homes',
      location: 'Simi Valley, CA',
      start: 'Feb 2023',
      end: 'Aug 2023',
      summary: 'Production process design and automation for a tiny-home builder.',
      bullets: [
        'Implemented automation that increased production speed by 30% and streamlined construction workflows.',
        'Wrote comprehensive build instructions that made future builds repeatable.',
        'Introduced methods that raised build quality and adherence to industry best practices.',
      ],
      tags: ['Process automation', 'Documentation'],
    },
    {
      role: 'Construction Technician',
      company: 'Davis and Sons Construction',
      location: 'Simi Valley, CA',
      start: 'Jan 2016',
      end: 'Jul 2022',
      summary: 'Residential construction planning, inspection and project management.',
      bullets: [
        'Produced detailed construction plans for residential homes and ADUs in Revit.',
        'Conducted site inspections against design specifications and safety standards.',
        'Managed project timelines and budgets to on-time, on-budget completion.',
      ],
      tags: ['Revit', 'Project management'],
    },
    {
      role: 'Drafting Technician',
      company: 'Todd B. Spiegel Architects',
      location: 'Thousand Oaks, CA',
      start: 'Jul 2014',
      end: 'Jul 2017',
      summary: 'Architectural drafting in Revit and AutoCAD.',
      bullets: [
        'Created and maintained a master library of construction drawings.',
        'Improved the readability and usability of architectural drawings through systematic cleanup and planning.',
      ],
      tags: ['Revit', 'AutoCAD'],
    },
  ],

  /* ── Education & certifications ───────────────────────────────────── */
  education: [
    {
      degree: 'Bachelor of Science, Software Engineering',
      school: 'Western Governors University',
      location: 'Salt Lake City, UT',
      year: '2024',
      details: 'Coursework in mobile application development (Android), advanced Java, advanced data management, front-end and back-end development, JavaScript and version control.',
    },
  ],
  certifications: [
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services' },
    { name: 'CompTIA Security+', issuer: 'CompTIA' },
    { name: 'CompTIA Network+', issuer: 'CompTIA' },
    { name: 'CompTIA A+', issuer: 'CompTIA' },
    { name: 'ITIL 4 Foundation', issuer: 'Axelos' },
  ],

  /* ── Skills ───────────────────────────────────────────────────────── */
  skills: [
    { group: 'Languages', items: ['JavaScript', 'Dart', 'Java', 'Python', 'C', 'C++', 'SQL', 'HTML & CSS'] },
    { group: 'Frameworks', items: ['React', 'Flutter', 'Spring Boot', 'Angular', 'Electron', 'Node.js'] },
    { group: 'Platforms & data', items: ['Supabase', 'PostgreSQL', 'AWS', 'Docker', 'Cloudflare Pages', 'MySQL'] },
    { group: 'Embedded & systems', items: ['Embedded firmware', 'IAR Embedded Workbench', 'Networking', 'Hardware diagnostics'] },
    { group: 'Practices', items: ['CI/CD with GitHub Actions', 'Automated testing', 'Code review', 'Technical leadership', 'Customer escalation'] },
  ],
}
