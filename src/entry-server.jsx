// Rendu côté serveur, utilisé uniquement au build par scripts/prerender.mjs
// pour écrire une page HTML complète par route (SEO et aperçus de liens).
import { StrictMode } from 'react'
import { prerenderToNodeStream } from 'react-dom/static'
import { StaticRouter } from 'react-router-dom'
import App from './App.jsx'

export { routes } from './data/routes.js'
export { headHtml } from './lib/seo.js'

export async function render(url) {
    const { prelude } = await prerenderToNodeStream(
        <StrictMode>
            <StaticRouter location={url}>
                <App />
            </StaticRouter>
        </StrictMode>,
        // Page entière d'un seul tenant : sinon React découpe les gros blocs et
        // les révèle avec des <script> inline, que la CSP du site interdit.
        { progressiveChunkSize: Number.POSITIVE_INFINITY },
    )
    const chunks = []
    for await (const chunk of prelude) chunks.push(Buffer.from(chunk))
    return Buffer.concat(chunks).toString('utf8')
}
