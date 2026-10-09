/**
 * profile.js — everything about *you* lives here.
 *
 * Edit this file to change the hero, the trail, the about page, experience,
 * education, certifications, skills, interests and beliefs. No component
 * code needs to change.
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
  headline: 'From digging ditches',
  headlineAccent: 'to shipping firmware.',
  intro:
    'I started working at twelve on a construction crew. Today I am a software engineer at Universal Switching, specializing in embedded systems and RF testing, and I am about to launch DateTrails, a mobile app I designed and built on my own.',
  availability: 'Open to senior engineering and technical leadership roles',

  /** Short list shown under the hero intro. Keep to three. */
  now: [
    'Launching DateTrails on iOS and Android',
    'Building an automated trading bot',
    'Learning guitar',
  ],

  /** Short, true, memorable. Mix work and life; that is the point. */
  facts: [
    { value: '12', label: 'Age of my first job' },
    { value: '50+', label: 'Firmware releases shipped' },
    { value: '50 mi', label: 'Longest backpacking trek' },
    { value: '10 yrs', label: 'Piano, Certificate of Merit' },
  ],

  /* ── The trail so far ─────────────────────────────────────────────
   * Shown as a trail of waypoints on the home page (compact) and the
   * about page (full). Order is chronological. `highlight` marks the
   * current destination.
   */
  journey: [
    {
      year: '2012',
      title: 'First job, age twelve',
      org: 'Davis Construction',
      body: 'Digging ditches. Over ten years I worked up from outdoor labor to framing, concrete, plumbing and electrical, helped build several ADUs and remodel a full two-story house. This is where I learned toughness, discipline and the value of hard work.',
    },
    {
      year: '2014',
      title: 'Drafting intern',
      org: 'Todd B. Spiegel Architects',
      body: 'Built a master detail library and project templates in Revit and AutoCAD, and worked on everything from parking lots to measuring homes and designing ADUs. The first time I saw a good template save a whole office hours.',
    },
    {
      year: '2022',
      title: 'LED screens, coast to coast',
      org: 'Insane Impact',
      body: 'Built and installed large LED screens for high schools and colleges across the country, then grew into the IT role: programming, wiring and networking the screens, managing electricians and contractors, and working with school IT departments.',
    },
    {
      year: '2023',
      title: 'Process developer',
      org: 'Piccola Homes',
      body: 'At a tiny-home startup, created build templates, reproduction documentation and Excel systems tracking price and time per project. Production sped up by 30%.',
    },
    {
      year: '2024',
      title: 'B.S. Software Engineering',
      org: 'Western Governors University',
      body: 'Finished the degree while working full time, then joined Universal Switching as a software engineer.',
    },
    {
      year: 'Now',
      title: 'Embedded systems and RF',
      org: 'Universal Switching',
      body: 'Firmware, PCB design, RF test systems, lead client support, and the automation tools that make the whole shop faster.',
    },
    {
      year: '2026',
      title: 'DateTrails launches',
      org: 'Solo project',
      body: 'A Flutter and Supabase app for planning dates chapter by chapter. The biggest thing I have built, and the one I am proudest of.',
      highlight: true,
      link: '/projects/datetrails',
    },
  ],

  /* ── How I work ───────────────────────────────────────────────────── */
  strengths: [
    {
      title: 'Work smart, not just hard',
      body: "Ten years of manual labor taught me to work hard. Engineering taught me to work smart: measure output, not hours, and automate anything done twice. At Universal Switching I built a search tool that links every project's drawings, schematics and firmware, and “Efficiency Overload”, which automates most of the drawing process including BOM creation and review.",
    },
    {
      title: 'Break it down, finish one step a day',
      body: 'I focus on what is most important rather than what is most pressing, break big goals into the smallest possible steps, and complete one every day. It is how I finished a degree while working full time, and how I shipped DateTrails alone.',
    },
    {
      title: 'Bring people together',
      body: "I don't always feel like the smartest person in the room, but I excel at helping the smartest people work well together. As lead support for Universal Switching clients I turn frustrated, confused situations into a clear, shared path forward, and have kept orders customers were ready to cancel.",
    },
  ],

  /* ── About page ───────────────────────────────────────────────────── */
  aboutTitle: 'The long way here.',
  about: [
    'I started working at twelve, digging ditches for a construction company, and spent the next decade learning how to work hard. Somewhere along the way I learned something more important: how to work smart.',
    "For a long time I was a fearful person. I felt like I was never enough. I failed classes in college, not because I couldn't do the work, but because I believed I couldn't, so I didn't try. My biggest failures were never starting at all. The turning point was learning to stop saying “I can't” and start saying “I can, I just need to work at it and understand it.”",
    'Now I focus on what is most important rather than what is most pressing, break big goals into the smallest possible steps, and complete one each day. That momentum finished a software engineering degree while I worked full time, took me from job sites to embedded systems and RF work at Universal Switching, and built DateTrails.',
    'Everything I build now is shaped by one idea: shifting from earning based on the hours I work to earning based on the output I create. I am driven by freedom. The freedom to spend time with my family, to travel and see the world, and to help others realize they do not have to stay in the life they are currently living. They can change it. I know, because I did.',
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

  /* ── Beyond work ──────────────────────────────────────────────────── */
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
      body: 'Construction and woodworking never left me: small builds, furniture restoration, cutting boards, and the design side of all of it. Physical craft does not disappear when you close the page. It stays, and you can use it.',
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

  /* ── Experience ───────────────────────────────────────────────────── */
  experience: [
    {
      role: 'Software Engineer',
      company: 'Universal Switching',
      location: 'Burbank, CA',
      start: '2024',
      end: 'Present',
      summary: 'Embedded systems development and RF testing for hardware switching platforms.',
      bullets: [
        'Troubleshoot and design RF systems, including PCB design, documentation, test plans and manuals.',
        'Develop firmware and software, including UI improvements that work within tight embedded memory constraints. 50+ custom firmware releases across multiple switching platforms, raising update reliability by 70%.',
        'Lead support for clients with system issues: walk them through complex problems step by step, verify units in-office, and have retained orders clients were ready to cancel.',
        'Built a project search tool that links assembly drawings, schematics and firmware for instant access, and “Efficiency Overload”, which automates much of the drawing process including BOM creation and review.',
        'Directed 12+ projects and coordinated a team of five engineers.',
      ],
      tags: ['Embedded firmware', 'RF systems', 'PCB design', 'Automation', 'Client support'],
    },
    {
      role: 'Junior Project Manager',
      company: 'Insane Impact',
      location: 'Nationwide',
      start: '2022',
      end: '2024',
      summary: 'Large LED screen installations for high schools and colleges across the country.',
      bullets: [
        'Built and installed large LED screens, then grew into the IT role: programming, wiring and networking the screens.',
        'Managed electricians and contractors and worked closely with school IT departments.',
        'Systematic troubleshooting: break the problem into individual steps and test each one until the cause is isolated, whether a network issue or a boot failure.',
      ],
      tags: ['Networking', 'Project management', 'LED systems'],
    },
    {
      role: 'Process Developer',
      company: 'Piccola Homes',
      location: 'Simi Valley, CA',
      start: '2022',
      end: '2023',
      summary: 'Production process design for a tiny-home startup.',
      bullets: [
        'Created templates that sped up production of expertly crafted tiny homes by 30%.',
        'Wrote reproduction documentation and instructions so builds were repeatable.',
        'Built Excel tracking systems for price and time per project.',
      ],
      tags: ['Process design', 'Documentation'],
    },
    {
      role: 'Draftsman Intern',
      company: 'Todd B. Spiegel Architects',
      location: 'Thousand Oaks, CA',
      start: '2014',
      end: '2016',
      summary: 'Architectural drafting in Revit and AutoCAD.',
      bullets: [
        'Created a master detail library to streamline detail implementation across projects.',
        'Worked on parking lots, measuring homes and designing ADUs, and built templates to speed up the overall process.',
      ],
      tags: ['Revit', 'AutoCAD'],
    },
    {
      role: 'Construction',
      company: 'Davis Construction',
      location: 'Simi Valley, CA',
      start: '2012',
      end: '2022',
      summary: 'Started at twelve digging ditches.',
      bullets: [
        'Progressed from outdoor labor to skilled indoor work: framing, concrete, and some plumbing and electrical.',
        'Helped build several ADUs and remodel a full two-story house.',
      ],
      tags: ['Framing', 'Concrete', 'Hard work'],
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
    { group: 'Languages', items: ['Dart', 'Java', 'JavaScript', 'C / C++', 'SQL', 'HTML & CSS'] },
    { group: 'Frameworks', items: ['Flutter', 'React', 'Spring Boot', 'Node.js', 'Electron'] },
    { group: 'Embedded & hardware', items: ['Firmware development', 'PCB design', 'RF systems & testing', 'Soldering, ICs and shorts', 'IAR Embedded Workbench'] },
    { group: 'Platforms & data', items: ['Supabase', 'PostgreSQL', 'AWS', 'Docker', 'Git & GitHub Actions'] },
    { group: 'Practices', items: ['Automation & tooling', 'Test plans & documentation', 'Client support', 'Technical leadership'] },
  ],
}
