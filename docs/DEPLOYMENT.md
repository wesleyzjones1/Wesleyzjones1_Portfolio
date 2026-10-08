# Deployment

Every push to `main` runs two workflows:

| Workflow | Publishes to | File |
|---|---|---|
| Deploy to wesleyzjones.com | Cloudflare Pages project `wesleyzjones`, served at https://wesleyzjones.com | `.github/workflows/deploy-cloudflare.yml` |
| Deploy to GitHub Pages | https://wesleyzjones1.github.io/Wesleyzjones1_Portfolio/ (the site, or a redirect to the domain once `PAGES_REDIRECT_TO` is set) | `.github/workflows/deploy-pages.yml` |

The Cloudflare workflow finishes green with a notice until the two secrets below exist.

## One-time setup for wesleyzjones.com

Do these in order. Steps 1–4 are about ten minutes; step 5 waits on DNS.

### 1. Cloudflare API token

1. Cloudflare dashboard → profile icon (top right) → **My Profile** → **API Tokens** → **Create Token** → **Create Custom Token**.
2. Name: `github-actions-pages`. Permissions: **Account · Cloudflare Pages · Edit**. Account Resources: **Include · your account**. Leave the rest.
3. **Continue to summary** → **Create Token**. Copy the token now; it is shown once.

### 2. Account ID

Dashboard → **Workers & Pages**. The **Account ID** is in the right-hand column of the overview page (it is also the 32-character segment in the dashboard URL after `dash.cloudflare.com/`).

### 3. GitHub secrets

GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**, twice:

| Name | Value |
|---|---|
| `CLOUDFLARE_API_TOKEN` | the token from step 1 |
| `CLOUDFLARE_ACCOUNT_ID` | the ID from step 2 |

### 4. First deploy

GitHub repo → **Actions** → **Deploy to wesleyzjones.com** → **Run workflow** → **Run workflow**. The first run creates the Pages project and publishes the site. When it finishes, open https://wesleyzjones.pages.dev and click through to a project page to confirm deep links work.

### 5. Attach the domain

1. Cloudflare → **Workers & Pages** → **wesleyzjones** → **Custom domains** → **Set up a custom domain** → enter `wesleyzjones.com` → **Continue** → **Activate domain**. Cloudflare adds the DNS record for you because the domain is in the same account.
2. Repeat for `www.wesleyzjones.com`.
3. Wait until both show **Active** (usually a few minutes, up to an hour). https://wesleyzjones.com now serves the site with HTTPS.

### 6. Redirects

| Redirect | Where | How |
|---|---|---|
| `www.wesleyzjones.com` → `wesleyzjones.com` | Cloudflare → the `wesleyzjones.com` domain → **Rules** → **Redirect Rules** → **Create rule** | Choose the template **Redirect from WWW to root**, keep the defaults (301, preserve path and query), **Deploy**. |
| `http://` → `https://` | Cloudflare → the domain → **SSL/TLS** → **Edge Certificates** | Turn on **Always Use HTTPS**. |
| Old GitHub Pages links → the domain | GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **Variables** → **New repository variable** | Name `PAGES_REDIRECT_TO`, value `https://wesleyzjones.com`. Then **Actions** → **Deploy to GitHub Pages** → **Run workflow**. Every old `github.io/Wesleyzjones1_Portfolio/...` link now forwards to the same path on the domain. Do this only after step 5 shows Active. |

### 7. Update the places that still point at github.io

- GitHub profile → **Edit profile** → **Website**: `https://wesleyzjones.com`
- LinkedIn contact info and the résumé PDF.
- The DateTrails site, if it links back here.

### 8. Verify

Open each of these and check the result:

| URL | Expect |
|---|---|
| https://wesleyzjones.com/projects/utilityhub | the UtilityHub page loads directly |
| https://www.wesleyzjones.com/about | lands on https://wesleyzjones.com/about |
| http://wesleyzjones.com | lands on https://wesleyzjones.com |
| https://wesleyzjones1.github.io/Wesleyzjones1_Portfolio/projects/datetrails | lands on https://wesleyzjones.com/projects/datetrails |

## Day to day

- Push to `main`: both workflows run; the domain updates in about a minute.
- Preview a change before pushing: `cd react-app && npm run build && npm run preview`.
- Roll back: Cloudflare → **Workers & Pages** → **wesleyzjones** → **Deployments** → pick an older deployment → **Rollback to this deployment**.
- Rotate the token: create a new one (step 1), update the `CLOUDFLARE_API_TOKEN` secret, then delete the old token.
