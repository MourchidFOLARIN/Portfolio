import { AnimatePresence, MotionConfig, PresenceContext, motion } from 'motion/react'
import { Suspense, lazy } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import SmoothScroll, { scrollToTop, useLenis } from './components/layout/SmoothScroll.jsx'
import Overlays from './components/overlays/Overlays.jsx'
import usePageMeta from './hooks/usePageMeta.js'
import Home from './pages/Home.jsx'

// L'accueil est inclus d'emblée ; les autres pages se chargent à la demande
const About = lazy(() => import('./pages/About.jsx'))
const Skills = lazy(() => import('./pages/Skills.jsx'))
const Projects = lazy(() => import('./pages/Projects.jsx'))
const Journey = lazy(() => import('./pages/Journey.jsx'))
const Awards = lazy(() => import('./pages/Awards.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

function Pages() {
    const location = useLocation()
    const lenis = useLenis()
    usePageMeta()

    // Transition douce entre les pages : fondu sortant, puis fondu entrant
    return (
        <AnimatePresence mode="wait" initial={false} onExitComplete={() => scrollToTop(lenis, true)}>
            <motion.main
                id="contenu"
                key={location.pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
            >
                {/* Les animations internes (apparition au défilement) ne dépendent pas
                    de la transition de page : elles jouent aussi au premier chargement. */}
                <PresenceContext.Provider value={null}>
                    <Suspense fallback={<div className="page-fallback" aria-busy="true" />}>
                        <Routes location={location}>
                            <Route path="/" element={<Home />} />
                            <Route path="/a-propos" element={<About />} />
                            <Route path="/competences" element={<Skills />} />
                            <Route path="/projets" element={<Projects />} />
                            <Route path="/parcours" element={<Journey />} />
                            <Route path="/distinctions" element={<Awards />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Suspense>
                </PresenceContext.Provider>
            </motion.main>
        </AnimatePresence>
    )
}

export default function App() {
    return (
        <MotionConfig reducedMotion="user">
            <SmoothScroll>
                <Overlays>
                    <a className="skip-link" href="#contenu">
                        Aller au contenu
                    </a>
                    <Navbar />
                    <Pages />
                    <Footer />
                </Overlays>
            </SmoothScroll>
        </MotionConfig>
    )
}
