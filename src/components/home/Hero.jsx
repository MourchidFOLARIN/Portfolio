import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import Button from '../ui/Button.jsx'
import Counter from '../ui/Counter.jsx'
import RingBadge from '../ui/RingBadge.jsx'

const STATS = [
    { value: 27, suffix: 'ᵉ', label: 'sur 1 014 équipes', sub: 'CSCTF 2026, top 3 %' },
    { value: 15, label: 'projets documentés', sub: 'backend, sécurité, IoT, IA' },
    { value: 9, label: 'compétitions', sub: 'dont 4 podiums' },
    { text: 'L3', label: 'Informatique & Télécoms', sub: 'INSTI Lokossa' },
]

// Badges qui flottent autour du portrait (position et délai d'apparition)
const CHIPS = [
    { label: 'Laravel · PHP 8', className: 'chip-float--1', delay: '1s' },
    { label: 'OWASP Top 10', className: 'chip-float--2', delay: '1.15s', blue: true },
    { label: 'Linux · Réseaux', className: 'chip-float--3', delay: '1.3s' },
]

export default function Hero() {
    const ref = useRef(null)
    // Profondeur au défilement : chaque couche bouge à sa propre vitesse
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const portraitY = useTransform(scrollYProgress, [0, 1], [0, 70])
    const discScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
    const chipsY = useTransform(scrollYProgress, [0, 1], [0, -50])

    return (
        <section className="hero" ref={ref} aria-labelledby="hero-title">
            <div className="container hero__grid">
                <div className="hero__copy">
                    <p className="status hero-fade">
                        <span className="dot" aria-hidden="true" />
                        Disponible pour du freelance &amp; des stages
                    </p>
                    <h1 className="hero__name" id="hero-title">
                        <span className="line">
                            <span>Mourchid</span>
                        </span>
                        <span className="line">
                            <span>
                                FOLARIN
                                <span className="caret" aria-hidden="true" />
                            </span>
                        </span>
                        <span className="sr-only">, développeur backend orienté cybersécurité et réseaux</span>
                    </h1>
                    <p className="lead hero__lead hero-fade" style={{ '--d': '0.25s' }}>
                        <strong>Développeur backend orienté cybersécurité.</strong> Je conçois des API Laravel robustes et je
                        teste leurs failles comme le ferait un attaquant. Étudiant en L3 à l'INSTI Lokossa, au Bénin.
                    </p>
                    <div className="hero__actions hero-fade" style={{ '--d': '0.35s' }}>
                        <Button to="/projets" variant="primary" icon="arrow-right">
                            Voir mes projets
                        </Button>
                        <Button to="/contact">Me contacter</Button>
                    </div>
                    <div className="hero__proof hero-fade" style={{ '--d': '0.45s' }}>
                        <span className="rank-bars" aria-hidden="true" />
                        <p>
                            <strong>Top 3 % au CSCTF 2026</strong>
                            27ᵉ sur 1 014 équipes, CTF international
                        </p>
                    </div>
                </div>

                <div className="hero__visual">
                    <div className="orbit hero__orbit" aria-hidden="true" />
                    <motion.div className="hero__disc" style={{ scale: discScale }} aria-hidden="true" />
                    <motion.img
                        className="hero__portrait"
                        src="/assets/img/mourchid-hero.webp?v=4"
                        alt="Mourchid FOLARIN"
                        width="800"
                        height="800"
                        fetchPriority="high"
                        style={{ y: portraitY }}
                    />
                    <motion.div className="hero__chips" style={{ y: chipsY }} aria-hidden="true">
                        {CHIPS.map((chip) => (
                            <span
                                key={chip.label}
                                className={`chip-float ${chip.className} ${chip.blue ? 'chip-float--blue' : ''}`}
                                style={{ '--d': chip.delay }}
                            >
                                {chip.label}
                            </span>
                        ))}
                    </motion.div>
                    <RingBadge id="ring-hero" className="hero__ring" />
                </div>
            </div>

            <div className="stats">
                <dl className="container stats__grid">
                    {STATS.map((stat, index) => (
                        <div className="stat hero-fade" key={stat.label} style={{ '--d': `${0.5 + index * 0.07}s` }}>
                            <dt className="stat__label">{stat.label}</dt>
                            <dd className="stat__value">
                                {stat.text ?? <Counter to={stat.value} />}
                                {stat.suffix}
                            </dd>
                            <dd className="stat__sub">{stat.sub}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    )
}
