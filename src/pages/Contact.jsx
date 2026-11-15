import { motion } from 'motion/react'
import ContactForm from '../components/contact/ContactForm.jsx'
import CalButton from '../components/ui/CalButton.jsx'
import Icon from '../components/ui/Icon.jsx'
import PageHeader from '../components/ui/PageHeader.jsx'
import Reveal, { RevealGroup, revealItem } from '../components/ui/Reveal.jsx'
import { profile } from '../data/site.js'

const CHANNELS = [
    { label: 'WhatsApp', value: profile.whatsapp.label, href: profile.whatsapp.url, icon: 'whatsapp' },
    { label: 'E-mail', value: profile.email, href: `mailto:${profile.email}`, icon: 'mail' },
    { label: 'LinkedIn', value: profile.linkedin.label, href: profile.linkedin.url, icon: 'linkedin' },
    { label: 'GitHub', value: profile.github.label, href: profile.github.url, icon: 'github' },
]

export default function Contact() {
    return (
        <>
            <PageHeader
                path="contact"
                title={
                    <>
                        Un projet ? <span className="accent">Parlons-en.</span>
                    </>
                }
                lead="Backend Laravel, sécurisation d'une API, stage ou collaboration : écrivez-moi, ou réservez directement 30 minutes. Réponse sous 24 h ouvrées."
                emblem={{ icon: 'mail', chips: ['Réponse sous 24 h', 'Cal.com', 'WhatsApp'] }}
            />

            <section className="section section--flush-top" aria-label="Formulaire et coordonnées">
                <div className="container contact">
                    <Reveal>
                        <ContactForm />
                    </Reveal>

                    <Reveal className="aside-card" delay={0.1}>
                        <h2 className="aside-card__title">Me joindre directement</h2>
                        <RevealGroup className="channels">
                            {CHANNELS.map((channel) => (
                                <motion.a
                                    key={channel.label}
                                    variants={revealItem}
                                    className="channel"
                                    href={channel.href}
                                    {...(channel.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                                >
                                    <span className="channel__icon">
                                        <Icon name={channel.icon} />
                                    </span>
                                    <span>
                                        <span className="channel__label">{channel.label}</span>
                                        <span className="channel__value">{channel.value}</span>
                                    </span>
                                    <Icon name="arrow-up-right" className="channel__arrow" />
                                </motion.a>
                            ))}
                        </RevealGroup>
                        <CalButton variant="primary" icon="calendar" className="w-full">
                            Réserver 30 min
                        </CalButton>
                        <p className="aside-card__note">
                            <span className="dot" aria-hidden="true" /> Lokossa / Cotonou, Bénin · à distance ou en présentiel
                        </p>
                    </Reveal>
                </div>
            </section>
        </>
    )
}
