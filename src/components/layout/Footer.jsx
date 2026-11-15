import { Link } from 'react-router-dom'
import { nav, profile } from '../../data/site.js'
import Icon from '../ui/Icon.jsx'
import Logo from './Logo.jsx'
import { scrollToTop, useLenis } from './SmoothScroll.jsx'

const socials = [
    { href: profile.github.url, label: 'GitHub', icon: 'github' },
    { href: profile.linkedin.url, label: 'LinkedIn', icon: 'linkedin' },
    { href: profile.whatsapp.url, label: 'WhatsApp', icon: 'whatsapp' },
    { href: `mailto:${profile.email}`, label: profile.email, icon: 'mail' },
]

export default function Footer() {
    const lenis = useLenis()

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer__top">
                    <div className="footer__brand">
                        <Logo />
                        <p>Développeur backend orienté cybersécurité &amp; réseaux. Lokossa · Cotonou, Bénin.</p>
                    </div>
                    <nav aria-label="Pied de page">
                        <h2 className="footer__title">Pages</h2>
                        <ul className="footer__links">
                            {nav.map((item) => (
                                <li key={item.to}>
                                    <Link to={item.to}>{item.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div>
                        <h2 className="footer__title">Contact</h2>
                        <ul className="footer__links">
                            {socials.map((social) => (
                                <li key={social.label}>
                                    <a
                                        href={social.href}
                                        {...(social.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
                                    >
                                        <Icon name={social.icon} size="sm" />
                                        {social.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="footer__bottom">
                    <span>© 2026 Mourchid FOLARIN</span>
                    <button type="button" onClick={() => scrollToTop(lenis)}>
                        Haut de page
                        <Icon name="arrow-up" size="sm" />
                    </button>
                </div>
            </div>
        </footer>
    )
}
