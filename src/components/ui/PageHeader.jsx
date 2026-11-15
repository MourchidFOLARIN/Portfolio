import Emblem from './Emblem.jsx'

// En-tête des pages internes : chemin façon terminal, titre qui monte,
// chapeau, et emblème animé à droite.
// Les entrées sont en CSS : visibles dès le premier affichage, sans attendre le JavaScript.
export default function PageHeader({ path, title, lead, emblem }) {
    return (
        <header className="page-head">
            <div className="container page-head__grid">
                <div>
                    <p className="path hero-fade">
                        <span className="path__user">mourchid@portfolio</span>:~/{path}$
                        <span className="caret caret--sm" aria-hidden="true" />
                    </p>
                    <h1 className="page-title">
                        <span className="line">
                            <span>{title}</span>
                        </span>
                    </h1>
                    <p className="lead page-head__lead hero-fade" style={{ '--d': '0.25s' }}>
                        {lead}
                    </p>
                </div>
                {emblem && <Emblem {...emblem} />}
            </div>
        </header>
    )
}
