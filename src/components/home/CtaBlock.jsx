import Button from '../ui/Button.jsx'
import CalButton from '../ui/CalButton.jsx'
import Reveal from '../ui/Reveal.jsx'
import RingBadge from '../ui/RingBadge.jsx'

// Appel à l'action final, réutilisé en bas de plusieurs pages
export default function CtaBlock({
    title = (
        <>
            Un projet, un audit ? <span className="accent">Parlons-en.</span>
        </>
    ),
    text = 'Architecture backend Laravel, audit de vos API, stage ou mission freelance : échangeons directement. Réponse sous 24 h ouvrées.',
    secondary = { to: '/contact', label: 'Écrire un message' },
}) {
    return (
        <section className="section section--flush-top" aria-labelledby="cta-title">
            <div className="container">
                <Reveal className="cta">
                    <div className="orbit cta__orbit" aria-hidden="true" />
                    <RingBadge className="cta__ring" id="ring-cta" />
                    <h2 className="cta__title" id="cta-title">
                        {title}
                    </h2>
                    <p className="lead cta__text">{text}</p>
                    <div className="cta__actions">
                        <CalButton variant="primary" icon="calendar">
                            Réserver un créneau
                        </CalButton>
                        {secondary && <Button to={secondary.to}>{secondary.label}</Button>}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
