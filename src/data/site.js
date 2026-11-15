// Identité, coordonnées et navigation : la seule source à modifier
// quand un lien ou une adresse change.
export const SITE_URL = 'https://mourchidfolarin.vercel.app'

export const profile = {
    name: 'Mourchid FOLARIN',
    role: 'Développeur backend orienté cybersécurité & réseaux',
    school: 'L3 Informatique & Télécoms · INSTI Lokossa (UNSTIM)',
    location: 'Lokossa · Cotonou, Bénin',
    timezone: 'Africa/Porto-Novo',
    email: 'mourchidolawale@gmail.com',
    whatsapp: { label: '+229 92 55 49 64', url: 'https://wa.me/22992554964' },
    github: { label: '@MourchidFOLARIN', url: 'https://github.com/MourchidFOLARIN' },
    linkedin: { label: 'Mourchid FOLARIN', url: 'https://www.linkedin.com/in/mourchid-folarin-60b711374/' },
}

// Prise de rendez-vous Cal.com (fenêtre intégrée)
export const cal = {
    link: 'excellence-team-baw7ji',
    namespace: 'excellence-team-baw7ji',
    url: 'https://cal.com/excellence-team-baw7ji',
}

export const nav = [
    { to: '/', label: 'Accueil' },
    { to: '/a-propos', label: 'À propos' },
    { to: '/competences', label: 'Compétences' },
    { to: '/projets', label: 'Projets' },
    { to: '/parcours', label: 'Parcours' },
    { to: '/distinctions', label: 'Distinctions' },
    { to: '/contact', label: 'Contact' },
]
