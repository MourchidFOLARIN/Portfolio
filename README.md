# Portfolio — Mourchid FOLARIN

Portfolio de **Mourchid FOLARIN**, développeur Backend orienté cybersécurité et réseaux,
étudiant en **Licence 3 Informatique et Télécommunications** à l'INSTI (UNSTIM).

En ligne : **https://mourchidfolarin.vercel.app**

- GitHub : https://github.com/MourchidFOLARIN
- LinkedIn : https://www.linkedin.com/in/mourchid-folarin-60b711374/

## Pages

| Page | Contenu |
|---|---|
| `index.html` | Accueil : présentation, compétences clés, projets phares, terminal interactif |
| `a-propos.html` | Profil, méthode d'apprentissage, vision |
| `competences.html` | Backend, sécurité applicative, réseaux et systèmes |
| `projets.html` | Les projets détaillés (fiche technique dans une fenêtre) |
| `parcours.html` | Parcours académique et engagements |
| `distinctions.html` | Hackathons, CTF et prix |
| `contact.html` | Formulaire de contact et prise de rendez-vous Cal.com |

## Stack

- HTML, CSS et JavaScript sans framework ni étape de build
- [AOS](https://michalsnik.github.io/aos/) (animations au défilement, via unpkg) et [GSAP](https://gsap.com/) (via cdnjs)
- Polices Google Fonts : Outfit, Space Grotesk, Plus Jakarta Sans
- Cal.com pour la prise de rendez-vous
- Une fonction serverless Vercel (`api/contact.js`) pour le formulaire de contact, envoyé par [Resend](https://resend.com)

## Structure

```
.
├── index.html, a-propos.html, competences.html, projets.html,
│   parcours.html, distinctions.html, contact.html
├── style.css              # styles de toutes les pages
├── script.js              # terminal, fiches projets, formulaire, widget visiteur
├── api/contact.js         # fonction Vercel POST /api/contact (Resend)
├── assets/img/            # images WebP, image de partage og-image.jpg, favicon.svg
├── favicon.ico, apple-touch-icon.png
├── vercel.json            # URLs propres, en-têtes de sécurité (CSP, HSTS…), cache
├── robots.txt, sitemap.xml
└── .env.example           # variables du formulaire de contact
```

## Lancer en local

Aucune installation nécessaire pour les pages :

```bash
python3 -m http.server 8000
# puis http://localhost:8000
```

Avec un serveur statique, `/api/contact` n'existe pas : le formulaire bascule
automatiquement sur Web3Forms. Pour tester la fonction et les en-têtes comme en
production, utilisez la CLI Vercel :

```bash
npm i -g vercel
cp .env.example .env      # puis renseignez RESEND_API_KEY
vercel dev
```

## Déploiement sur Vercel

Le dépôt est relié à Vercel : chaque push sur `main` déploie le site.
Il n'y a ni commande de build ni dossier de sortie à configurer.

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
navigateur envoie le message par Web3Forms (clé publique dans `script.js`).

En ligne de commande :

```bash
vercel env add RESEND_API_KEY production
vercel --prod   # ou un nouveau push sur main
```

## Sécurité

- En-têtes définis dans `vercel.json` : Content-Security-Policy, Strict-Transport-Security,
  X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- La CSP autorise `'unsafe-inline'` pour les scripts : les pages utilisent des scripts
  inline et des attributs `onclick`, et le widget Cal.com en a besoin. Les sortir dans
  `script.js` permettrait de retirer cette exception.
- Si une nouvelle ressource externe (script, police, image, API) est ajoutée,
  son origine doit être ajoutée à la CSP, sinon le navigateur la bloque.
- `api/contact.js` : validation des champs, limite de 8 messages par heure et par IP,
  objet et expéditeur fixes, la clé Resend reste côté serveur.
- Le widget « identité visiteur » de l'accueil demande l'IP du visiteur à ipapi.co
  (puis ipwho.is, puis ipify) depuis son navigateur et l'affiche seulement : le site
  n'envoie ni n'enregistre rien.
