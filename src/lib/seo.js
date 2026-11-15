import { OG_IMAGE, seo } from '../data/seo.js'
import { SITE_URL } from '../data/site.js'

const PAGES = Object.keys(seo)

// Métadonnées complètes d'une page (valeurs par défaut comprises)
export function metaFor(pathname) {
    const path = PAGES.includes(pathname) ? pathname : '/404'
    const page = seo[path]
    return {
        ...page,
        path,
        canonical: path === '/404' ? null : `${SITE_URL}${path === '/' ? '/' : path}`,
        ogTitle: page.ogTitle || page.title,
        ogDescription: page.ogDescription || page.description,
        image: page.image || OG_IMAGE,
    }
}

const escapeAttr = (value) =>
    String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Balises <head> écrites dans le HTML pré-rendu (lu par Google, LinkedIn, WhatsApp…)
export function headHtml(pathname) {
    const m = metaFor(pathname)
    const tags = [
        `<title>${escapeAttr(m.title)}</title>`,
        `<meta name="description" content="${escapeAttr(m.description)}">`,
        m.keywords && `<meta name="keywords" content="${escapeAttr(m.keywords)}">`,
        `<meta name="author" content="Mourchid FOLARIN">`,
        `<meta name="robots" content="${m.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}">`,
        m.canonical && `<link rel="canonical" href="${m.canonical}">`,
        `<meta property="og:site_name" content="Mourchid FOLARIN">`,
        `<meta property="og:locale" content="fr_FR">`,
        `<meta property="og:type" content="website">`,
        m.canonical && `<meta property="og:url" content="${m.canonical}">`,
        `<meta property="og:title" content="${escapeAttr(m.ogTitle)}">`,
        `<meta property="og:description" content="${escapeAttr(m.ogDescription)}">`,
        `<meta property="og:image" content="${m.image}">`,
        `<meta property="og:image:width" content="1200">`,
        `<meta property="og:image:height" content="630">`,
        `<meta property="og:image:alt" content="Mourchid FOLARIN, Développeur Backend &amp; Cybersécurité">`,
        `<meta name="twitter:card" content="summary_large_image">`,
        `<meta name="twitter:title" content="${escapeAttr(m.ogTitle)}">`,
        `<meta name="twitter:description" content="${escapeAttr(m.ogDescription)}">`,
        `<meta name="twitter:image" content="${m.image}">`,
        // « < » échappé : le JSON ne peut pas fermer la balise <script>
        m.jsonLd &&
            `<script type="application/ld+json">${JSON.stringify(m.jsonLd).replace(/</g, '\\u003c')}</script>`,
    ]
    return tags.filter(Boolean).join('\n    ')
}
