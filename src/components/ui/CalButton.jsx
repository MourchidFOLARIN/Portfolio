import { useEffect } from 'react'
import { cal } from '../../data/site.js'
import { loadCal } from '../../lib/cal.js'
import Button from './Button.jsx'

// Ouvre l'agenda Cal.com dans une fenêtre intégrée (gérée par embed.js de Cal).
// Si l'intégration n'a pas pu se charger (bloqueur, hors ligne), on ouvre cal.com.
export default function CalButton({ children = 'Réserver un appel', ...rest }) {
    useEffect(() => {
        loadCal()
    }, [])

    const fallback = () => {
        if (!window.customElements?.get('cal-modal-box')) {
            window.open(cal.url, '_blank', 'noopener')
        }
    }

    return (
        <Button
            data-cal-link={cal.link}
            data-cal-namespace={cal.namespace}
            data-cal-config='{"layout":"month_view"}'
            onClick={fallback}
            {...rest}
        >
            {children}
        </Button>
    )
}
