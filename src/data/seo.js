import { SITE_URL } from './site.js'

export const OG_IMAGE = `${SITE_URL}/assets/img/og-image.jpg?v=2`

const person = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: 'Mourchid FOLARIN',
            alternateName: ['Mourchid Folarin', 'FOLARIN Mourchid'],
            url: `${SITE_URL}/`,
            image: `${SITE_URL}/assets/img/mourchid-hero.webp`,
            jobTitle: 'Développeur Backend & Spécialiste Cybersécurité',
            description:
                "Développeur Backend (PHP/Laravel) et passionné de cybersécurité offensive, étudiant en Licence 3 Informatique & Télécoms à l'INSTI (UNSTIM), Co-fondateur & Directeur Général d'Excellence Team.",
            email: 'mailto:mourchidolawale@gmail.com',
            address: { '@type': 'PostalAddress', addressLocality: 'Lokossa', addressCountry: 'BJ' },
            alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'INSTI Lokossa — Université Nationale des Sciences, Technologies, Ingénierie et Mathématiques (UNSTIM)',
            },
            worksFor: { '@type': 'Organization', name: 'Excellence Team' },
            knowsAbout: ['Cybersécurité', 'Pentest', 'Sécurité web', 'OWASP', 'PHP', 'Laravel', 'Réseaux', 'Linux'],
            knowsLanguage: ['fr', 'en'],
            sameAs: ['https://github.com/MourchidFOLARIN', 'https://www.linkedin.com/in/mourchid-folarin-60b711374/'],
        },
        {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: `${SITE_URL}/`,
            name: 'Mourchid FOLARIN',
            inLanguage: 'fr',
            author: { '@id': `${SITE_URL}/#person` },
        },
    ],
}

// Titre et description de chaque page (repris de l'ancien site)
export const seo = {
    '/': {
        title: 'Mourchid FOLARIN — Développeur Backend & Cybersécurité | Portfolio officiel',
        description:
            "Portfolio officiel de Mourchid FOLARIN, Développeur Backend orienté Cybersécurité & Réseaux. Étudiant en Licence 3 Informatique & Télécoms à l'INSTI Lokossa, Co-fondateur & Directeur Général d'Excellence Team.",
        keywords:
            'Mourchid FOLARIN, Mourchid Folarin, FOLARIN Mourchid, Développeur Backend, Laravel, PHP, Cybersécurité, Réseaux, Linux, OWASP, Pentest, Bénin, INSTI Lokossa',
        ogTitle: 'Mourchid FOLARIN | Développeur Backend orienté Cybersécurité & Réseaux',
        ogDescription:
            "Étudiant en Licence 3 d'Informatique & Télécoms (INSTI Lokossa). Développement Backend robuste (Laravel/PHP), sécurité applicative (OWASP) et systèmes réseaux Linux.",
        jsonLd: person,
    },
    '/a-propos': {
        title: 'À Propos | Mourchid FOLARIN — Développeur Backend orienté Cybersécurité & Réseaux',
        description:
            "Découvrez le profil, la philosophie, la méthodologie d'apprentissage et la vision technique de Mourchid FOLARIN, étudiant en Licence 3 Informatique & Télécoms à l'INSTI Lokossa.",
    },
    '/competences': {
        title: 'Compétences Techniques | Mourchid FOLARIN — Backend, Cybersécurité, Réseaux',
        description:
            'Compétences techniques détaillées de Mourchid FOLARIN : PHP, Laravel, API REST, OWASP Top 10, Secure Coding, Linux, TCP/IP, Wireshark, Python Machine Learning et simulateur de laboratoire interactif.',
    },
    '/projets': {
        title: 'Projets & Réalisations | Mourchid FOLARIN — Backend, Cybersécurité, Réseaux',
        description:
            'Découvrez les 15 projets de Mourchid FOLARIN : architecture Backend Laravel, sécurité API, laboratoires CTF, prédiction IA, systèmes IoT et plateformes collaboratives.',
    },
    '/parcours': {
        title: 'Mon Parcours & Leadership | Mourchid FOLARIN',
        description:
            'Parcours académique, leadership étudiant, engagements associatifs et vision entrepreneuriale de Mourchid FOLARIN — INSTI Lokossa, Excellence Team, Digital Innovation Club.',
    },
    '/distinctions': {
        title: 'Compétitions & Distinctions | Mourchid FOLARIN',
        description:
            'Podiums, hackathons nationaux et challenges CTF de Mourchid FOLARIN : CSCTF 2026 (27ᵉ sur 1 014 équipes), finaliste du Hackathon Cursor × DevDay26, CADEV 2026, Technova Challenge, EPITNET Hackathon, HackByIFRI, MIABE, GENEB, Opération Nova CTF.',
    },
    '/contact': {
        title: 'Contact & Rendez-vous | Mourchid FOLARIN',
        description:
            'Contactez Mourchid FOLARIN pour vos opportunités professionnelles, projets en freelance, développement Backend Laravel, audit applicatif ou réservez un créneau en direct via Cal.com.',
    },
    '/404': {
        title: 'Page introuvable | Mourchid FOLARIN',
        description: "Cette page n'existe pas ou a été déplacée.",
        noindex: true,
    },
}
