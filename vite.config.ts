import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { PAGE_SEO } from './src/data/seo'
import { INDUSTRIES } from './src/data/industryData'
import { CITIES } from './src/data/cityData'

const SITE = 'https://bivry.com.au'
const DEFAULT_DESCRIPTION =
  'Premium road freight, warehousing and distribution across Australia. 96.2% on-time delivery, 24/7 GPS tracking. Reliable. Trackable. Trusted.'

const escText = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const escAttr = (s: string) => escText(s).replace(/"/g, '&quot;')

/** Absolute canonical URL for a route path — mirrors the runtime useCanonical hook. */
const canonicalFor = (path: string) => (path === '/' ? SITE : `${SITE}${path.replace(/\/+$/, '')}`)

/**
 * Bakes per-route <title>, <meta name="description"> and <link rel="canonical">
 * into a static index.html for every route, so crawlers that don't run JS still
 * see the correct meta. Runs after Vite writes the SPA bundle; the client app
 * then hydrates the same #root and keeps these values in sync via its hooks.
 */
function prerenderSeo(): Plugin {
  return {
    name: 'prerender-seo',
    apply: 'build',
    closeBundle() {
      const outDir = join(process.cwd(), 'dist')
      const template = readFileSync(join(outDir, 'index.html'), 'utf8')

      const routes = [
        ...Object.entries(PAGE_SEO).map(([path, seo]) => ({
          path,
          title: seo.title,
          description: seo.description,
          h1: seo.h1,
        })),
        ...INDUSTRIES.map((ind) => ({
          path: `/industries/${ind.slug}`,
          title: ind.metaTitle ?? `${ind.name} Freight & Logistics — BIVRY`,
          description: ind.metaDescription ?? DEFAULT_DESCRIPTION,
          h1: `${ind.heroLine1} ${ind.heroLine2}`,
        })),
        ...CITIES.map((city) => ({
          path: `/${city.slug}`,
          title: city.metaTitle,
          description: city.metaDescription,
          h1: `Freight Company in ${city.name}`,
        })),
      ]

      for (const route of routes) {
        const canonical = canonicalFor(route.path)
        const html = template
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${escText(route.title)}</title>`)
          .replace(
            /<meta name="description" content="[^"]*"\s*\/>/,
            `<meta name="description" content="${escAttr(route.description)}" />`,
          )
          // Per-route Open Graph tags (social crawlers read the static HTML)
          .replace(
            /<meta property="og:title" content="[^"]*"\s*\/>/,
            `<meta property="og:title" content="${escAttr(route.title)}" />`,
          )
          .replace(
            /<meta property="og:description" content="[^"]*"\s*\/>/,
            `<meta property="og:description" content="${escAttr(route.description)}" />`,
          )
          .replace(
            /<meta property="og:url" content="[^"]*"\s*\/>/,
            `<meta property="og:url" content="${escAttr(canonical)}" />`,
          )
          // Per-route Twitter Card tags
          .replace(
            /<meta name="twitter:title" content="[^"]*"\s*\/>/,
            `<meta name="twitter:title" content="${escAttr(route.title)}" />`,
          )
          .replace(
            /<meta name="twitter:description" content="[^"]*"\s*\/>/,
            `<meta name="twitter:description" content="${escAttr(route.description)}" />`,
          )
          .replace(
            '</head>',
            `  <link rel="canonical" href="${canonical}" />\n  </head>`,
          )
          // Bake the page's single <h1> into #root so non-JS crawlers see exactly
          // one h1 per page. It's visually hidden to avoid a flash, and React
          // clears #root on mount — so the live DOM keeps just the app's own h1.
          .replace(
            '<div id="root"></div>',
            `<div id="root"><h1 style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0">${escText(route.h1)}</h1></div>`,
          )

        const file =
          route.path === '/'
            ? join(outDir, 'index.html')
            : join(outDir, route.path, 'index.html')
        mkdirSync(dirname(file), { recursive: true })
        writeFileSync(file, html)
      }

      console.log(`prerender-seo: wrote ${routes.length} static route pages`)
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerenderSeo(),
  ],
  optimizeDeps: {
    include: ['react-simple-maps', 'prop-types'],
  },
})
