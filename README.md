# Wesley Jones · Portfolio

Personal portfolio site: React 19 + Vite, plain CSS, no UI framework. Deployed to GitHub Pages from `main` by `.github/workflows/deploy-pages.yml`.

## Run locally

```bash
cd react-app
npm install
npm run dev        # http://localhost:5173
npm run lint
npm run build      # outputs react-app/dist
```

## Where things live

| What | Where |
|---|---|
| Your name, bio, experience, education, skills, interests | `react-app/src/content/profile.js` |
| Projects (one file each) | `react-app/src/content/projects/` |
| Project order and registration | `react-app/src/content/projects/index.js` |
| Résumé PDF, photo, project covers | `react-app/public/` |
| Pages (Home, Projects, Project detail, About, Contact) | `react-app/src/pages/` |
| Design tokens, light/dark themes | `react-app/src/styles/global.css` |

**Adding a project:** see [docs/ADDING_A_PROJECT.md](docs/ADDING_A_PROJECT.md). Copy `_template.js`, fill it in, add one import line.

## Routing on GitHub Pages

The site uses client-side routes (`/projects/datetrails`). The Vite build copies `index.html` to `404.html` so GitHub Pages serves the app for deep links. The base path is derived from the repository name automatically in CI.

## Contact form

The contact page sends through EmailJS using public identifiers in `react-app/src/pages/Contact.jsx`, rate-limited to five messages per browser per day.
