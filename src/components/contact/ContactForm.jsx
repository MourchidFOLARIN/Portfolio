import { useState } from 'react'
import { sendMessage } from '../../lib/contact.js'
import { cx } from '../../lib/cx.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'

const TOPICS = ['Mission freelance', 'Stage', 'Audit de sécurité', 'Backend / API', 'Collaboration', 'Autre']

export default function ContactForm() {
    const [status, setStatus] = useState({ type: 'idle', message: '' })
    const sending = status.type === 'pending'

    const onSubmit = async (event) => {
        event.preventDefault()
        const form = event.currentTarget
        const data = new FormData(form)

        // Piège à robots : un humain ne coche jamais cette case invisible
        if (data.get('botcheck')) {
            setStatus({ type: 'success', message: 'Message envoyé avec succès !' })
            form.reset()
            return
        }

        const topic = String(data.get('topic') || '')
        const subject = String(data.get('subject') || '').trim()
        const fields = {
            name: String(data.get('name') || ''),
            email: String(data.get('email') || ''),
            subject: [topic, subject].filter(Boolean).join(' — '),
            message: String(data.get('message') || ''),
        }

        setStatus({ type: 'pending', message: 'Envoi de votre message…' })
        try {
            const result = await sendMessage(fields)
            if (result.ok) {
                setStatus({ type: 'success', message: 'Message envoyé ! Je vous réponds sous 24 h ouvrées.' })
                form.reset()
            } else {
                setStatus({ type: 'error', message: `Erreur : ${result.message || 'envoi impossible. Merci de réessayer.'}` })
            }
        } catch {
            setStatus({
                type: 'error',
                message: 'Une erreur réseau est survenue. Vérifiez votre connexion et réessayez.',
            })
        }
    }

    return (
        <form className="form-card" onSubmit={onSubmit} noValidate={false}>
            <input type="checkbox" name="botcheck" className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <div className="form-grid">
                <fieldset className="field full">
                    <legend>Je viens pour…</legend>
                    <div className="choices">
                        {TOPICS.map((topic, index) => (
                            <label className="choice" key={topic}>
                                <input type="radio" name="topic" value={topic} defaultChecked={index === 0} />
                                <span>{topic}</span>
                            </label>
                        ))}
                    </div>
                </fieldset>
                <div className="field">
                    <label htmlFor="name">Votre nom</label>
                    <input className="input" id="name" name="name" type="text" required maxLength={120} autoComplete="name" placeholder="Nom complet ou organisation" />
                </div>
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input className="input" id="email" name="email" type="email" required maxLength={254} autoComplete="email" placeholder="vous@exemple.com" />
                </div>
                <div className="field full">
                    <label htmlFor="subject">
                        Sujet <span className="opt">facultatif</span>
                    </label>
                    <input className="input" id="subject" name="subject" type="text" maxLength={120} placeholder="Ex. : audit de mon API Laravel" />
                </div>
                <div className="field full">
                    <label htmlFor="message">Votre message</label>
                    <textarea
                        className="input"
                        id="message"
                        name="message"
                        required
                        maxLength={5000}
                        rows={6}
                        placeholder="Le contexte, vos besoins techniques, vos délais… quelques lignes suffisent."
                    />
                </div>
                <p className={cx('form-status full', status.type !== 'idle' && `is-visible is-${status.type}`)} role="status" aria-live="polite">
                    {status.message}
                </p>
                <div className="form-foot full">
                    <Button type="submit" variant="primary" icon="arrow-right" disabled={sending}>
                        {sending ? 'Envoi en cours…' : 'Envoyer le message'}
                    </Button>
                    <span className="form-note">
                        <Icon name="lock" size="sm" />
                        Envoi chiffré · vos données servent uniquement à vous répondre
                    </span>
                </div>
            </div>
        </form>
    )
}
