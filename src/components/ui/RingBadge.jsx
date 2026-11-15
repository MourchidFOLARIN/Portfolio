import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// Pastille tournante « DISPONIBLE • FREELANCE • STAGES » qui mène au contact
export default function RingBadge({ className = '', id = 'ring-path' }) {
    return (
        <Link className={`ring-badge ${className}`} to="/contact" aria-label="Disponible pour du freelance et des stages : me contacter">
            <svg className="ring-badge__text" viewBox="0 0 100 100" aria-hidden="true">
                <defs>
                    <path id={id} d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
                </defs>
                <text>
                    <textPath href={`#${id}`} textLength="230" lengthAdjust="spacing">
                        DISPONIBLE • FREELANCE • STAGES •
                    </textPath>
                </text>
            </svg>
            <span className="ring-badge__core">
                <Icon name="arrow-up-right" />
            </span>
        </Link>
    )
}
