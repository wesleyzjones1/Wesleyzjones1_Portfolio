# Adding a project to the portfolio

Every project on the site is one file. No component code changes are needed.

## 1. Create the project file

Copy the template and rename it to the project's URL slug:

```bash
cp react-app/src/content/projects/_template.js react-app/src/content/projects/my-project.js
```

Fill in the fields. Only four are required:

| Field | What it is |
|---|---|
| `slug` | URL segment: `/projects/<slug>`. Lowercase, hyphens. |
| `title` | Display name. |
| `tagline` | One sentence shown on the card and under the title. |
| `summary` | Two or three sentences. Shown on the feature card and as the "Overview" on the detail page. |

Everything else is optional and can be deleted:

| Field | Notes |
|---|---|
| `status` | `'live'`, `'coming-soon'`, `'in-progress'` or `'archived'`. Controls the badge. |
| `featured` | `true` shows it on the home page (up to three, in list order). |
| `hero` | `true` makes it the large feature card on the home page. Only one project should have this. |
| `year`, `role`, `category` | Shown in the detail sidebar. `category` also drives the filter chips on `/projects`. |
| `tech` | Stack chips. The card shows the first four. |
| `cover` | Path inside `react-app/public`, e.g. `projects/my-project.webp`. 1280×800 works best. |
| `logo` | Path to a square logo (SVG or PNG) used instead of an animated mark. |
| `mark` | An animated 26×26 mark component from `src/components/animations`. |
| `repo` | `owner/repo`. The detail page pulls "last updated" and language from the public GitHub API. Leave out for private repos. |
| `links` | Array of `{ label, url, primary }`. The primary link becomes the main button. |
| `embed` | `true` shows the primary link inside an iframe on the detail page. Only for sites that allow embedding (GitHub Pages does). |
| `metrics` | Up to four `{ value, label }` tiles. |
| `highlights` | Bullet list on the detail page. |
| `sections` | Case-study sections: `{ heading, body: [paragraphs], bullets: [items] }`. |
| `comparisons` | Before/after image pairs: `{ title, caption, before, after }` with paths inside `react-app/public`. Rendered side by side above the overview. `comparisonsNote` adds a one-line note under the heading. |
| `gallery` | Captioned screenshots: `{ src, caption, alt }`. Rendered as a responsive grid after the write-up. |
| `storeBadges` | `true` shows "coming soon" App Store and Google Play badges. |

## 2. Register it

Open `react-app/src/content/projects/index.js`, import the file and add it to the array. The array order is the display order everywhere on the site.

```js
import myProject from './my-project'

export const projects = [
  datetrails,
  myProject,   // ← anywhere in the list
  ...
]
```

## 3. Optional: add a cover image

Drop a screenshot at `react-app/public/projects/<slug>.webp` (or `.png`/`.jpg`) and set `cover: 'projects/<slug>.webp'`. Keep it under ~100 KB; a 1280×800 WebP at quality 75–80 is usually 15–50 KB.

## 4. Optional: add an animated mark

Marks are small self-contained SVG animations in `react-app/src/components/animations/`. Follow the style rules in `.github/skills/navbar-animation/SKILL.md`, then set `mark: MyAnim` in the project file.

## 5. Check it

```bash
cd react-app
npm run lint
npm run build
npm run dev   # open http://localhost:5173/projects/<slug>
```

## Updating your profile, résumé or interests

- **Text** (headline, bio, interests, experience, education, certifications, skills): `react-app/src/content/profile.js`.
- **Résumé PDF**: replace `react-app/public/Wesley_Jones_Resume.pdf` (or change `resumeFile` in `profile.js`).
- **Photo**: replace `react-app/public/profile-640.jpg` and `profile-640.webp` (640×640, square).
