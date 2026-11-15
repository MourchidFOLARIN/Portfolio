import { useEffect, useRef } from 'react'
import { useLenis } from '../layout/SmoothScroll.jsx'

// Plusieurs fenêtres peuvent s'enchaîner : on compte les verrous de défilement
let locks = 0

function lockScroll(lenis) {
    locks += 1
    document.documentElement.classList.add('has-dialog')
    lenis?.stop()
}

function unlockScroll(lenis) {
    locks = Math.max(0, locks - 1)
    if (locks === 0) {
        document.documentElement.classList.remove('has-dialog')
        lenis?.start()
    }
}

// Fenêtre modale native (<dialog>) : focus piégé, Échap et fond gérés par le navigateur
export default function Dialog({ open, onClose, className, labelledBy, label, children }) {
    const ref = useRef(null)
    const lenis = useLenis()

    useEffect(() => {
        const dialog = ref.current
        if (!open || !dialog) return
        if (!dialog.open) dialog.showModal()
        lockScroll(lenis)
        return () => {
            if (dialog.open) dialog.close()
            unlockScroll(lenis)
        }
    }, [open, lenis])

    return (
        <dialog
            ref={ref}
            className={className}
            aria-labelledby={labelledBy}
            aria-label={label}
            onClose={onClose}
            onClick={(event) => {
                // un clic sur le fond (hors du contenu) ferme la fenêtre
                if (event.target === ref.current) onClose()
            }}
            data-lenis-prevent
        >
            {children}
        </dialog>
    )
}
