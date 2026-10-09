import CrosspointAnim from '../../components/animations/CrosspointAnim'

const img = name => `projects/universal-switching/${name}.webp`

export default {
  slug: 'universal-switching',
  title: 'Universal Switching',
  tagline: 'Firmware, the embedded web interface and the engineering automation behind a line of RF and video switching systems.',
  summary:
    'Universal Switching Corporation builds RF, video and data switching matrices that customers run unattended in racks. Since 2024 I have owned the software side of those platforms: 50+ custom firmware releases, a ground-up redesign of the web interface each unit serves from its own controller, and a set of internal tools (EfficiencyOverload, SageQuest and the FastCAD Component Reviewer) that automate how the engineering team produces assembly drawings and releases firmware. This page collects that work in one place.',

  status: 'live',
  featured: true,
  year: '2024 – Present',
  role: 'Software Engineer, coordinating a team of five engineers',
  category: 'Professional',

  tech: ['C / C++', 'Embedded firmware', 'HTML', 'CSS', 'JavaScript', 'Python', 'Tkinter', 'FastCAD XP SDK', 'Sage 100 ODBC', 'PyInstaller'],
  cover: 'projects/universal-switching.webp',
  mark: CrosspointAnim,
  repo: null, // proprietary, except the FastCAD reviewer

  links: [
    { label: 'FastCAD reviewer source', url: 'https://github.com/wesleyzjones1/FastCadPartReviewer' },
  ],

  metrics: [
    { value: '50+', label: 'firmware releases shipped' },
    { value: '70%', label: 'better update reliability' },
    { value: '32', label: 'automated workflow steps' },
    { value: '10', label: 'FastCAD plug-ins in C++' },
  ],

  highlights: [
    'Developed and deployed 50+ custom embedded firmware builds across multiple switching platforms, raising software update reliability by 70%.',
    'Rebuilt the browser-based control interface page by page: one dark layout with real navigation state, a clickable crosspoint grid in place of a 64-row form, and warning callouts around the operations that can take a unit offline.',
    'Built EfficiencyOverload, a desktop cockpit that turns the assembly-drawing and firmware-release workflow into independent, re-runnable steps across FastCAD, Sage 100, Excel and Outlook, backed by ten FastCAD plug-ins written in C++.',
    'Built SageQuest, a search window colleagues run every day that joins the ERP’s bills of materials to the documents on the network shares, with tabs, revision stepping and side-by-side BOM comparison.',
    'Lead technical support for software cases, working directly with customers to diagnose hardware and firmware issues, and coordinate a team of five engineers across 12+ projects.',
  ],

  comparisonsNote: 'Control interface before and after the redesign. Screens are from a demo unit with placeholder labels; no customer configuration is shown.',
  comparisons: [
    {
      title: 'Information',
      caption: 'The landing page of every unit.',
      before: img('index_old'),
      after: img('index_new'),
    },
    {
      title: 'Switch State',
      caption: 'Routing. The form of numeric inputs became a crosspoint grid.',
      before: img('switchstate_old'),
      after: img('switchstate_new'),
    },
    {
      title: 'Firmware Maintenance',
      caption: 'The operations that can take a unit offline now sit behind explicit warnings.',
      before: img('fmwupdate_old'),
      after: img('fmwupdate_new'),
    },
    {
      title: 'Support Center',
      caption: 'Contact and escalation details, restructured so the important part is findable.',
      before: img('supportcenter_old'),
      after: img('supportcenter_new'),
    },
  ],

  gallery: [
    {
      src: img('fastcad-reviewer'),
      caption: 'FastCAD Component Reviewer mid-review: the parts list below, the current designator and what it should be above, FastCAD zoomed to the part behind it.',
    },
  ],

  sections: [
    {
      heading: 'The platform',
      body: [
        'Each switching system runs its own controller firmware and serves its own configuration site over the LAN. Customers use that interface to set up networking and SNMP, route inputs to outputs, schedule events, update firmware and reach support, and for most of them it is the only interface they ever see. It has to be small, dependable and obvious to someone who opens it twice a year.',
      ],
    },
    {
      heading: 'Control interface redesign',
      bullets: [
        'Navigation: a list of underlined links became a sidebar that highlights the current page.',
        'Switch State: outputs and inputs are drawn as a grid with the customer’s own labels. Routing is a click, the grid can be locked against accidental changes, and the page can refresh itself on an interval.',
        'Firmware Maintenance: the irreversible actions (update, factory restore) sit behind explicit warnings and a password, with a “factory reset on update” option so a bad update cannot leave stale settings behind.',
        'Support Center: the details a customer needs on the phone with support sit in one box at the top instead of a page of prose.',
        'New pages as the hardware grew: module information and adjustable gain.',
      ],
    },
    {
      heading: 'EfficiencyOverload',
      body: [
        'Producing an assembly drawing used to mean a dozen manual steps across FastCAD, OrCAD, Sage 100, Excel, Outlook and several network shares, documented only as a text file describing the current workflow. EfficiencyOverload turns each step into a button that is safe to press again, in any order: start a job, copy the drawing and checklist, pull the bill of materials and change orders from the ERP, build the parts list, place the passives, draft the review emails. A Firmware tab does the same for firmware releases: find the order, copy and rename the previous build, move the hex, release, draft the announcement.',
      ],
      bullets: [
        'A box of tools, not a pipeline. There is deliberately no “do everything” button; each step leaves existing files alone and says so, and the cockpit asks before overwriting.',
        'Read-only ERP access by construction: every Sage query goes through a SELECT-only guard, and credentials live in Windows Credential Manager, never in a file.',
        'Ten FastCAD XP plug-ins in C++ (MSVC, 32-bit): build a parts list from the job file, import components by part number, walk the parts left to place, dump and re-apply drawing text, stamp PRELIMINARY.',
        'Every path, file-name pattern and person comes from a layered settings file: a shared default, then a per-user copy the Settings tab edits. Nothing is hardcoded.',
        'Packaged with PyInstaller and self-tested on every build: the built executable imports every shipped module, so a missing library fails the build instead of the user. 116 unit tests cover the Tk-free logic modules; about 30,000 lines of Python in all.',
      ],
    },
    {
      heading: 'SageQuest',
      body: [
        'Sage knows what is on a bill; the shares know where each document is. SageQuest is the join. Type any drawing, part, bill or sales-order number: an item with nothing above it opens as the full bill resolved to clickable files, and anything else lists what it is used on so you can climb toward the top.',
        'The item and description tables (about 233,000 lines) are preloaded on a second connection at launch, so after the first few seconds a bill costs zero queries and a warm search answers in tens of milliseconds. Chrome-style tabs, a revision stepper, and side-by-side comparison of two bills or two revisions as one merged tree with added, removed and changed lines coloured. Every build is published to a shared folder; it is the copy colleagues run every day.',
      ],
    },
    {
      heading: 'FastCAD Component Reviewer',
      body: [
        'The first of these tools, and the one with a public repository. Reviewing an assembly drawing means checking every reference designator against the parts list. The reviewer takes the parts list’s description and usage columns, expands designator ranges such as C65-C128, and on each keypress focuses FastCAD, selects the next component and zooms to it while showing what it should be. A 98-part review becomes a hundred taps of the space bar. Python and Tkinter, global hotkeys, a pure parsing module, shipped as a single executable.',
      ],
    },
    {
      heading: 'Code availability',
      body: [
        'The firmware, the web interface and EfficiencyOverload are proprietary to Universal Switching, so there is no public repository for them; the FastCAD reviewer is on GitHub. I am happy to walk through the architecture of any of it in an interview.',
      ],
    },
  ],
}
