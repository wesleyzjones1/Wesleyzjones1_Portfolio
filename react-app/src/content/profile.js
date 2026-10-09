/**
 * profile.js — everything about *you* lives here.
 *
 * Edit this file to change the hero, the case for hiring you, the trail,
 * the about page, education, certifications, skills, interests and beliefs.
 * No component code needs to change.
 */

export const profile = {
  name: 'Wesley Jones',
  firstName: 'Wesley',
  role: 'Software Engineer',
  company: 'Universal Switching',
  location: 'Thousand Oaks, CA',
  email: 'wesleyzjones1@gmail.com',
  links: {
    github: 'https://github.com/WesleyZJones1',
    linkedin: 'https://www.linkedin.com/in/wesleyzjones1',
  },
  /** File in /public. Replace the PDF there when your resume changes. */
  resumeFile: 'Wesley_Jones_Resume.pdf',
  /** Portrait in /public, 4:5. Both a .jpg and a .webp with this base name. */
  portrait: 'profile-800',

  /* ── Hero ─────────────────────────────────────────────────────────── */
  headline: 'I build software that ships,',
  headlineAccent: 'from firmware on the bench to apps in the store.',
  intro:
    "I'm Wesley. I'm a software engineer at Universal Switching, where I own the firmware and the embedded web interface on a line of RF and video switching systems, coordinate a team of five engineers, and take the hardest customer escalations myself. On my own time I built DateTrails, a Flutter and Supabase app launching soon on iOS and Android, and TradeLab, a trading research system with 900+ tests. I like problems that cross hardware and software, I automate anything I have to do twice, and I'm good at getting a room to agree on what the problem actually is.",
  availability: 'Open to senior software engineering and technical leadership roles',

  /** Short list shown under the hero intro. Keep to three. */
  now: [
    'Launching DateTrails on iOS and Android',
    'Running TradeLab in paper mode, once a trading day',
    'Learning guitar',
  ],

  /** Short, true, memorable. The numbers a recruiter will repeat. */
  facts: [
    { value: '50+', label: 'Firmware releases shipped' },
    { value: '70%', label: 'Better update reliability' },
    { value: '5,700+', label: 'Automated tests across my projects' },
    { value: '5', label: 'Engineers coordinated, 12+ projects' },
  ],

  /* ── What I'm looking for ─────────────────────────────────────────── */
  lookingFor: {
    title: "What I'm looking for",
    body: 'A senior software engineer or technical lead role on a team that ships real products: embedded or full-stack, mobile or web. Remote or hybrid from Thousand Oaks, California. If you want proof before a full hire, give me a two-week project.',
  },

  /* ── The case for hiring me ───────────────────────────────────────
   * Each claim comes with a place to check it. Keep every line true.
   */
  brief: {
    eyebrow: 'The case for hiring me',
    title: 'What you get, and where to check it.',
    intro: "You should not have to guess what a candidate can do. Here is what I do well, with the proof one click away.",
    items: [
      {
        title: 'I ship whole products',
        body: 'DateTrails is product, design, Flutter client, Postgres schema with row-level security, edge functions, payments, moderation, CI and store release, all mine. 85k lines of Dart behind 4,800 automated tests.',
        proof: 'DateTrails case study',
        link: '/projects/datetrails',
      },
      {
        title: 'I make hardware reliable',
        body: '50+ firmware releases across Universal Switching platforms, raising update reliability by 70%, and a ground-up redesign of the control interface each unit serves from its own controller.',
        proof: 'Universal Switching write-up',
        link: '/projects/universal-switching',
      },
      {
        title: 'I lead, and I keep customers',
        body: 'I coordinate five engineers across 12+ projects and take the hardest support cases myself, walking customers through problems step by step. Orders that were about to be cancelled were not.',
        proof: 'How I work and lead',
        link: '/about',
      },
      {
        title: 'I automate the busywork',
        body: 'EfficiencyOverload turned a dozen-step drawing and firmware-release workflow into re-runnable buttons, backed by ten FastCAD plug-ins in C++. SageQuest is the search tool colleagues run every day. This site deploys itself.',
        proof: 'The automation suite',
        link: '/projects/universal-switching',
      },
      {
        title: 'I test like it matters',
        body: 'TradeLab runs 900+ hermetic tests, strict typing and golden decision traces so a refactor cannot quietly move a trade. UtilityHub has a test beside every one of its 55 tools. I would rather find it in CI than in production.',
        proof: 'TradeLab',
        link: '/projects/tradelab',
      },
      {
        title: 'I see both sides of the problem',
        body: 'PCB design, RF test plans, soldering and diagnosing shorts on one side; React, Flutter, Postgres and CI on the other. When the bug lives in the gap between hardware and software, I am the one who finds it.',
        proof: 'Skills',
        link: '/about#skills',
      },
    ],
  },

  /* ── The trail so far ─────────────────────────────────────────────
   * Shown as a trail of waypoints on the home page (compact) and the
   * about page (full). Order is chronological. `highlight` marks the
   * current destination.
   */
  journey: [
    {
      year: '2012',
      title: 'Started working at twelve',
      org: 'Construction, drafting, process design',
      body: 'Ten years on job sites, then Revit drafting at an architecture firm and process design at a tiny-home builder, where my templates sped production up by 30%. It taught me to work hard, document everything, and build the template instead of repeating the task.',
    },
    {
      year: '2022',
      title: 'Networking and LED systems',
      org: 'Insane Impact, nationwide',
      body: 'Installed, wired and networked large LED screens for schools across the country and managed the electricians and contractors around them. Systematic troubleshooting: isolate one step at a time until the cause is found.',
    },
    {
      year: '2024',
      title: 'B.S. Software Engineering',
      org: 'Western Governors University',
      body: 'Finished while working full time, alongside CompTIA A+, Network+ and Security+, ITIL 4 Foundation and AWS Cloud Practitioner.',
    },
    {
      year: '2024',
      title: 'Software Engineer',
      org: 'Universal Switching',
      body: 'Firmware and the embedded web interface on RF and video switching systems, RF test plans and PCB design, lead customer support, and a team of five engineers to coordinate across 12+ projects.',
      link: '/projects/universal-switching',
    },
    {
      year: '2025',
      title: 'The automation suite',
      org: 'Universal Switching',
      body: 'EfficiencyOverload, SageQuest and the FastCAD Component Reviewer: about 30,000 lines of Python and ten C++ plug-ins that took the repetition out of how the engineering team produces drawings and releases firmware.',
      link: '/projects/universal-switching',
    },
    {
      year: '2026',
      title: 'TradeLab and UtilityHub',
      org: 'Side projects',
      body: 'A rules-based trading research system with 900+ hermetic tests, and a 55-tool progressive web app with a test beside every tool.',
      link: '/projects/tradelab',
    },
    {
      year: '2026',
      title: 'DateTrails launches',
      org: 'Solo product',
      body: 'A Flutter and Supabase social app for planning dates chapter by chapter. The biggest thing I have built, and the one I am proudest of.',
      highlight: true,
      link: '/projects/datetrails',
    },
  ],

  /* ── How I work and lead ──────────────────────────────────────────── */
  strengths: [
    {
      title: 'Clarity before code',
      body: "I don't always feel like the smartest person in the room, but I excel at helping the smartest people work well together: creating clarity and unity around a problem so a group accomplishes far more than its members could alone. It is the same skill that turns a frustrated customer call into a shared plan.",
    },
    {
      title: 'Break it down, finish one step a day',
      body: 'I focus on what is most important rather than what is most pressing, break big goals into the smallest possible steps, and complete one every day. It is how I finished a degree while working full time, and how I shipped DateTrails alone.',
    },
    {
      title: 'Automate anything done twice',
      body: 'Ten years of manual labor taught me to work hard. Engineering taught me to measure output, not hours. If a task is done twice by hand, I build the thing that does it once: SageQuest, EfficiencyOverload, and a site that deploys itself on every push.',
    },
  ],

  /* ── About page ───────────────────────────────────────────────────── */
  aboutTitle: 'A software engineer who came up through hardware.',
  about: [
    "At Universal Switching I own the firmware and the embedded web interface on RF and video switching systems, write the RF test plans, design the occasional board, and get the call when a customer's unit is doing something strange. Before that I spent a decade building things with my hands, which is where the work ethic comes from. Software is where I found the leverage.",
    "For a long time I was a fearful person. I failed classes in college, not because I couldn't do the work, but because I believed I couldn't, so I didn't try. My biggest failures were never starting at all. The turning point was learning to stop saying “I can't” and start saying “I can, I just need to work at it and understand it.”",
    'Now I focus on what is most important rather than what is most pressing, break big goals into the smallest possible steps, and complete one each day. That momentum finished a software engineering degree while I worked full time, built the automation suite my team uses every day, and shipped DateTrails on my own.',
    'Everything I build is shaped by one idea: earn from the output I create, not the hours I sit. I am driven by freedom. The freedom to spend time with my family, to travel and see the world, and to help others realize they do not have to stay in the life they are currently living. They can change it. I know, because I did.',
  ],

  drives: {
    title: 'What drives me',
    body: [
      "My driving motivation is time with the people I love. Growing up, I cherished time with my family, especially my father, but he worked five or six days a week and often did not get home until 6:30. I wanted more of him. That has stayed with me. I want to be present for my own family as much as I possibly can, and I am designing a life that makes that possible.",
      'Success is not something I chase alone. My whole joy is experiencing amazing things alongside the people I love. The long-term picture: waking up with my wife and future kids, enjoying life here in California, spending a few intentional hours a day on meaningful work, and living abroad for part of each year, starting with three months in Paris.',
    ],
  },

  /* ── Beliefs ──────────────────────────────────────────────────────── */
  beliefs: {
    title: 'What I believe',
    intro:
      'My faith is at the center of my story. I am a Christian: I believe God is who He says He is in the Bible, and that the way to Him is through Jesus Christ. I wrote the mission statement below two years ago. It still guides my work, and DateTrails is a direct expression of the line about products that bring people closer together.',
    mission:
      "My mission is to embody God's love, living as an example of His love to everyone I encounter through humility, gentleness and patience. I will prioritize my family, leading them with love, hard work and selflessness in the Lord. I seek to be reliable to my family and friends, a giver who encourages and helps everyone I come in contact with, known for integrity, generosity and a pursuit of growth. In my career, I strive to create products that bring people closer together. I will be fully present, live simply, draw my strength from God, and continually grow to lead others toward His love and beauty.",
    poemsIntro:
      'I also write poetry. These two describe the same journey as the rest of this page: feeling lost and trapped, finding grace, and choosing to walk a new path.',
    poems: [
      {
        title: 'A God so great',
        lines: [
          'A God so great, how can it be?',
          'Who lived and died to set me free.',
          'What relentless love you have for me',
          'So sweet so great such majesty.',
          'You came to me, a broken man.',
          'You saw me, knew me, cleansed my hands.',
          'I ran from you and tried to hide',
          'For shame and guilt had blind my eyes.',
          'You saw me, there; in pain, alone',
          'You wanted me still, I should have known.',
          'Amazing grace how sweet the taste',
          'It washed me clean from all my shame',
          'Every morning I look and see your face.',
          'Every day I stand and know your grace.',
          "You're the God of Gods, the Lord of Lords",
          "You're the king who died to make me yours.",
          "I praise and worship you for all you've done",
          "You're good, you're great, my king has won.",
        ],
      },
      {
        title: 'Great sinners like me',
        lines: [
          'God cares for great sinners like me.',
          "Men who've tried and failed to be free.",
          "I've climbed the mountains, I went so high.",
          'I almost even touched the sky.',
          'But down I came, down all the way,',
          'to darkness yearning to take the day.',
          'In darkness I wandered, lost and ashamed,',
          'Far from my God, by sin enchained.',
          'It looked so sweet, to taste, to feel,',
          'But led me bound with wounds too real.',
          'The promise was grand, the reward was not,',
          'The life it gave just took a lot.',
          'I had my moments of glory and fame.',
          "Just a child in a grown man's game.",
          'My mother saw me in despair.',
          'She found me broken lying there.',
          "She said, “son, don't live this way.",
          "Don't turn from God and drift away.",
          "Don't dress up sin as 'loving yourself,'",
          'That kind of love just harms your health.',
          'True love is true and wise,',
          'It humbles the heart, it opens the eyes.',
          'Be a man of peace, stand on His Word,',
          'A man of faith who follows the Lord.”',
          'I said, “Ok!” And went my way,',
          'determined now to serve the day.',
        ],
      },
    ],
  },

  /* ── Beyond work ──────────────────────────────────────────────────
   * Optional `image` (path inside /public, e.g. 'interests/sierra.webp')
   * replaces the icon with a photo on the card.
   */
  interests: [
    {
      title: 'Piano, mostly by ear',
      body: 'Ten years of lessons and a Certificate of Merit, with annual theory and performance exams. Now I play for my church and for fun, improvising whatever comes to mind to relax. Guitar is next.',
      icon: 'music',
    },
    {
      title: 'The Sierra on foot',
      body: 'Avid backpacker, especially in the Sierra Nevada and Yosemite: several trips over ten miles and one fifty-mile trek across a week. Also hiking, disc golf, the beach and the occasional surf.',
      icon: 'mountain',
    },
    {
      title: 'Things you can hold',
      body: 'Woodworking never left me: small builds, furniture restoration, cutting boards, and the design side of all of it. Physical craft does not disappear when you close the page. It stays, and you can use it.',
      icon: 'hammer',
    },
    {
      title: 'Technical gaming',
      body: 'Minecraft as a technical player: a quad witch hut, mob switches, world eaters. Terraria to relax. Factorio, the automation game, which is the same instinct that drives my work.',
      icon: 'gamepad',
    },
    {
      title: 'Audiobooks',
      body: 'The 4-Hour Workweek, Think and Grow Rich and Essentialism reshaped how I actually live: stop chasing what is pressing and work, every single day, on what is important.',
      icon: 'book',
    },
    {
      title: 'Living elsewhere',
      body: 'I love seeing the world and plan to live in other countries for part of each year, starting with three months in Paris working remote, and skiing in winter both here and overseas.',
      icon: 'globe',
    },
  ],

  /* ── Education & certifications ───────────────────────────────────── */
  education: [
    {
      degree: 'B.S. Software Engineering',
      school: 'Western Governors University',
      year: '2024',
      details: 'Completed while working full time. Coursework in mobile development (Android), advanced Java, data management, front-end and back-end development.',
    },
    { degree: 'General studies', school: 'Moorpark College', year: '', details: 'Several years of coursework before transferring.' },
    { degree: 'High school', school: 'Heritage Christian Academy, Simi Valley', year: '', details: '' },
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
    { group: 'Languages', items: ['Dart', 'Python', 'JavaScript', 'TypeScript', 'Java', 'C / C++', 'SQL', 'HTML & CSS'] },
    { group: 'Frameworks', items: ['Flutter', 'React', 'FastAPI', 'Spring Boot', 'Node.js', 'Electron'] },
    { group: 'Platforms & data', items: ['Supabase', 'PostgreSQL', 'SQLAlchemy', 'AWS', 'Docker', 'Cloudflare Pages', 'GitHub Actions'] },
    { group: 'Embedded & hardware', items: ['Firmware development', 'PCB design', 'RF systems & test plans', 'Soldering, ICs and shorts', 'IAR Embedded Workbench'] },
    { group: 'Leadership & delivery', items: ['Coordinating a team of five', '12+ projects delivered', 'Customer escalation', 'Test plans & documentation', 'Vendor & contractor management'] },
    { group: 'Practices', items: ['Automated testing & CI', 'Workflow automation', 'Code review', 'Written specs a stranger can follow'] },
  ],
}
