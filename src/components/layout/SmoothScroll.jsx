import Lenis from 'lenis'
import { createContext, useContext, useEffect, useState } from 'react'

const LenisContext = createContext(null)

// Défilement fluide (Lenis). Désactivé si le visiteur préfère réduire les animations.
export default function SmoothScroll({ children }) {
    const [lenis, setLenis] = useState(null)

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
        const instance = new Lenis({ autoRaf: true, lerp: 0.11, anchors: { offset: -100 } })
        setLenis(instance)
        return () => {
            instance.destroy()
            setLenis(null)
        }
    }, [])

    return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

export const useLenis = () => useContext(LenisContext)

// Remonte en haut de page, avec ou sans Lenis
export function scrollToTop(lenis, immediate = false) {
    if (lenis) lenis.scrollTo(0, { immediate })
    else window.scrollTo({ top: 0, behavior: immediate ? 'instant' : 'smooth' })
}
