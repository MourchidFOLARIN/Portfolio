// Pages pré-rendues au build (scripts/prerender.mjs).
// `source` sert à précharger le code de la page dans son HTML.
export const routes = [
    { path: '/', file: 'index.html', source: 'src/pages/Home.jsx' },
    { path: '/a-propos', file: 'a-propos.html', source: 'src/pages/About.jsx' },
    { path: '/competences', file: 'competences.html', source: 'src/pages/Skills.jsx' },
    { path: '/projets', file: 'projets.html', source: 'src/pages/Projects.jsx' },
    { path: '/parcours', file: 'parcours.html', source: 'src/pages/Journey.jsx' },
    { path: '/distinctions', file: 'distinctions.html', source: 'src/pages/Awards.jsx' },
    { path: '/contact', file: 'contact.html', source: 'src/pages/Contact.jsx' },
    { path: '/404', file: '404.html', source: 'src/pages/NotFound.jsx' },
]
