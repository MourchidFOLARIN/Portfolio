import { motion } from 'motion/react'
import CtaBlock from '../components/home/CtaBlock.jsx'
import Card from '../components/ui/Card.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal, { RevealGroup, revealItem } from '../components/ui/Reveal.jsx'
import { Tags } from '../components/ui/Section.jsx'
import { domains, learning } from '../data/skills.js'

// Trait émeraude qui se dessine au-dessus de chaque domaine
function DomainLine() {
    return (
        <motion.span
            className="domain__line"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden="true"
        />
    )
}

function DomainHead({ num, title, intro, id }) {
    return (
        <Reveal className="domain__head">
            <span className="domain__num" aria-hidden="true">
                {num}
            </span>
            <h2 className="domain__title" id={id}>
                {title}
            </h2>
            <p className="domain__intro">{intro}</p>
        </Reveal>
    )
}

export default function Skills() {
    return (
        <>
            <PageHeader
                path="competences"
                title={
                    <>
                        Ce que je maîtrise, <span className="accent">ce que j'apprends</span>.
                    </>
                }
                lead="Chaque compétence ci-dessous a été pratiquée sur des projets réels, en compétition CTF ou en environnement de test."
                emblem={{ icon: 'code', chips: ['Laravel · PHP', 'OWASP Top 10', 'Wireshark'] }}
            />

            {domains.map((domain, index) => (
                <section className="domain" id={domain.id} key={domain.id} aria-labelledby={`domain-${domain.id}`}>
                    <DomainLine />
                    <div className="container">
                        <DomainHead
                            num={String(index + 1).padStart(2, '0')}
                            title={domain.title}
                            intro={domain.intro}
                            id={`domain-${domain.id}`}
                        />
                        <RevealGroup className={domain.cards.length > 2 ? 'grid-4' : 'grid-2'}>
                            {domain.cards.map((card) => (
                                <Card key={card.title} variants={revealItem} className="skill-card">
                                    <h3>{card.title}</h3>
                                    {card.items ? (
                                        <ul className="checklist">
                                            {card.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <>
                                            <p>{card.text}</p>
                                            <Tags items={card.tags} />
                                        </>
                                    )}
                                </Card>
                            ))}
                        </RevealGroup>
                    </div>
                </section>
            ))}

            <section className="domain" aria-labelledby="learning-title">
                <DomainLine />
                <div className="container">
                    <DomainHead num="05" title="En cours d'apprentissage" intro="Les briques que j'étudie en ce moment." id="learning-title" />
                    <RevealGroup as="ul" className="learning">
                        {learning.map((item) => (
                            <motion.li key={item.title} variants={revealItem}>
                                <span className="learning__state">en cours</span>
                                <strong>{item.title}</strong>
                                <span>{item.text}</span>
                            </motion.li>
                        ))}
                    </RevealGroup>
                </div>
            </section>

            <CtaBlock />
        </>
    )
}
