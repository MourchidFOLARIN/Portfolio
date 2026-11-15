import { projectById } from '../../data/projects.js'
import ProjectCover from '../projects/ProjectCover.jsx'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import { Tags } from '../ui/Section.jsx'
import Dialog from './Dialog.jsx'

// Fiche technique d'un projet
export default function ProjectModal({ id, onClose }) {
    const project = id ? projectById[id] : null

    return (
        <Dialog open={Boolean(project)} onClose={onClose} className="modal" labelledBy="project-title">
            {project && (
                <>
                    <button type="button" className="icon-btn modal__close" onClick={onClose} aria-label="Fermer la fiche">
                        <Icon name="x" />
                    </button>
                    <div className="modal__media">
                        <ProjectCover project={project} eager />
                    </div>
                    <div className="modal__body">
                        <span className="badge">{project.category}</span>
                        <h2 className="modal__title" id="project-title">
                            {project.title}
                        </h2>
                        <p className="modal__desc">{project.desc}</p>

                        <div className="modal__grid">
                            <div>
                                <h3>Fonctionnalités clés</h3>
                                <ul className="checklist">
                                    {project.features.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className="modal__side">
                                <p className="box box--blue">
                                    <b>Problème</b>
                                    {project.problem}
                                </p>
                                <p className="box box--green">
                                    <b>Sécurité</b>
                                    {project.security}
                                </p>
                                {project.status && (
                                    <p className="box box--warn">
                                        <b>Statut</b>
                                        {project.status}
                                    </p>
                                )}
                                <div>
                                    <h3>Technologies</h3>
                                    <Tags items={project.tech} />
                                </div>
                            </div>
                        </div>

                        <div className="modal__actions">
                            {project.url && (
                                <Button href={project.url} variant="primary" size="sm" icon="arrow-up-right">
                                    Voir le projet
                                </Button>
                            )}
                            {project.github && (
                                <Button href={project.github} variant="ghost" size="sm" lead="github">
                                    Code source
                                </Button>
                            )}
                            <span className="badge">Rôle : {project.role}</span>
                        </div>
                    </div>
                </>
            )}
        </Dialog>
    )
}
