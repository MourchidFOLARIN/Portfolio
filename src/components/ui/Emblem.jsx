import Icon from './Icon.jsx'

// Emblème animé des en-têtes de page : orbite, disque émeraude, icône et badges
export default function Emblem({ icon, chips = [] }) {
    return (
        <div className="emblem" aria-hidden="true">
            <div className="orbit emblem__orbit" />
            <div className="emblem__ring" />
            <div className="emblem__disc">
                <Icon name={icon} />
            </div>
            {chips.map((chip, index) => (
                <span
                    key={chip}
                    className={`chip-float emblem__chip emblem__chip--${index + 1} ${index === 1 ? 'chip-float--blue' : ''}`}
                    style={{ '--d': `${0.7 + index * 0.15}s` }}
                >
                    {chip}
                </span>
            ))}
        </div>
    )
}
