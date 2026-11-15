import { motion } from 'motion/react'

const EASE = [0.16, 1, 0.3, 1]

// Fait apparaître son contenu quand il entre à l'écran (une seule fois)
export default function Reveal({ as = 'div', delay = 0, y = 28, className, children, ...rest }) {
    const Component = motion[as]
    return (
        <Component
            className={className}
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -12% 0px' }}
            transition={{ duration: 0.9, ease: EASE, delay }}
            {...rest}
        >
            {children}
        </Component>
    )
}

// Variante en cascade : les enfants <Reveal.Item> apparaissent l'un après l'autre
const groupVariants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
export const revealItem = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
}

export function RevealGroup({ as = 'div', className, children, ...rest }) {
    const Component = motion[as]
    return (
        <Component
            className={className}
            variants={groupVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            {...rest}
        >
            {children}
        </Component>
    )
}

export function RevealItem({ as = 'div', className, children, ...rest }) {
    const Component = motion[as]
    return (
        <Component className={className} variants={revealItem} {...rest}>
            {children}
        </Component>
    )
}
