import Card from '../ui/Card.jsx'
import Icon from '../ui/Icon.jsx'
import { RevealGroup, revealItem } from '../ui/Reveal.jsx'
import { SectionHead, Tags } from '../ui/Section.jsx'

const AREAS = [
    {
        icon: 'shield',
        title: 'Cybersécurité & pentest web',
        text: "OWASP Top 10 : je teste et corrige les injections SQL, XSS, CSRF et IDOR. Audit d'API avec Burp Suite et Nmap, entraînement en CTF.",
        tags: ['OWASP', 'Burp Suite', 'Nmap'],
    },
    {
        icon: 'server',
        title: 'Backend & API REST',
        text: 'Serveurs modulaires sous Laravel et PHP 8 : modèle MySQL rigoureux, architecture MVC, authentification JWT.',
        tags: ['Laravel', 'PHP 8', 'MySQL'],
    },
    {
        icon: 'network',
        title: 'Réseaux & Linux',
        text: 'Administration Debian / Ubuntu en ligne de commande, analyse de trames avec Wireshark, scripts Bash, SSH.',
        tags: ['Linux', 'Wireshark', 'TCP/IP'],
    },
    {
        icon: 'chart',
        title: 'Data & IA',
        text: 'Modèles supervisés avec Python et Scikit-Learn, appliqués à la détection de fraudes transactionnelles.',
        tags: ['Python', 'Scikit-Learn'],
    },
]

export default function Expertise() {
    return (
        <section className="section" id="expertise" aria-labelledby="expertise-title">
            <div className="container">
                <SectionHead
                    num="01"
                    kicker="Expertise"
                    id="expertise-title"
                    title={
                        <>
                            Du backend qui <span className="accent">résiste</span>.
                        </>
                    }
                    aside="Un fil rouge : écrire du code en pensant déjà à celui qui va essayer de le casser."
                />
                <RevealGroup className="grid-4">
                    {AREAS.map((area) => (
                        <Card key={area.title} variants={revealItem} className="area">
                            <span className="icon-box">
                                <Icon name={area.icon} />
                            </span>
                            <h3 className="card__title">{area.title}</h3>
                            <p className="card__text">{area.text}</p>
                            <Tags items={area.tags} />
                        </Card>
                    ))}
                </RevealGroup>
            </div>
        </section>
    )
}
