import { Link } from 'react-router-dom'
import { cx } from '../../lib/cx.js'
import Icon from './Icon.jsx'

// Bouton pilule. `to` = lien interne, `href` = lien externe, sinon <button>.
// `icon` s'affiche dans la pastille ronde à droite, `lead` avant le texte.
export default function Button({
    to,
    href,
    variant = 'ghost',
    size,
    icon,
    lead,
    className,
    children,
    type = 'button',
    ...rest
}) {
    const classes = cx('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', className)
    const content = (
        <>
            {lead && <Icon name={lead} size={size === 'sm' ? 'sm' : undefined} />}
            {children}
            {icon && (
                <span className="btn__icon">
                    <Icon name={icon} size={size === 'sm' ? 'sm' : undefined} />
                </span>
            )}
        </>
    )

    if (to) {
        return (
            <Link to={to} className={classes} {...rest}>
                {content}
            </Link>
        )
    }
    if (href) {
        const external = /^https?:/.test(href)
        return (
            <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...rest}>
                {content}
            </a>
        )
    }
    return (
        <button type={type} className={classes} {...rest}>
            {content}
        </button>
    )
}

export function IconLink({ href, label, icon, className }) {
    return (
        <a className={cx('icon-btn', className)} href={href} target="_blank" rel="noopener" aria-label={label}>
            <Icon name={icon} />
        </a>
    )
}
