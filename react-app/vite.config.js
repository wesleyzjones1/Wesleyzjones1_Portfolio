import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const pagesBase = repositoryName ? `/${repositoryName}/` : '/'

/**
 * GitHub Pages serves 404.html for unknown paths. Copying index.html there
 * lets deep links like /projects/datetrails load the app, which then routes
 * client-side.
 */
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
  plugins: [react(), spaFallback()],
  base: process.env.GITHUB_ACTIONS === 'true' ? pagesBase : '/',
  server: { open: false },
})
