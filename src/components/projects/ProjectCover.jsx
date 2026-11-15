import { cx } from '../../lib/cx.js'
import Icon from '../ui/Icon.jsx'

// Visuel d'un projet : sa capture d'écran, ou une couverture générée
export default function ProjectCover({ project, sizes, eager = false }) {
    if (project.image) {
        return (
            <img
                src={project.image}
                alt={`Aperçu de ${project.title.split(' — ')[0]}`}
                width="1000"
                height="625"
                loading={eager ? 'eager' : 'lazy'}
                decoding="async"
                sizes={sizes}
                style={project.imageFit === 'contain' ? { objectFit: 'contain', background: '#000' } : undefined}
            />
        )
    }
    const { icon, tone, label } = project.cover
    return (
        <div className={cx('cover', tone === 'blue' && 'cover--blue')} role="img" aria-label={`Illustration de ${project.title}`}>
            <Icon name={icon} />
            <span className="cover__label">{label}</span>
        </div>
    )
}
