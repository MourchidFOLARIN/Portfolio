import { AnimatePresence, LayoutGroup, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CtaBlock from '../components/home/CtaBlock.jsx'
import { useOverlays } from '../components/overlays/Overlays.jsx'
import ProjectCard from '../components/projects/ProjectCard.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import { projectById, projectFilters, projects } from '../data/projects.js'

const EASE = [0.16, 1, 0.3, 1]
const count = (filter) => (filter === 'all' ? projects.length : projects.filter((p) => p.filters.includes(filter)).length)

export default function Projects() {
    const [filter, setFilter] = useState('all')
    const { hash } = useLocation()
    const { openProject } = useOverlays()

    // /projets#kernel ouvre directement la fiche de Kernel
    useEffect(() => {
        const id = decodeURIComponent(hash.slice(1))
        if (projectById[id]) openProject(id)
    }, [hash, openProject])

    const visible = filter === 'all' ? projects : projects.filter((project) => project.filters.includes(filter))

    return (
        <>
            <PageHeader
                path="projets"
                title={
                    <>
                        Quinze projets, <span className="accent">une même exigence</span>.
                    </>
                }
                lead="Backend, sécurité des API, pentest, IA et systèmes embarqués. Chaque projet répond à un problème concret : ouvrez une fiche pour voir l'architecture et les mesures de sécurité."
                emblem={{ icon: 'layers', chips: ['15 projets', '5 en cybersécurité', '4 démos en ligne'] }}
            />

            <section className="section section--flush-top" aria-label="Liste des projets">
                <div className="container">
                    {/* La pastille blanche glisse d'un filtre à l'autre */}
                    <LayoutGroup id="filters">
                        <motion.div
                            className="filters"
                            role="group"
                            aria-label="Filtrer les projets"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
                        >
                            {projectFilters.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className="filter"
                                    aria-pressed={filter === item.id}
                                    onClick={() => setFilter(item.id)}
                                >
                                    {filter === item.id && (
                                        <motion.span
                                            className="filter__bg"
                                            layoutId="filter-bg"
                                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                                        />
                                    )}
                                    {item.label}
                                    <span className="filter__count">{count(item.id)}</span>
                                </button>
                            ))}
                        </motion.div>
                    </LayoutGroup>

                    {/* Cartes : apparition en cascade, puis réorganisation fluide quand on filtre */}
                    <div className="pgrid">
                        <AnimatePresence mode="popLayout">
                            {visible.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0, y: 28 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
                                    transition={{
                                        duration: 0.6,
                                        ease: EASE,
                                        delay: Math.min(index, 8) * 0.06,
                                        layout: { duration: 0.45, ease: EASE },
                                    }}
                                >
                                    <ProjectCard project={project} headingLevel={2} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </section>

            <CtaBlock
                title={
                    <>
                        Un projet à <span className="accent">construire</span> ou à sécuriser ?
                    </>
                }
            />
        </>
    )
}
