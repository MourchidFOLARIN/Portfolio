import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { nav } from '../../data/site.js'
import { cx } from '../../lib/cx.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'
import Logo from './Logo.jsx'

export default function Navbar() {
    const [open, setOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const { pathname } = useLocation()

    // Ferme le menu mobile à chaque changement de page
    useEffect(() => setOpen(false), [pathname])

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    useEffect(() => {
        if (!open) return
        const onKey = (event) => event.key === 'Escape' && setOpen(false)
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [open])

    return (
        <header className={cx('nav', scrolled && 'is-scrolled', open && 'is-open')}>
            <div className="container">
                <div className="nav__bar">
                    <Logo />
                    <nav className="nav__links" aria-label="Navigation principale">
                        {nav.map((item) => (
                            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>
                    <div className="nav__actions">
                        <Button to="/contact" variant="light" size="sm" className="nav__cta">
                            Me contacter
                        </Button>
                        <button
                            type="button"
                            className="nav__toggle"
                            aria-expanded={open}
                            aria-controls="nav-panel"
                            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
                            onClick={() => setOpen((value) => !value)}
                        >
                            <Icon name={open ? 'x' : 'menu'} />
                        </button>
                    </div>
                </div>
            </div>

            <nav className="nav__panel" id="nav-panel" aria-label="Menu mobile">
                {nav.map((item) => (
                    <NavLink key={item.to} to={item.to} end={item.to === '/'} tabIndex={open ? 0 : -1}>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </header>
    )
}
