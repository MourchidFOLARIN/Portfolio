// Envoi du formulaire de contact
// 1. Fonction Vercel /api/contact (Resend, la clé reste côté serveur).
// 2. Si elle n'est pas configurée (503) ou absente (404, ex. `npm run dev`),
//    repli sur Web3Forms. Sa clé d'accès est publique par conception :
//    elle identifie le formulaire, ce n'est pas un secret.
const WEB3FORMS_ACCESS_KEY = 'a2b3ebad-e1aa-44a5-ab05-8b33cb896ee6'

async function readJson(response) {
    try {
        return await response.json()
    } catch {
        return {}
    }
}

async function sendViaApi(fields) {
    const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(fields),
    })
    const data = await readJson(response)
    return { status: response.status, ok: response.ok && data.success === true, message: data.message }
}

async function sendViaWeb3Forms(fields) {
    const formData = new FormData()
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('name', fields.name)
    formData.append('email', fields.email)
    formData.append('subject', fields.subject ? `Portfolio : ${fields.subject}` : 'Nouveau message depuis le portfolio')
    formData.append('message', fields.message)
    const response = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData })
    const data = await readJson(response)
    return { status: response.status, ok: response.ok && data.success === true, message: data.message }
}

export async function sendMessage(fields) {
    let result
    try {
        result = await sendViaApi(fields)
    } catch {
        result = { status: 0, ok: false }
    }
    if (!result.ok && [0, 404, 405, 503].includes(result.status)) {
        result = await sendViaWeb3Forms(fields)
    }
    return result
}
