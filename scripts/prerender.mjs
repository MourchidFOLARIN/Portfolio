// Pré-rendu : après `vite build`, écrit une page HTML complète par route
// (contenu + titre + balises de partage). Google, LinkedIn ou WhatsApp lisent
// ainsi le vrai contenu ; React « hydrate » ensuite la page dans le navigateur.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = `${root}dist`
const template = readFileSync(`${dist}/index.html`, 'utf8')
const manifest = JSON.parse(readFileSync(`${dist}/.vite/manifest.json`, 'utf8'))

// Fichiers JS d'une page (et de ses dépendances) à précharger
function preloadsFor(source) {
    const seen = new Set()
    const walk = (key) => {
        const chunk = manifest[key]
        if (!chunk || seen.has(chunk.file)) return
        seen.add(chunk.file)
        for (const dep of chunk.imports || []) walk(dep)
    }
    walk(source)
    return [...seen].map((file) => `<link rel="modulepreload" crossorigin href="/${file}">`)
}

// Charge l'application telle que le serveur la rendrait
const vite = await createServer({
    root,
    logLevel: 'error',
    appType: 'custom',
    server: { middlewareMode: true, hmr: false, watch: null },
})

try {
    const { render, routes, headHtml } = await vite.ssrLoadModule('/src/entry-server.jsx')

    // Premier passage « à blanc » : il charge les pages chargées à la demande (lazy).
    // Au second passage plus rien n'est en attente, et React n'a pas besoin
    // d'ajouter de <script> inline au HTML (interdit par la CSP du site).
    for (const route of routes) await render(route.path)

    for (const route of routes) {
        const appHtml = await render(route.path)
        if (/<script(?![^>]*application\/ld\+json)/i.test(appHtml)) {
            throw new Error(`Script inline inattendu dans ${route.path} : la CSP le bloquerait`)
        }
        const head = [headHtml(route.path), ...(route.path === '/' ? [] : preloadsFor(route.source))].join('\n    ')
        const html = template
            .replace(/<title>[\s\S]*?<\/title>\s*<!--app-head-->/, head)
            .replace('<!--app-html-->', appHtml)
        if (!html.includes(appHtml.slice(0, 40))) throw new Error(`Injection impossible pour ${route.path}`)
        writeFileSync(`${dist}/${route.file}`, html)
        console.log(`  ✓ ${route.path.padEnd(14)} → dist/${route.file} (${(html.length / 1024).toFixed(1)} Ko)`)
    }
} finally {
    await vite.close()
}

// Le manifeste ne sert qu'au pré-rendu : inutile de le publier
rmSync(`${dist}/.vite`, { recursive: true, force: true })
