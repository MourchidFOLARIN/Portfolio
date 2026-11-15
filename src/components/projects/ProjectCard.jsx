import { useOverlays } from '../overlays/Overlays.jsx'
import Button, { IconLink } from '../ui/Button.jsx'
import { Tags } from '../ui/Section.jsx'
import ProjectCover from './ProjectCover.jsx'

export default function ProjectCard({ project, headingLevel = 3 }) {
    const { openProject } = useOverlays()
    const [name] = project.title.split(' — ')
    const Heading = `h${headingLevel}`

    return (
        <article className="pcard" id={project.id}>
            <div className="pcard__media">
                <ProjectCover project={project} />
            </div>
            <div className="pcard__body">
                <p className="pcard__cat">{project.category}</p>
                <Heading className="pcard__title">{project.title}</Heading>
                <p className="pcard__text">{project.summary}</p>
                <Tags items={project.stack} />
                <div className="pcard__foot">
                    <Button size="sm" icon="arrow-right" onClick={() => openProject(project.id)}>
                        Fiche technique
                    </Button>
                    <div className="pcard__links">
                        {project.url && <IconLink href={project.url} icon="globe" label={`${name} en ligne`} />}
                        {project.github && <IconLink href={project.github} icon="github" label={`Code source de ${name}`} />}
                    </div>
                </div>
            </div>
        </article>
    )
}
