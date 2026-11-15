import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { metaFor } from '../lib/seo.js'

function setMeta(selector, attribute, value) {
    const element = document.head.querySelector(selector)
    if (element && value) element.setAttribute(attribute, value)
}

// Met à jour le titre et les balises de partage lors d'une navigation interne.
// (Le premier affichage les reçoit déjà du HTML pré-rendu.)
export default function usePageMeta() {
    const { pathname } = useLocation()

    useEffect(() => {
        const meta = metaFor(pathname)
        document.title = meta.title
        setMeta('meta[name="description"]', 'content', meta.description)
        setMeta('meta[property="og:title"]', 'content', meta.ogTitle)
        setMeta('meta[property="og:description"]', 'content', meta.ogDescription)
        setMeta('meta[name="twitter:title"]', 'content', meta.ogTitle)
        setMeta('meta[name="twitter:description"]', 'content', meta.ogDescription)
        if (meta.canonical) {
            setMeta('link[rel="canonical"]', 'href', meta.canonical)
            setMeta('meta[property="og:url"]', 'content', meta.canonical)
        }
    }, [pathname])
}
