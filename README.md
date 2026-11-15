# Portfolio — Mourchid FOLARIN

Portfolio de **Mourchid FOLARIN**, développeur Backend orienté cybersécurité et réseaux,
étudiant en **Licence 3 Informatique et Télécommunications** à l'INSTI (UNSTIM).

En ligne : **https://mourchidfolarin.vercel.app**

- GitHub : https://github.com/MourchidFOLARIN
- LinkedIn : https://www.linkedin.com/in/mourchid-folarin-60b711374/

## Stack

- **React 19** + **Vite 8**, navigation par **React Router 7** (pages chargées à la demande)
- **Motion** pour les animations, **Lenis** pour le défilement fluide
  (les deux respectent le réglage « réduire les animations » du système)
- **Tailwind CSS 4** pour le reset et les utilitaires ; le design vit dans `src/styles/`
- Polices auto-hébergées (Fontsource) : Space Grotesk, Plus Jakarta Sans, Instrument Serif, JetBrains Mono
- **Pré-rendu** : au build, chaque page est écrite en HTML complet (contenu, titre, balises de
  partage, données structurées). Google, LinkedIn ou WhatsApp lisent le vrai contenu, puis React
  prend le relais dans le navigateur.
- Une fonction serverless Vercel (`api/contact.js`) pour le formulaire de contact, envoyé par
  [Resend](https://resend.com)
- Cal.com pour la prise de rendez-vous

Palette d'origine conservée : noir `#050505`, émeraude `#10b981`, bleu `#3b82f6`.

## Pages

| Route | Fichier | Contenu |
|---|---|---|
| `/` | `src/pages/Home.jsx` | Présentation, expertise, 4 projets, palmarès |
| `/a-propos` | `src/pages/About.jsx` | Parcours personnel, backend, sécurité, vision |
| `/competences` | `src/pages/Skills.jsx` | Compétences par domaine, apprentissages en cours |
| `/projets` | `src/pages/Projects.jsx` | Les 15 projets, filtres et fiches techniques |
| `/parcours` | `src/pages/Journey.jsx` | Frise chronologique, rôles et engagements |
| `/distinctions` | `src/pages/Awards.jsx` | CSCTF 2026, hackathons et CTF |
| `/contact` | `src/pages/Contact.jsx` | Formulaire, coordonnées, Cal.com |

`/projets#kernel` ouvre directement la fiche du projet Kernel (fonctionne avec chaque identifiant).

## Où modifier le contenu

Les textes sont séparés de la mise en page :

| Contenu | Fichier |
|---|---|
| Coordonnées, réseaux, navigation, lien Cal.com | `src/data/site.js` |
| Projets (textes, images, filtres, projets de l'accueil) | `src/data/projects.js` |
| Compétitions et distinctions | `src/data/awards.js` |
| Frise du parcours, rôles | `src/data/journey.js` |
| Compétences | `src/data/skills.js` |
| Titres et descriptions des pages (SEO) | `src/data/seo.js` |

Les images sont dans `public/assets/img/`.

## Structure

```
.
├── api/contact.js          # fonction Vercel POST /api/contact (Resend)
├── public/                 # fichiers servis tels quels (images, favicon, robots, sitemap)
├── scripts/prerender.mjs   # pré-rendu HTML de chaque page après le build
├── src/
│   ├── pages/              # une page par route
│   ├── components/         # layout (barre, pied de page), accueil, projets, contact, ui
│   ├── data/               # tout le contenu du site
│   ├── lib/                # envoi du formulaire, Cal.com, SEO
│   ├── hooks/              # titre et balises de partage à chaque navigation
│   ├── styles/             # design : base, composants, pages, animations, responsive
│   ├── entry-client.jsx    # démarrage dans le navigateur
│   └── entry-server.jsx    # rendu utilisé par le pré-rendu
├── index.html              # gabarit HTML
├── vite.config.mjs
└── vercel.json             # build, URLs propres, en-têtes de sécurité, cache
```

## Lancer en local

Node.js 20.19 ou plus récent.

```bash
npm install
npm run dev                  # développement : http://localhost:5173
npm run build && npm run preview   # version de production : http://localhost:4173
```

`npm run preview` applique les mêmes en-têtes de sécurité que Vercel (lus dans `vercel.json`) :
on teste en local exactement ce qui sera servi.

En local, `/api/contact` n'existe pas : le formulaire bascule automatiquement sur Web3Forms.
Pour tester la fonction comme en production, utilisez la CLI Vercel :

```bash
npm i -g vercel
cp .env.example .env      # puis renseignez RESEND_API_KEY
vercel dev
```

## Déploiement sur Vercel

Le dépôt est relié à Vercel : chaque push sur `main` déploie le site.
`vercel.json` indique la commande de build (`npm run build`) et le dossier publié (`dist`) :
rien à changer dans les réglages du projet Vercel.

### Variables d'environnement (formulaire de contact)

À définir dans Vercel, *Project → Settings → Environment Variables*
(environnement **Production**), jamais dans le dépôt :

| Variable | Obligatoire | Rôle |
|---|---|---|
| `RESEND_API_KEY` | oui | Clé API Resend (https://resend.com/api-keys) |
| `CONTACT_TO` | non | Destinataire, par défaut `mourchidolawale@gmail.com` |
| `CONTACT_FROM` | non | Expéditeur vérifié dans Resend, par défaut `Portfolio <onboarding@resend.dev>` |

Avec l'expéditeur par défaut `onboarding@resend.dev`, Resend ne livre qu'à
l'adresse du compte Resend. Pour un autre destinataire, vérifiez un domaine dans
Resend et mettez une adresse de ce domaine dans `CONTACT_FROM`.

Tant que `RESEND_API_KEY` n'est pas définie, `/api/contact` répond 503 et le
navigateur envoie le message par Web3Forms (clé publique dans `src/lib/contact.js`).

En ligne de commande :

```bash
vercel env add RESEND_API_KEY production
vercel --prod   # ou un nouveau push sur main
```

## Sécurité

- En-têtes définis dans `vercel.json` : Content-Security-Policy, Strict-Transport-Security,
  X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- La CSP **n'autorise plus aucun script inline** (`script-src 'self' https://app.cal.com`) :
  le chargeur Cal.com est dans `src/lib/cal.js`, et le pré-rendu refuse de produire une page
  contenant un script inline (le build échoue si cela arrive).
- Polices, scripts et styles sont servis par le site lui-même : plus de dépendance à Google Fonts,
  unpkg ou cdnjs.
- Si une nouvelle ressource externe (script, image, API) est ajoutée, son origine doit être
  ajoutée à la CSP, sinon le navigateur la bloque.
- `api/contact.js` : validation des champs, limite de 8 messages par heure et par IP,
  objet et expéditeur fixes, la clé Resend reste côté serveur.
