import { motion } from 'motion/react'
import { awards, csctf } from '../../data/awards.js'
import Button from '../ui/Button.jsx'
import Reveal, { RevealGroup, revealItem } from '../ui/Reveal.jsx'
import { SectionHead } from '../ui/Section.jsx'

// Les résultats les plus parlants, en liste simple
const RESULTS = [
    { id: 'csctf', place: `${csctf.rank}ᵉ / 1 014`, tone: 'podium', name: csctf.name, detail: 'CTF international · top 3 %', year: '2026' },
    ...awards
        .filter((award) => ['cursor', 'technova', 'epitnet', 'nova'].includes(award.id))
        .map((award) => ({ ...award, detail: award.project })),
]

export default function Palmares() {
    return (
        <section className="section section--flush-top" id="palmares" aria-labelledby="palmares-title">
            <div className="container">
                <SectionHead
                    num="03"
                    kicker="Palmarès"
                    id="palmares-title"
                    title={
                        <>
                            Testé <span className="accent">en compétition</span>.
                        </>
                    }
                    aside="Hackathons nationaux et CTF internationaux : apprendre vite, sous pression et en équipe."
                />
                <RevealGroup as="ul" className="results">
                    {RESULTS.map((result) => (
                        <motion.li className="result" key={result.id} variants={revealItem}>
                            <span className={`place place--${result.tone}`}>{result.place}</span>
                            <span className="result__name">
                                {result.name}
                                <small>{result.detail}</small>
                            </span>
                            <span className="result__year">{result.year}</span>
                        </motion.li>
                    ))}
                </RevealGroup>
                <Reveal className="center">
                    <Button to="/distinctions" icon="arrow-right">
                        Toutes les distinctions
                    </Button>
                </Reveal>
            </div>
        </section>
    )
}
