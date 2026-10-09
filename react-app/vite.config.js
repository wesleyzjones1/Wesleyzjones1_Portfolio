import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * DEPLOY_TARGET=github-pages builds for https://<user>.github.io/<repo>/: a
 * sub-path base plus a 404.html copy of index.html so deep links load.
 *
 * Anything else (Cloudflare Pages for wesleyzjones.com, local dev and preview)
 * builds for the root of a domain with no 404.html; Cloudflare Pages then
 * serves index.html for unknown routes, which is what a client-side router needs.
 */
const githubPages = process.env.DEPLOY_TARGET === 'github-pages'
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]

function spaFallback() {
  let outDir = ''
  return {
    name: 'spa-fallback-404',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')
      if (existsSync(index)) copyFileSync(index, resolve(outDir, '404.html'))
    },
  }
}

export default defineConfig({
  plugins: [react(), ...(githubPages ? [spaFallback()] : [])],
  base: githubPages && repositoryName ? `/${repositoryName}/` : '/',
  server: { open: false },
})
