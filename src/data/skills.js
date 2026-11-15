// Compétences détaillées (source : ancienne page Compétences)

export const domains = [
    {
        id: 'backend',
        title: 'Backend & conception d’API',
        intro: 'Conception de services fiables, structuration d’API RESTful et gestion rigoureuse des bases de données relationnelles.',
        cards: [
            {
                title: 'PHP & Laravel',
                text: 'Développement orienté objet, architecture MVC, migrations, seeders, Eloquent ORM et logique métier modulaire.',
                items: ['PHP 8+ (POO, typage strict)', 'Framework Laravel', 'Architecture MVC & services', 'Eloquent ORM & relations'],
            },
            {
                title: 'API REST & sécurité',
                text: 'Création d’endpoints standardisés, authentification sécurisée par JWT, gestion d’erreurs HTTP et validation FormRequest.',
                items: ['Design d’API RESTful', 'Tokens JWT & sessions', 'Validation stricte des entrées', 'Codes HTTP & exceptions'],
            },
            {
                title: 'Bases de données & SQL',
                text: 'Modélisation entité-relation, requêtes SQL optimisées, jointures, transactions et intégrité référentielle.',
                items: ['MySQL (InnoDB)', 'Requêtes SQL & indexation', 'Contraintes de clés étrangères', 'Transactions ACID'],
            },
            {
                title: 'Outils & intégration',
                text: 'Gestion de versions collaborative, intégration web front-end standard et programmation bas niveau complémentaire.',
                items: ['Git & GitHub (branches, PR)', 'HTML5 / CSS3 / JavaScript', 'Postman (tests d’API)', 'C / C++ (programmation système)'],
            },
        ],
    },
    {
        id: 'securite',
        title: 'Cybersécurité & sécurité applicative',
        intro: 'Pratique de la sécurité web et du pentest en laboratoire et en CTF, axée sur les principes du secure coding.',
        cards: [
            {
                title: 'OWASP Top 10 & vulnérabilités',
                text: 'Identification, test offensif et remédiation des principales failles web sur des environnements d’entraînement dédiés.',
                items: ['Injections SQL (SQLi) & blind SQLi', 'Cross-Site Scripting (reflected / stored)', 'Broken authentication & sessions', 'CSRF & mauvaises configurations'],
            },
            {
                title: 'Secure coding & cryptographie',
                text: 'Intégration systématique des règles de sécurité dès l’écriture du code source applicatif.',
                items: ['Requêtes préparées PDO & ORM', 'Hachage robuste (bcrypt, Argon2)', 'Jetons CSRF & CORS', 'Gestion sécurisée des secrets (.env)'],
            },
            {
                title: 'Pentest web (labo & CTF)',
                text: 'Audit offensif éthique, outils d’interception et résolution d’épreuves de sécurité informatique.',
                items: ['Burp Suite (Proxy, Repeater, Intruder)', 'Kali Linux (suite d’outils)', 'Compétitions CTF (3ᵉ place Opération Nova)', 'Rédaction de notes de remédiation'],
            },
            {
                title: 'Protection des API & des flux',
                text: 'Verrouillage des points d’accès distants et durcissement des communications entre services.',
                items: ['Rate limiting & anti-bruteforce', 'Contrôle d’accès par rôles (RBAC)', 'En-têtes HTTP de sécurité (CSP, HSTS)', 'Validation et sérialisation des payloads'],
            },
        ],
    },
    {
        id: 'reseaux',
        title: 'Réseaux & systèmes Linux',
        intro: 'Administration Linux en ligne de commande et analyse approfondie des flux protocolaires.',
        cards: [
            {
                title: 'Linux & automatisation Bash',
                text: 'Utilisation quotidienne de distributions Linux (Debian, Ubuntu, Kali), administration via terminal, gestion des droits et permissions, processus et scripts Bash pour automatiser l’administration.',
                tags: ['Debian / Ubuntu', 'Bash scripting', 'SSH & clés publiques', 'Systemd & logs'],
            },
            {
                title: 'Protocoles & analyse réseau',
                text: 'Compréhension structurée de la pile TCP/IP et des protocoles essentiels (DNS, DHCP, HTTP/S, SSH, ICMP), cartographie réseau avec Nmap et dissection de trames avec Wireshark.',
                tags: ['Pile TCP/IP', 'DNS & routage', 'Nmap', 'Wireshark', 'Sécurité périmétrique'],
            },
        ],
    },
    {
        id: 'ia',
        title: 'IA & data science appliquée',
        intro: 'Pratique concrète de Python pour le traitement de données et les modèles de prédiction supervisée.',
        cards: [
            {
                title: 'Machine learning (Scikit-Learn)',
                text: 'Modèles supervisés appliqués à des cas concrets (comme la détection préventive de risques cardiovasculaires avec Random Forest), évaluation des métriques (accuracy, recall) et gestion du surapprentissage.',
                tags: ['Python 3', 'Random Forest', 'Scikit-Learn', 'Matrice de confusion'],
            },
            {
                title: 'Traitement de données & Streamlit',
                text: 'Nettoyage et structuration de données avec Pandas et NumPy, connexion aux bases SQL et interfaces web interactives avec Streamlit.',
                tags: ['Pandas & NumPy', 'Streamlit', 'MySQL Connector', 'Visualisation de données'],
            },
        ],
    },
]

export const learning = [
    { title: 'Docker', text: 'Conteneurisation de services, Dockerfile, docker-compose et environnements de test isolés.' },
    { title: 'PostgreSQL', text: 'Fonctionnalités avancées, types JSON / UUID et requêtes complexes.' },
    { title: 'OAuth2 & OpenID', text: 'Délégation d’accès, jetons d’actualisation et flux multi-clients.' },
    { title: 'CI/CD & automatisation', text: 'Intégration continue avec GitHub Actions et tests automatiques à chaque push.' },
    { title: 'Nginx & reverse proxy', text: 'Configuration de serveur web, équilibrage de charge de base et certificats TLS.' },
    { title: 'Sécurité réseau avancée', text: 'Pare-feu UFW / iptables, segmentation VLAN et durcissement des configurations.' },
]

