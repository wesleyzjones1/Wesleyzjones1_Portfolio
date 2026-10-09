# Wesley Jones · Portfolio

Personal portfolio site: React 19 + Vite, plain CSS, no UI framework. Every push to `main` deploys it to [wesleyzjones.com](https://wesleyzjones.com) (Cloudflare Pages) and to GitHub Pages; see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

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
| Public repositories (auto-refreshed in CI) | `react-app/src/content/repos.json`, `react-app/scripts/fetch-repos.mjs` |
| Project order and registration | `react-app/src/content/projects/index.js` |
| Résumé PDF, photo, project covers | `react-app/public/` |
| Pages (Home, Projects, Project detail, About, Contact) | `react-app/src/pages/` |
| Design tokens, light/dark themes | `react-app/src/styles/global.css` |

**Adding a project:** see [docs/ADDING_A_PROJECT.md](docs/ADDING_A_PROJECT.md). Copy `_template.js`, fill it in, add one import line.

## Deployment

Two workflows run on every push to `main`:

- `.github/workflows/deploy-cloudflare.yml` builds with base `/` and publishes `react-app/dist` to the Cloudflare Pages project `wesleyzjones` (needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` secrets; until then it finishes with a notice). Cloudflare Pages serves `index.html` for client-side routes such as `/projects/datetrails`.
- `.github/workflows/deploy-pages.yml` builds with `DEPLOY_TARGET=github-pages` (base `/<repo>/` plus a `404.html` copy for deep links). Set the repository variable `PAGES_REDIRECT_TO` to `https://wesleyzjones.com` and it publishes a path-preserving redirect instead of the site.

Setup, redirects and verification steps: [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Contact form

The contact page sends through EmailJS using public identifiers in `react-app/src/pages/Contact.jsx`, rate-limited to five messages per browser per day.
