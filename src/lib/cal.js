// Chargeur officiel de l'intégration Cal.com, sorti du HTML pour ne plus
// dépendre d'un script inline. Il n'est exécuté qu'une fois, côté navigateur.
import { cal } from '../data/site.js'

let started = false

export function loadCal() {
    if (started || typeof window === 'undefined') return
    started = true

    ;(function (C, A, L) {
        const p = (a, ar) => a.q.push(ar)
        const d = C.document
        C.Cal =
            C.Cal ||
            function () {
                const api = C.Cal
                const ar = arguments
                if (!api.loaded) {
                    api.ns = {}
                    api.q = api.q || []
                    d.head.appendChild(d.createElement('script')).src = A
                    api.loaded = true
                }
                if (ar[0] === L) {
                    const nsApi = function () {
                        p(nsApi, arguments)
                    }
                    const namespace = ar[1]
                    nsApi.q = nsApi.q || []
                    if (typeof namespace === 'string') {
                        api.ns[namespace] = api.ns[namespace] || nsApi
                        p(api.ns[namespace], ar)
                        p(api, ['initNamespace', namespace])
                    } else p(api, ar)
                    return
                }
                p(api, ar)
            }
    })(window, 'https://app.cal.com/embed/embed.js', 'init')

    window.Cal('init', cal.namespace, { origin: 'https://cal.com' })
    window.Cal.ns[cal.namespace]('ui', { hideEventTypeDetails: false, layout: 'month_view' })
}
