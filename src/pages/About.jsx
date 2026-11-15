import { useRef } from 'react'
import Button from '../components/ui/Button.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal from '../components/ui/Reveal.jsx'
import ScrollLine from '../components/ui/ScrollLine.jsx'

function Chapter({ num, title, children }) {
    return (
        <Reveal as="article" className="chapter">
            <p className="chapter__num">{num}</p>
            <h2>{title}</h2>
            {children}
        </Reveal>
    )
}

export default function About() {
    const chaptersRef = useRef(null)

    return (
        <>
            <PageHeader
                path="a-propos"
                title={
                    <>
                        Comprendre la machine <span className="accent">pour la protéger</span>.
                    </>
                }
                lead={
                    <>
                        Je suis <strong>Mourchid FOLARIN</strong>, étudiant en Licence 3 Informatique &amp; Télécommunications
                        à l'INSTI Lokossa, entre développement backend, cybersécurité et réseaux.
                    </>
                }
                emblem={{ icon: 'shield', chips: ['Bac F3 · 16,7/20', 'OWASP Top 10', 'INSTI Lokossa'] }}
            />

            <section className="section section--flush-top" aria-label="Mon histoire">
                <div className="container prose-grid">
                    <aside className="sticky">
                        <Reveal className="profile-card">
                            <div className="profile-card__photo">
                                <img
                                    src="/assets/img/mourchid-insti.webp?v=2"
                                    alt="Mourchid FOLARIN à l'INSTI Lokossa"
                                    width="600"
                                    height="800"
                                    decoding="async"
                                />
                            </div>
                            <div className="profile-card__body">
                                <p className="profile-card__name">Mourchid FOLARIN</p>
                                <p className="profile-card__role">Backend · cybersécurité · réseaux</p>
                                <Button to="/contact" variant="primary" size="sm" icon="arrow-right">
                                    Me contacter
                                </Button>
                            </div>
                        </Reveal>
                    </aside>

                    <div className="chapters" ref={chaptersRef}>
                        <ScrollLine target={chaptersRef} />
                        <Chapter num="01" title="Une rigueur forgée dans l'électrotechnique">
                            <p>
                                J'ai débuté par un <strong>Baccalauréat F3 (électrotechnique)</strong>, obtenu avec 16,739/20,
                                mention Très Bien. Cette base m'a donné une culture rigoureuse du matériel, des signaux et de la
                                logique booléenne.
                            </p>
                            <p>
                                Aujourd'hui en L3 Informatique et Télécommunications à l'INSTI de Lokossa (UNSTIM), j'applique
                                cette rigueur au numérique : programmation système, services web et investigation réseau.
                            </p>
                        </Chapter>

                        <Chapter num="02" title="Le backend, du côté serveur">
                            <p>
                                Ce qui me passionne : modéliser la donnée, concevoir des API REST claires, gérer les transactions
                                SQL et garantir des flux métier fiables.
                            </p>
                            <p>
                                Je travaille surtout avec <strong>PHP et Laravel</strong> : architecture MVC, services, validation
                                stricte des entrées. Un bon backend ne doit pas seulement fonctionner, il doit résister aux erreurs
                                et pouvoir évoluer.
                            </p>
                        </Chapter>

                        <Chapter num="03" title="Comprendre l'attaque pour mieux protéger">
                            <p>
                                Écrire du code sans considérer la menace est une faiblesse. Je teste donc les attaques courantes
                                (injections SQL, XSS, IDOR selon l'<strong>OWASP Top 10</strong>) pour corriger les failles dès
                                la conception.
                            </p>
                            <p>
                                Côté infrastructure : Linux en ligne de commande, analyse des protocoles (TCP/IP, DNS, HTTP/S,
                                SSH) avec Wireshark et Nmap, et pentest éthique en laboratoire et en CTF.
                            </p>
                        </Chapter>

                        <Chapter num="04" title="Demain : sécuriser l'embarqué et l'IoT">
                            <p>
                                Mon bac en électrotechnique et mon expérience de formateur en robotique Arduino au TechLab de
                                Porto-Novo m'ont rendu sensible au monde physique connecté.
                            </p>
                            <p>
                                Mon objectif : faire converger backend et cybersécurité vers la sécurité des{' '}
                                <strong>systèmes embarqués et de l'IoT</strong> : communications capteurs-serveurs, intégrité du
                                firmware, environnements industriels.
                            </p>
                        </Chapter>

                        <Chapter num="05" title="Apprendre par la pratique">
                            <ul className="checklist">
                                <li>Laboratoires et CTF : tester des exploits et analyser des trames sur des machines de labo.</li>
                                <li>Hackathons : livrer une solution fonctionnelle en 48 h, en équipe.</li>
                                <li>Transmission : former des jeunes à la robotique consolide mes propres acquis.</li>
                                <li>Entrepreneuriat : co-fonder Excellence Team m'apprend la gestion de projet et les délais.</li>
                            </ul>
                        </Chapter>
                    </div>
                </div>
            </section>
        </>
    )
}
