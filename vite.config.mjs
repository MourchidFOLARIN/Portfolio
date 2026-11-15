import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// `npm run preview` applique les mêmes en-têtes de sécurité que la production
// (vercel.json) : on teste en local exactement ce qui sera servi.
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'))
const securityHeaders = Object.fromEntries(
    vercel.headers
        .find((rule) => rule.source === '/(.*)')
        .headers.filter((header) => header.key !== 'Strict-Transport-Security')
        // en local on reste en http : pas de mise à niveau forcée vers https
        .map((header) => [header.key, header.value.replace('; upgrade-insecure-requests', '')]),
)

// Comme `cleanUrls` sur Vercel : /projets sert dist/projets.html
function cleanUrls() {
    return {
        name: 'clean-urls-preview',
        configurePreviewServer(server) {
            const dist = server.config.build.outDir
            server.middlewares.use((req, _res, next) => {
                const [path, query = ''] = (req.url || '/').split('?')
                if (path !== '/' && !path.includes('.') && existsSync(join(dist, `${path}.html`))) {
                    req.url = `${path}.html${query ? `?${query}` : ''}`
                }
                next()
            })
        },
    }
}

export default defineConfig({
    plugins: [react(), tailwindcss(), cleanUrls()],
    build: {
        // Le pré-rendu lit ce manifeste pour précharger le code de chaque page
        manifest: true,
        // Jamais de fichier en data: (polices…) : la CSP n'autorise que 'self'
        assetsInlineLimit: 0,
    },
    preview: {
        headers: securityHeaders,
    },
})
