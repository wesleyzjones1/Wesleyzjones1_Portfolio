/**
 * profile.js — everything about *you* lives here.
 *
 * Edit this file to change the hero, your beliefs, how you can help,
 * the about page, interests and faith.
 * No component code needs to change.
 */

export const profile = {
  name: 'Wesley Jones',
  firstName: 'Wesley',
  role: 'Software Engineer',
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
  /** Square crop in /public, shown as the navbar avatar. */
  avatar: 'profile-160.jpg',

  /* ── Hero ─────────────────────────────────────────────────────────── */
  /** One line under the name: what you build. */
  tagline: 'I build firmware, web and mobile apps, and the automation that ties them together.',
  intro:
    "Hello, my name is Wesley, and I'm a software engineer who enjoys building things, both by hand and in code. I'm passionate about bringing ideas to life in practical ways and solving challenging problems one step at a time.",

  /* ── My beliefs ──────────────────────────────────────────────────────
   * Each belief carries one fact and a link to the page that shows it.
   */
  principles: {
    title: 'My beliefs',
    items: [
      {
        title: 'I finish products',
        body: 'Ideas are easy to start and hard to finish. I see projects through to a polished product people can actually use, like DateTrails, which I took from first sketch to launch-ready on my own.',
        proof: { label: 'See DateTrails', to: '/projects/datetrails' },
      },
      {
        title: 'I test what I ship',
        body: 'Reliable beats fast. DateTrails runs 5,600+ automated tests and TradeLab 900+, so a new feature can’t quietly break an old one.',
        proof: { label: 'See TradeLab', to: '/projects/tradelab' },
      },
      {
        title: 'I lead and support',
        body: 'I help teams get clear on the problem and work well together. At Universal Switching I coordinate five engineers and work directly with customers until their issue is solved.',
        proof: { label: 'See Universal Switching', to: '/projects/universal-switching' },
      },
      {
        title: 'I automate',
        body: 'I focus on automating or improving a task each day to make a better future for myself, my clients, and my company. My EfficiencyOverload tool turned a drawing and firmware-release workflow into re-runnable steps.',
        proof: { label: 'See the automation tools', to: '/projects/universal-switching' },
      },
    ],
  },

  /* ── How I can help ──────────────────────────────────────────────── */
  help: {
    eyebrow: 'Work with me',
    title: 'How I can help',
    body: "Have an idea, a problem to solve, or a task that eats up your time? I'd love to hear about it and help you build the right tool for it. Let's make it happen.",
    /** The kinds of work you take on, shown as labels under the text. */
    services: ['Web and mobile apps', 'Automation and internal tools', 'Firmware and device interfaces'],
  },

  /* ── About page ───────────────────────────────────────────────────── */
  aboutTitle: 'A software engineer who came up through hardware.',
  about: [
    "At Universal Switching I work on and improve the firmware and the embedded web interface on our RF and video switching systems, write the RF test plans, design the occasional board, and get the call when a customer's unit is doing something strange. Before that I spent a decade building things with my hands, which is where the work ethic comes from. Software is where I found the leverage.",
    "For a long time I was a fearful person. I failed, not because I couldn't do the work, but because I believed I couldn't, so I didn't try. My biggest failures were never starting at all. The turning point was learning to stop saying “I can't” and start saying “I can, I just need to work at it and understand it.”",
    'Now I focus on what is most important rather than what is most pressing, break big goals into the smallest possible steps, and complete one each day. I am using this momentum to complete things I never thought possible, like building the automation suite my team uses every day and shipping DateTrails on my own.',
  ],

  /* ── Beliefs ──────────────────────────────────────────────────────── */
  beliefs: {
    title: 'What I believe',
    intro:
      'My faith is at the center of my story. I am a Christian: I believe God is who He says He is in the Bible, and that the way to Him is through Jesus Christ. I wrote the mission statement below two years ago. It still guides my work, and DateTrails is a direct expression of the line about products that bring people closer together.',
    mission:
      "My mission is to embody God's love, living as an example of His love to everyone I encounter through humility, gentleness and patience. I will prioritize my family, leading them with love, hard work and selflessness in the Lord. I seek to be reliable to my family and friends, a giver who encourages and helps everyone I come in contact with, known for integrity, generosity and a pursuit of growth. In my career, I strive to create products that bring people closer together. I will be fully present, live simply, draw my strength from God, and continually grow to lead others toward His love and beauty.",
  },

  /* ── Beyond work ──────────────────────────────────────────────────
   * The About page shows them all; `home: true` ones also appear on the
   * home page. Optional `image` (path inside /public, e.g.
   * 'interests/sierra.webp') replaces the icon with a photo on the card.
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
      home: true,
    },
    {
      title: 'Things you can hold',
      body: 'Woodworking never left me: small builds, furniture restoration, cutting boards, and the design side of all of it. Physical craft does not disappear when you close the page. It stays, and you can use it.',
      icon: 'hammer',
      home: true,
    },
    {
      title: 'Enjoying family',
      body: 'Hanging out with my wife is the best part of my week. Whether we are out exploring or relaxing at home, I treasure our time together.',
      icon: 'heart',
      home: true,
    },
    {
      title: 'Audiobooks',
      body: 'Essentialism and Think and Grow Rich shaped how I work: focus on what matters most, and make progress on it every single day.',
      icon: 'book',
    },
    {
      title: 'Seeing the world',
      body: 'I love exploring new places and cultures, and I ski every winter, both here and overseas.',
      icon: 'globe',
    },
  ],
}
