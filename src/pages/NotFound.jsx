import Button from '../components/ui/Button.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'

export default function NotFound() {
    return (
        <div className="not-found">
            <PageHeader
                path="404"
                title={
                    <>
                        Cette page <span className="accent">n'existe pas</span>.
                    </>
                }
                lead="Elle a peut-être été déplacée. Revenez à l'accueil ou parcourez les projets."
                emblem={{ icon: 'search', chips: ['Erreur 404', 'Accès refusé'] }}
            />
            <div className="container hero__actions hero-fade" style={{ '--d': '0.35s' }}>
                <Button to="/" variant="primary" icon="arrow-right">
                    Retour à l'accueil
                </Button>
                <Button to="/projets">Voir les projets</Button>
            </div>
        </div>
    )
}
