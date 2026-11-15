import { featured, projectById } from '../../data/projects.js'
import ProjectCard from '../projects/ProjectCard.jsx'
import Button from '../ui/Button.jsx'
import Reveal from '../ui/Reveal.jsx'
import { SectionHead } from '../ui/Section.jsx'

export default function FeaturedProjects() {
    return (
        <section className="section section--flush-top" id="projets" aria-labelledby="projets-title">
            <div className="container">
                <SectionHead
                    num="02"
                    kicker="Projets"
                    id="projets-title"
                    title={
                        <>
                            Des projets <span className="accent">éprouvés</span>.
                        </>
                    }
                    aside="Quatre de mes quinze projets, chacun avec une mesure de sécurité pensée dès la conception."
                />
                <div className="pgrid pgrid--2">
                    {featured.map((id, index) => (
                        <Reveal key={id} delay={(index % 2) * 0.1}>
                            <ProjectCard project={projectById[id]} />
                        </Reveal>
                    ))}
                </div>
                <Reveal className="center">
                    <Button to="/projets" icon="arrow-right">
                        Voir les 15 projets
                    </Button>
                </Reveal>
            </div>
        </section>
    )
}
