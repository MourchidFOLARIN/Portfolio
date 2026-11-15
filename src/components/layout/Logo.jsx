import { Link } from 'react-router-dom'

export default function Logo() {
    return (
        <Link className="logo" to="/" aria-label="Mourchid FOLARIN, retour à l'accueil">
            <span className="logo__mark" aria-hidden="true">
                &gt;_
            </span>
            <span>
                M<span className="logo__dot">.</span>FOLARIN
            </span>
        </Link>
    )
}
