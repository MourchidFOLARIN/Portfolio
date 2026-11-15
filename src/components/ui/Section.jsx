import Reveal from './Reveal.jsx'

// Petit sur-titre : « 01 —— EXPERTISE »
export function Kicker({ num, children, className = '' }) {
    return (
        <p className={`kicker ${className}`}>
            {num && <span className="kicker__num">{num}</span>}
            {num && <span className="kicker__line" aria-hidden="true" />}
            {children}
        </p>
    )
}

// En-tête de section : sur-titre + grand titre à gauche, texte d'appui à droite
export function SectionHead({ num, kicker, title, id, aside }) {
    return (
        <Reveal className="section-head">
            <div>
                <Kicker num={num}>{kicker}</Kicker>
                <h2 className="title" id={id}>
                    {title}
                </h2>
            </div>
            {aside && <p className="section-head__aside">{aside}</p>}
        </Reveal>
    )
}

export function Tags({ items, className = '' }) {
    return (
        <div className={`tags ${className}`}>
            {items.map((item) => (
                <span className="tag" key={item}>
                    {item}
                </span>
            ))}
        </div>
    )
}
