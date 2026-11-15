import { useRef } from 'react'
import { Link } from 'react-router-dom'
import CtaBlock from '../components/home/CtaBlock.jsx'
import Card from '../components/ui/Card.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal, { RevealGroup, revealItem } from '../components/ui/Reveal.jsx'
import ScrollLine from '../components/ui/ScrollLine.jsx'
import { SectionHead } from '../components/ui/Section.jsx'
import { roles, techlab, timeline } from '../data/journey.js'

export default function Journey() {
    const timelineRef = useRef(null)

    return (
        <>
            <PageHeader
                path="parcours"
                title={
                    <>
                        De Kpondéhou <span className="accent">à l'INSTI</span>.
                    </>
                }
                lead="Un parcours construit par la formation, le leadership étudiant, les compétitions et la création d'Excellence Team."
                emblem={{ icon: 'graduation', chips: ['Bac F3 · mention TB', 'L3 · INSTI', 'DG · Excellence Team'] }}
            />

            <section className="section section--flush-top" aria-label="Chronologie">
                <div className="container">
                    {/* La ligne de la frise se remplit à mesure qu'on descend */}
                    <div className="timeline" ref={timelineRef}>
                        <ScrollLine target={timelineRef} className="timeline__progress" />
                        {timeline.map((step) => (
                            <Reveal key={step.title} className={`tl-item ${step.now ? 'tl-item--now' : ''}`}>
                                <article className="tl-card">
                                    <p className="tl-card__meta">
                                        <span>{step.period}</span>
                                        <span className="badge">{step.tag}</span>
                                    </p>
                                    <h2 className="tl-card__title">{step.title}</h2>
                                    <p className="tl-card__org">{step.org}</p>
                                    <p>{step.text}</p>
                                    {step.note && <p className="tl-card__note">{step.note}</p>}
                                    {step.link && (
                                        <Link className="link-arrow tl-card__link" to={step.link.to}>
                                            {step.link.label}
                                            <Icon name="arrow-right" />
                                        </Link>
                                    )}
                                </article>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section--flush-top" aria-labelledby="roles-title">
                <div className="container">
                    <SectionHead
                        num="//"
                        kicker="Engagement"
                        id="roles-title"
                        title={
                            <>
                                Leadership <span className="accent">&amp; responsabilités</span>.
                            </>
                        }
                    />
                    <RevealGroup className="grid-2">
                        {roles.map((role) => (
                            <Card key={role.title} variants={revealItem} className="role">
                                <p className="role__kicker">{role.kicker}</p>
                                <h3>{role.title}</h3>
                                <p className="role__org">{role.org}</p>
                                <p>{role.text}</p>
                            </Card>
                        ))}
                        <Card variants={revealItem} className="role">
                            <p className="role__kicker">Transmission</p>
                            <h3>{techlab.title}</h3>
                            <p className="role__org">{techlab.org}</p>
                            <p>{techlab.text}</p>
                        </Card>
                    </RevealGroup>
                </div>
            </section>

            <CtaBlock secondary={{ to: '/distinctions', label: 'Voir les distinctions' }} />
        </>
    )
}
