import { motion } from 'motion/react'
import { cx } from '../../lib/cx.js'

// Halo émeraude qui suit le pointeur (variables CSS --mx / --my)
function track(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

// Carte ; accepte les props de Motion (ex. variants pour l'apparition)
export default function Card({ as = 'article', className, children, ...rest }) {
    const Component = motion[as]
    return (
        <Component className={cx('card', className)} onPointerMove={track} {...rest}>
            {children}
        </Component>
    )
}
