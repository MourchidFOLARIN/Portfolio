import { motion, useScroll, useSpring } from 'motion/react'
import { cx } from '../../lib/cx.js'

// Ligne verticale qui se remplit au fil du défilement d'un bloc (frise, chapitres)
export default function ScrollLine({ target, className }) {
    const { scrollYProgress } = useScroll({ target, offset: ['start 75%', 'end 60%'] })
    const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })
    return <motion.span className={cx('scroll-line', className)} style={{ scaleY }} aria-hidden="true" />
}
