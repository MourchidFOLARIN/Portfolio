import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'

// Nombre qui monte de 0 à `to` quand il devient visible.
// Le HTML pré-rendu contient déjà la valeur finale.
export default function Counter({ to, duration = 1.4 }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })
    const reduce = useReducedMotion()

    useEffect(() => {
        if (!inView || reduce || !ref.current) return
        const node = ref.current
        const controls = animate(0, to, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
                node.textContent = Math.round(value).toLocaleString('fr-FR')
            },
        })
        return () => controls.stop()
    }, [inView, reduce, to, duration])

    return <span ref={ref}>{to.toLocaleString('fr-FR')}</span>
}
