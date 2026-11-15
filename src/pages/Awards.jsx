import { motion } from 'motion/react'
import CtaBlock from '../components/home/CtaBlock.jsx'
import Card from '../components/ui/Card.jsx'
import Counter from '../components/ui/Counter.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal, { RevealGroup, revealItem } from '../components/ui/Reveal.jsx'
import { Tags } from '../components/ui/Section.jsx'
import { awards, csctf } from '../data/awards.js'

const EASE = [0.16, 1, 0.3, 1]

// Le CSCTF 2026 : 27ᵉ sur 1 014 équipes, matérialisé sur une barre de 1 014 traits
function Csctf() {
    const share = (csctf.rank / csctf.teams) * 100
    return (
        <Reveal as="article" className="csctf">
            <div>
                <p className="csctf__kicker">CTF international · 48 h</p>
                <p className="csctf__rank">
                    <Counter to={csctf.rank} />
                    <sup>e</sup>
                </p>
                <p className="csctf__of">
                    sur {csctf.teams.toLocaleString('fr-FR')} équipes · {csctf.players.toLocaleString('fr-FR')} joueurs · top 3 %
                </p>
            </div>
            <div>
                <h2 className="award__title">{csctf.name}</h2>
                <p className="csctf__text">
                    Avec l'équipe Granted, aux côtés de membres du Digital Innovation Club de l'INSTI. {csctf.challenges} épreuves
                    : {csctf.categories}. Organisé par{' '}
                    <a href={csctf.organizer.url} target="_blank" rel="noopener">
                        {csctf.organizer.label}
                    </a>
                    , du {csctf.date}.
                </p>
                <div className="teams" aria-hidden="true">
                    <div className="teams__bar">
                        <span className="teams__label">▼ Granted · 27ᵉ</span>
                        <motion.span
                            className="teams__you"
                            style={{ width: `${share}%`, originX: 0 }}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.1, ease: EASE, delay: 0.4 }}
                        />
                    </div>
                    <div className="teams__scale">
                        <span>1ʳᵉ</span>
                        <span>507ᵉ</span>
                        <span>1 014ᵉ</span>
                    </div>
                </div>
                <Tags items={csctf.tags} />
            </div>
        </Reveal>
    )
}

export default function Awards() {
    return (
        <>
            <PageHeader
                path="distinctions"
                title={
                    <>
                        Compétitions <span className="accent">&amp; distinctions</span>.
                    </>
                }
                lead="Hackathons et CTF : transformer une idée en solution sous contrainte de temps, en équipe, face à un jury ou à un scoreboard."
                emblem={{ icon: 'trophy', chips: ['27ᵉ / 1 014', '4 podiums', 'Top 3 % CTF'] }}
            />

            <section className="section section--flush-top" aria-label="Palmarès">
                <div className="container awards">
                    <Csctf />
                    <RevealGroup className="awards">
                        {awards.map((award) => (
                            <Card key={award.id} variants={revealItem} className="award">
                                <div className="award__side">
                                    <span className={`place place--${award.tone}`}>{award.place}</span>
                                    <span className="award__year">{award.year}</span>
                                </div>
                                <div>
                                    <h2 className="award__title">{award.name}</h2>
                                    <p className="award__project">Projet : {award.project}</p>
                                    <p>{award.text}</p>
                                    <p className="award__team">
                                        {award.team[0]} : {award.team[1]}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </RevealGroup>
                </div>
            </section>

            <CtaBlock secondary={{ to: '/projets', label: 'Voir mes projets' }} />
        </>
    )
}
