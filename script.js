document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins (ScrollTrigger is optional — guard against missing CDN)
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Loader Animation (only if the loader exists on the page)
    if (document.querySelector('.loader-overlay')) {
        const loadTl = gsap.timeline();
        loadTl.to('.loader-progress', {
            left: '0%',
            duration: 2,
            ease: 'power2.inOut'
        })
            .to('.loader-text', {
                opacity: 0,
                y: -20,
                duration: 0.5
            })
            .to('.loader-overlay', {
                opacity: 0,
                display: 'none',
                duration: 0.8
            });
    }

    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });

    // Workstation Parallax (The "Dingue" touch)
    const photoContainer = document.querySelector('.photo-container');
    if (photoContainer) {
        document.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            photoContainer.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');

    if (cursor && follower) {
        document.addEventListener('mousemove', (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });
    }

    // Terminal Animation Logic
    const terminalBody = document.getElementById('skills-terminal');
    const skillsData = [
        { cmd: "php artisan --version", output: "Laravel Framework 11.x (PHP 8.2+)" },
        { cmd: "php artisan make:controller Api/AuthController", output: "✓ Controller created with JWT & validation rules" },
        { cmd: "php artisan migrate --status", output: "✓ All migrations executed (MySQL database synchronized)" },
        { cmd: "git status -s", output: "✓ Working tree clean, synced with origin/main" },
        { cmd: "python3 -c 'import sklearn; print(sklearn.__version__)'", output: "✓ Scikit-Learn loaded: Random Forest Ready" }
    ];

    let backendTypeStarted = false;

    async function typeTerminal() {
        if (!terminalBody || backendTypeStarted) return;
        backendTypeStarted = true;

        for (const item of skillsData) {
            // Type Command
            let cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            cmdLine.innerHTML = `<span class="terminal-prompt">mourchid@backend:~$</span> <span class="typing"></span>`;
            terminalBody.insertBefore(cmdLine, terminalBody.lastElementChild);

            let typingSpan = cmdLine.querySelector('.typing');
            for (let char of item.cmd) {
                typingSpan.textContent += char;
                await new Promise(r => setTimeout(r, 30));
            }

            // Show Output
            let outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.style.color = '#10b981';
            outputLine.style.opacity = '0';
            outputLine.textContent = item.output;
            terminalBody.insertBefore(outputLine, terminalBody.lastElementChild);

            gsap.to(outputLine, { opacity: 0.8, duration: 0.5 });
            await new Promise(r => setTimeout(r, 600));
        }
    }

    // Trigger terminal when in view (only if ScrollTrigger is available)
    if (typeof ScrollTrigger !== 'undefined' && terminalBody) {
        ScrollTrigger.create({
            trigger: ".backend-terminal",
            start: "top 80%",
            onEnter: () => typeTerminal()
        });
    }

    // ============================================
    // Cybersecurity Terminal Animation
    // ============================================
    const cybersecTerminalBody = document.getElementById('cybersec-terminal');
    const cybersecData = [
        { cmd: "nmap -sV -sC 192.168.56.101", output: "Nmap scan complete: 2 ports open (80/tcp, 22/tcp)" },
        { cmd: "wireshark -i eth0 -k -f 'tcp port 80'", output: "Capturing HTTP traffic on interface eth0..." },
        { cmd: "burpsuite --target http://lab.local", output: "Testing endpoints for OWASP Top 10 vulnerabilities..." },
        { cmd: "python3 sql_injection_check.py", output: "✓ Parameterized query enforced: No SQLi vulnerability detected" },
        { cmd: "tail -f /var/log/auth.log", output: "SSH session monitored: access restricted by key pair" }
    ];

    let cybersecTypeStarted = false;

    async function typeTerminalCybersecurity() {
        if (!cybersecTerminalBody || cybersecTypeStarted) return;
        cybersecTypeStarted = true;

        for (const item of cybersecData) {
            // Type Command
            let cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            cmdLine.innerHTML = `<span class="terminal-prompt">mourchid@security:~$</span> <span class="typing"></span>`;
            cybersecTerminalBody.insertBefore(cmdLine, cybersecTerminalBody.lastElementChild);

            let typingSpan = cmdLine.querySelector('.typing');
            for (let char of item.cmd) {
                typingSpan.textContent += char;
                await new Promise(r => setTimeout(r, 30));
            }

            // Show Output
            let outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.style.color = '#10b981';
            outputLine.style.opacity = '0';
            outputLine.textContent = item.output;
            cybersecTerminalBody.insertBefore(outputLine, cybersecTerminalBody.lastElementChild);

            gsap.to(outputLine, { opacity: 0.8, duration: 0.5 });
            await new Promise(r => setTimeout(r, 600));
        }
    }

    // Trigger cybersec terminal when in view (only if ScrollTrigger is available)
    if (typeof ScrollTrigger !== 'undefined' && cybersecTerminalBody) {
        ScrollTrigger.create({
            trigger: ".cybersec-terminal",
            start: "top 80%",
            onEnter: () => typeTerminalCybersecurity()
        });
    }

    // Background Parallax
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.grid-overlay', { x: x, y: y, duration: 1 });
        gsap.to('.gradient-sphere', { x: -x * 2, y: -y * 2, duration: 2 });
    });

    // --- Backend & ML Lab Logic ---
    const labConsole = document.getElementById('lab-console');
    const labVisualizer = document.getElementById('lab-visualizer');
    const labBadge = document.getElementById('lab-badge');
    let isRunning = false;

    window.runSimulation = async (type, btn) => {
        if (isRunning) return;
        // Guard: the Lab UI may not exist on the current page
        if (!labConsole || !labVisualizer || !labBadge) return;
        isRunning = true;

        // Reset UI
        labConsole.innerHTML = '';
        labVisualizer.innerHTML = '';
        labBadge.className = 'lab-badge';

        // Update Buttons
        document.querySelectorAll('.lab-btn').forEach(b => b.classList.remove('active'));
        if (btn) btn.classList.add('active');

        if (type === 'laravel') {
            await simulateLaravel();
        } else if (type === 'ml') {
            await simulateML();
        } else if (type === 'security') {
            await simulateSecurity();
        } else if (type === 'network') {
            await simulateNetwork();
        }

        isRunning = false;
        labBadge.classList.add('success');
    };

    async function addLog(text, color = '#fff', delay = 400) {
        let line = document.createElement('div');
        line.style.color = color;
        line.style.marginBottom = '5px';
        line.innerHTML = `<span style="opacity:0.5">>>> </span>${text}`;
        labConsole.appendChild(line);
        labConsole.scrollTop = labConsole.scrollHeight;
        await new Promise(r => setTimeout(r, delay));
    }

    async function simulateLaravel() {
        labVisualizer.innerHTML = '<div style="color: var(--clr-primary); font-family: monospace;">[ LARAVEL_API_ROUTE_DISPATCHED ]</div>';
        await addLog("Route: POST /api/v1/auth/login", "#10b981");
        await addLog("Validation: FormRequest (email, password) -> VALIDÉ");
        await addLog("Controller: AuthController@login invoqué");
        await addLog("Sécurité: Hash::check(password, user->password) -> VRAI");
        await addLog("Auth: Token JWT généré avec payload & expiration", "#3b82f6");
        await addLog("Réponse: 200 OK (Bearer Token émis avec succès)", "#10b981");
    }

    async function simulateML() {
        labVisualizer.innerHTML = '<div class="ml-chart"></div>';
        const chart = labVisualizer.querySelector('.ml-chart');

        await addLog("Chargement du dataset & modèle Random Forest...");
        await addLog("Framework: Scikit-Learn | Algorithme: RandomForestClassifier");

        const bars = [];
        for (let i = 0; i < 8; i++) {
            let bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = '10px';
            chart.appendChild(bar);
            bars.push(bar);
        }

        await addLog("Calcul des probabilités de prédiction...");
        for (let i = 0; i < 6; i++) {
            bars.forEach(bar => {
                const h = Math.random() * 80;
                bar.style.height = `${h}px`;
                bar.style.background = h > 50 ? 'var(--clr-primary)' : '#3b82f6';
            });
            await addLog(`Évaluation des caractéristiques de l'échantillon ${i + 1}...`, "#a0a0a0", 200);
        }

        await addLog("Résultat: Probabilité calculée = 86.5%", "#10b981");
        await addLog("Classification: Validation réussie avec modèle supervisé", "#10b981");
    }

    async function simulateSecurity() {
        labVisualizer.innerHTML = '<div style="color: var(--clr-primary); font-family: monospace; font-size: 0.85rem;">[ AUDIT_OWASP_EN_COURS ]</div>';
        await addLog("Contrôle des entrées utilisateurs (Input Sanitization)...");
        await addLog("Test d'injection SQL : 'OR 1=1' -> Neutralisé via requêtes préparées PDO", "#10b981");
        await addLog("Test XSS : Balise <script> interceptée et encodée", "#10b981");
        await addLog("Vérification des en-têtes de sécurité HTTP...");
        await addLog("Résultat : Protection active contre les failles OWASP courantes", "#10b981");
    }

    async function simulateNetwork() {
        labVisualizer.innerHTML = '<div class="network-viz"></div>';
        const viz = labVisualizer.querySelector('.network-viz');
        viz.style.padding = '10px';
        viz.style.color = '#10b981';

        await addLog("Écoute sur l'interface réseau locale (eth0)...");
        await addLog("Capture et analyse des paquets TCP / DNS / SSH...");
        
        const protocols = ["TCP (Port 80/HTTP)", "TCP (Port 443/TLS)", "DNS (Port 53/UDP)", "SSH (Port 22/TCP)"];
        for (let i = 0; i < 4; i++) {
            const proto = protocols[i];
            await addLog(`Trame analysée : ${proto} | Checksum vérifié`, "#fff", 300);
        }
        
        await addLog("Analyse des flux avec Wireshark...", "#3b82f6");
        await addLog("Statut : Trafic nominal, protocoles inspectés avec succès.", "#10b981");
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]:not(#modal-project-link)').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return; // Do nothing for empty or plain # links

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Section Reveal Animation
    gsap.from('.hero-content h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.5,
        ease: 'power3.out'
    });

    gsap.from('.hero-content p', {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.8,
        ease: 'power3.out'
    });

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
    // --- Project Modal Logic ---
    const projectsData = {
        'student-success': {
            title: "Prédiction de Réussite Scolaire",
            image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
            desc: "Projet d'intelligence artificielle visant à analyser les facteurs déterminants de la réussite académique afin d'anticiper le décrochage scolaire.",
            problem: "Permettre aux équipes pédagogiques de repérer précocement les élèves en difficulté grâce à une analyse prédictive sur données réelles.",
            features: [
                "Nettoyage et prétraitement de données avec Python et Pandas",
                "Entraînement et évaluation d'un modèle Random Forest (Scikit-Learn)",
                "Interface interactive avec Streamlit pour tester des profils d'élèves",
                "Stockage et requêtes des historiques étudiants sous MySQL",
                "Visualisation graphique des métriques de précision et matrices de confusion"
            ],
            security: "Validation rigoureuse des données d'entrée et respect de la confidentialité des profils étudiants.",
            tech: ["Python", "Random Forest", "Streamlit", "MySQL", "Scikit-Learn", "Pandas"],
            github: "https://github.com/MourchidFOLARIN",
            url: null
        },

        'fraud-guard': {
            title: "Fraud Guard AI — Détection de Transactions Suspectes",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
            desc: "Système de surveillance et détection proactive des fraudes financières utilisant l'apprentissage automatique supervisé.",
            problem: "Détecter les anomalies dans les flux de paiement numérique sans bloquer les transactions légitimes.",
            features: [
                "Modèle de classification binaire supervisé (Random Forest)",
                "Analyse des écarts de montants, de fréquences et d'heures de transaction",
                "Tableau de bord Streamlit pour le suivi des alertes en temps réel",
                "Enregistrement persistant des transactions dans MySQL",
                "Calcul instantané d'un score de risque par opération"
            ],
            security: "Détection d'anomalies comportementales, validation des types de données et journalisation sécurisée des événements critiques.",
            tech: ["Python", "Random Forest", "Streamlit", "MySQL", "Sécurité", "Machine Learning"],
            github: "https://github.com/MourchidFOLARIN",
            url: null
        },

        'api-security': {
            title: "Sécurité API & Architecture Backend Laravel",
            image: "Top Device Security Tips_ Safeguard Your Digital Life.jpeg",
            desc: "Conception d'une architecture API REST complète et durcie pour des services applicatifs modernes avec Laravel et PHP.",
            problem: "Construire un backend modulaire capable de protéger les données sensibles et d'empêcher les abus d'utilisation.",
            features: [
                "Authentification sans état par tokens JWT sécurisés",
                "Contrôle d'accès basé sur les rôles (RBAC) via des middlewares personnalisés",
                "Validation stricte des requêtes entrantes avec FormRequests",
                "Pagination automatique et standardisation des réponses JSON",
                "Limitation de débit (Rate Limiting) pour prévenir les attaques brute force"
            ],
            security: "Requêtes préparées avec Eloquent ORM contre les injections SQL, hachage Bcrypt, protection XSS et gestion sécurisée des secrets d'environnement.",
            tech: ["PHP 8", "Laravel", "MySQL", "JWT", "REST API", "Secure Coding"],
            github: "https://github.com/MourchidFOLARIN",
            url: null
        },

        'cybersec-ctf': {
            title: "Laboratoire Pentest Web & Résolution CTF",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
            desc: "Entraînement régulier à l'audit de sécurité offensif et défensif sur des plateformes de challenges (CTF) et des environnements virtuels isolés.",
            problem: "Développer une compréhension approfondie des mécanismes d'attaque pour mieux concevoir des défenses applicatives solides.",
            features: [
                "Reconnaissance et cartographie d'hôtes avec Nmap",
                "Interception et analyse des requêtes HTTP/HTTPS via Burp Suite",
                "Exploitation contrôlée de vulnérabilités OWASP Top 10 (SQLi, XSS, IDOR)",
                "Capture et examen des flux réseau avec Wireshark",
                "Rédaction de notes techniques de remédiation post-audit"
            ],
            security: "Pratique éthique stricte en environnement de laboratoire, axée sur la compréhension des failles et le durcissement préventif.",
            tech: ["Linux", "Kali", "Burp Suite", "Nmap", "Wireshark", "OWASP Top 10"],
            github: "https://github.com/MourchidFOLARIN",
            url: null
        },

        'academix': {
            title: "AcademiX — Plateforme Éducative (Hackathon IFRI)",
            image: "Academix.png",
            desc: "Plateforme d'aide à l'apprentissage et à la révision conçue et développée en équipe lors d'un hackathon universitaire.",
            problem: "Permettre aux étudiants d'organiser leurs supports de cours et de tester leurs connaissances de façon interactive.",
            features: [
                "Organisation des modules de cours par matières et semestres",
                "Génération de quiz d'évaluation et fiches synthétiques",
                "Interface réactive développée avec React et stylisée avec Tailwind CSS",
                "Backend API Laravel pour la gestion des utilisateurs et des contenus"
            ],
            security: "Authentification des utilisateurs, protection des routes privées et validation des données de formulaires.",
            tech: ["Laravel", "React", "Tailwind CSS", "MySQL", "API REST"],
            github: "https://github.com/MourchidFOLARIN",
            url: "https://team-d-excellence-hackbyifri-2026.vercel.app/landing"
        },

        'excellencelink': {
            title: "ExcellenceLink — Gestionnaire Sécurisé de Liens",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
            desc: "Outil de centralisation, de catégorisation et de vérification d'URL pour le partage sécurisé de ressources au sein d'une équipe.",
            problem: "Éviter la dispersion des liens de documentation et vérifier leur cohérence avant ouverture.",
            features: [
                "Enregistrement et classement de liens par thématiques",
                "Vérification de la structure et du protocole des URL ajoutées",
                "Moteur de recherche rapide par mots-clés et tags",
                "Déploiement en ligne accessible en continu"
            ],
            security: "Validation des schémas d'URL pour prévenir les liens malveillants ou mal formés.",
            tech: ["Node.js", "Express", "React", "Sécurité Web", "Render"],
            github: "https://github.com/MourchidFOLARIN",
            url: "https://link-ptne.onrender.com/"
        },

        'stm32-controller': {
            title: "Contrôleur Industriel STM32",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            desc: "Projet de contrôle et d'acquisition de données basé sur microcontrôleur STM32 pour des applications nécessitant de la réactivité.",
            problem: "Mesurer et traiter des paramètres physiques avec une transmission fiable des signaux.",
            features: [
                "Programmation bas niveau en C++ et C",
                "Gestion d'interruptions matérielles et timers pour le cadencement",
                "Communication série (UART / I2C) avec des modules de capteurs",
                "Surveillance de seuils avec alertes d'état"
            ],
            security: "Validation de trames de communication pour éviter la corruption de données.",
            tech: ["STM32", "C++", "Capteurs", "Protocoles Séries"],
            github: "https://github.com/MourchidFOLARIN",
            url: null
        },

        'smart-fridge': {
            title: "Système IoT & Suivi de Température",
            image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80",
            desc: "Solution IoT pour la surveillance continue de la chaîne du froid dans le secteur agroalimentaire.",
            problem: "Éviter la détérioration de produits sensibles en détectant rapidement les écarts thermiques anormaux.",
            features: [
                "Remontée périodique des mesures de température et d'humidité",
                "Transmission via protocole MQTT léger",
                "Backend de traitement et enregistrement des mesures",
                "Déclenchement d'alertes en cas de dépassement de plage autorisée"
            ],
            security: "Transmission contrôlée des données de capteurs vers le serveur central.",
            tech: ["IoT", "PHP", "C++", "MQTT"],
            github: "https://github.com/MourchidFOLARIN",
            url: null
        }
    };

    const projectModal = document.getElementById('project-modal');

    window.openProjectModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        document.getElementById('modal-project-img').src = data.image;
        document.getElementById('modal-project-title').textContent = data.title;
        
        // Description avec Problème résolu & Aspect sécurité
        let fullDescHtml = `<p>${data.desc}</p>`;
        if (data.problem) {
            fullDescHtml += `<div style="margin-top: 1rem; padding: 0.8rem 1rem; background: rgba(255,255,255,0.03); border-left: 3px solid var(--clr-primary); border-radius: 4px;"><strong style="color: var(--clr-primary);">🎯 Problème résolu :</strong> ${data.problem}</div>`;
        }
        if (data.security) {
            fullDescHtml += `<div style="margin-top: 0.8rem; padding: 0.8rem 1rem; background: rgba(16, 185, 129, 0.05); border-left: 3px solid #10b981; border-radius: 4px;"><strong style="color: #10b981;">🛡️ Aspect Sécurité :</strong> ${data.security}</div>`;
        }
        document.getElementById('modal-project-desc').innerHTML = fullDescHtml;

        const featuresList = document.getElementById('modal-project-features');
        featuresList.innerHTML = '';
        data.features.forEach(f => {
            const li = document.createElement('li');
            li.textContent = f;
            featuresList.appendChild(li);
        });

        const techContainer = document.getElementById('modal-project-tech');
        techContainer.innerHTML = '';
        data.tech.forEach(t => {
            const span = document.createElement('span');
            span.textContent = t;
            techContainer.appendChild(span);
        });

        // Boutons GitHub & Démo
        const modalFooter = document.querySelector('.modal-footer');
        if (modalFooter) {
            let btnsHtml = '';
            if (data.github) {
                btnsHtml += `<a href="${data.github}" target="_blank" class="btn btn-secondary" style="display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; margin-right: 0.8rem;">
                    <span>🐙 Voir sur GitHub</span>
                </a>`;
            }
            if (data.url) {
                btnsHtml += `<a id="modal-project-link" href="${data.url}" target="_blank" class="btn btn-primary" style="display: inline-flex;">
                    <span>Voir le projet en direct →</span>
                </a>`;
            } else {
                btnsHtml += `<span style="color: var(--clr-text-muted); font-size: 0.85rem; align-self: center;">(Démo en environnement de développement / local)</span>`;
            }
            modalFooter.innerHTML = btnsHtml;
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeProjectModal = () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scroll
    };

        // Add click listeners to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.style.cursor = 'pointer';
            card.addEventListener('click', () => {
                const projectId = card.getAttribute('data-project-id');
                if (projectId) openProjectModal(projectId);
            });
        });

        // Initialize Cyber Sandbox Terminal if present on the page
        initCyberSandbox();

        // Initialize the contact form (Web3Forms) if present on the page
        initContactForm();

    }); // End of DOMContentLoaded

// ==========================================================================
// INTERACTIVE CYBER SANDBOX TERMINAL LOGIC
// ==========================================================================
const sandboxCommands = {
    'help': `
<div class="sandbox-res-info">Commandes disponibles :</div>
  - <span style="color:var(--clr-primary)">whoami</span>          : Identité et résumé du profil
  - <span style="color:var(--clr-primary)">stack</span>           : Technologies clés Backend, Sécurité & Systèmes
  - <span style="color:var(--clr-primary)">security-audit</span>  : Simulation d'un scan de sécurité API (OWASP)
  - <span style="color:var(--clr-primary)">projects</span>        : Liste des réalisations phares
  - <span style="color:var(--clr-primary)">distinctions</span>    : Podiums et hackathons primés
  - <span style="color:var(--clr-primary)">contact</span>         : Coordonnées directes et rendez-vous
  - <span style="color:var(--clr-primary)">clear</span>           : Nettoyer la console
`,

    'whoami': `
<div class="sandbox-res-success">👤 Mourchid FOLARIN</div>
  - Statut       : Étudiant Licence 3 Informatique & Télécoms (INSTI Lokossa)
  - Rôles        : Co-fondateur & DG d'Excellence Team | Responsable de promotion L3
  - Spécialité   : Conception Backend résilient, API durcies & Sécurité applicative
  - Localisation : Lokossa / Cotonou, Bénin (Disponible Remote & Déplacements)
`,

    'stack': `
<div class="sandbox-res-info">🛠️ ARCHITECTURE TECHNIQUE :</div>
  [Backend]     PHP 8.2+, Laravel 11, Architecture MVC, MySQL, Eloquent, JWT
  [Sécurité]    OWASP Top 10, Burp Suite, Nmap, Kali Linux, Secure Coding
  [Systèmes]    Linux Debian/Ubuntu, TCP/IP, Wireshark, Bash Scripting, SSH
  [IA & Data]   Python, Scikit-Learn (Random Forest), Pandas, Streamlit
`,

    'security-audit': `
<div class="sandbox-res-info">[AUDIT] Lancement du diagnostic de sécurité OWASP Top 10...</div>
  • Vérification Injections SQL (Prepared Statements) : <span class="sandbox-res-success">[PROTÉGÉ ✓]</span>
  • Contrôle XSS & Sanitization des entrées          : <span class="sandbox-res-success">[VALIDÉ ✓]</span>
  • Politiques CORS & Headers CSP                     : <span class="sandbox-res-success">[DURCI ✓]</span>
  • Authentification sans état par JWT                : <span class="sandbox-res-success">[SÉCURISÉ ✓]</span>
  • Rate Limiting & Protection Brute Force            : <span class="sandbox-res-success">[ACTIF ✓]</span>
<div class="sandbox-res-success">✓ Rapport : Architecture conforme aux meilleures pratiques de Secure Coding.</div>
`,

    'projects': `
<div class="sandbox-res-info">🚀 PROJETS PHARES :</div>
  1. <strong>Sécurité API Laravel</strong>  -> Auth JWT, Rate Limiting & ORM sécurisé
  2. <strong>AcademiX IFRI</strong>         -> Plateforme collaborative révisée en 48h Hackathon
  3. <strong>Fraud Guard AI</strong>        -> Détection transactions suspectes via Random Forest
  4. <strong>ExcellenceLink</strong>        -> Centralisation et validation sécurisée d'URLs
  <span style="color:var(--clr-text-muted)">Tapez ou cliquez sur les cartes ci-dessous pour ouvrir les fiches détaillées.</span>
`,

    'distinctions': `
<div class="sandbox-res-info">🏆 PALMARÈS & COMPÉTITIONS :</div>
  • 🥈 2e Place   : Technova Challenge 2024 (Projet LeTwin)
  • 🥈 2e Place   : EPITNET Hackathon (IA & Santé)
  • 🏅 Demi-Final : HackByIFRI (AcademiX en 48h)
  • 🥉 3e Place   : Opération Nova CTF (Sécurité offensive & CTF)
`,

    'contact': `
<div class="sandbox-res-info">📬 CONTACT DIRECT :</div>
  • Email     : <a href="mailto:mourchidolawale@gmail.com" style="color:var(--clr-primary)">mourchidolawale@gmail.com</a>
  • LinkedIn  : <a href="https://www.linkedin.com/in/mourchid-folarin-283181347/" target="_blank" style="color:var(--clr-primary)">Mourchid FOLARIN</a>
  • GitHub    : <a href="https://github.com/mourchidfolarin" target="_blank" style="color:var(--clr-primary)">github.com/mourchidfolarin</a>
  • Cal.com   : Réservation directe de visioconférence disponible sur la page
`
};

function initCyberSandbox() {
    const input = document.getElementById('sandbox-input');
    if (!input) return;

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSandboxSubmit();
        }
    });
}

// ==========================================================================
// CONTACT FORM LOGIC (Web3Forms — serverless, no backend required)
// ==========================================================================
const WEB3FORMS_ACCESS_KEY = 'a2b3ebad-e1aa-44a5-ab05-8b33cb896ee6';

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const status = document.getElementById('contact-status');
    const submitBtn = form.querySelector('button[type="submit"]');

    function showStatus(message, type) {
        if (!status) return;
        status.textContent = message;
        status.className = 'contact-status ' + type;
        status.style.display = 'block';
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Anti-spam honeypot : si rempli, on simule un succès sans envoyer
        if (form.querySelector('input[name="botcheck"]')?.checked) {
            showStatus('Message envoyé avec succès !', 'success');
            form.reset();
            return;
        }

        const formData = new FormData(form);
        formData.append('access_key', WEB3FORMS_ACCESS_KEY);

        const originalHtml = submitBtn ? submitBtn.innerHTML : '';
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Envoi en cours…</span>';
        }
        showStatus('Envoi de votre message…', 'success');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();

            if (response.ok && data.success) {
                showStatus('Message envoyé avec succès ! Je vous répondrai sous 24h ouvrées.', 'success');
                form.reset();
            } else {
                showStatus('Erreur : ' + (data.message || 'envoi impossible. Merci de réessayer.'), 'error');
            }
        } catch (error) {
            showStatus('Une erreur réseau est survenue. Merci de vérifier votre connexion et de réessayer.', 'error');
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalHtml;
            }
        }
    });
}

window.execSandboxCmd = function (rawCmd) {
    const output = document.getElementById('sandbox-output');
    if (!output) return;

    const cmd = rawCmd.trim().toLowerCase();

    if (cmd === 'clear') {
        output.innerHTML = `
            <div class="sandbox-line">
                <span class="sandbox-prompt-tag">mourchid@cyber-hub:~$</span> <span class="sandbox-cmd-text">clear</span>
            </div>
            <div class="sandbox-line sandbox-res-dim">Console réinitialisée. Tapez 'help' pour la liste des commandes.</div>
        `;
        return;
    }

    // Append Command Line
    const cmdLine = document.createElement('div');
    cmdLine.className = 'sandbox-line';
    cmdLine.innerHTML = `<span class="sandbox-prompt-tag">mourchid@cyber-hub:~$</span> <span class="sandbox-cmd-text">${rawCmd}</span>`;
    output.appendChild(cmdLine);

    // Append Response
    const resLine = document.createElement('div');
    resLine.className = 'sandbox-line';

    if (sandboxCommands[cmd]) {
        resLine.innerHTML = sandboxCommands[cmd];
    } else if (cmd === '') {
        resLine.innerHTML = '';
    } else {
        resLine.innerHTML = `<span style="color:#ef4444">Commande inconnue: "${rawCmd}".</span> Tapez <strong style="color:var(--clr-primary)">'help'</strong> pour voir les commandes reconnues.`;
    }

    output.appendChild(resLine);
    output.scrollTop = output.scrollHeight;
};

window.handleSandboxSubmit = function () {
    const input = document.getElementById('sandbox-input');
    if (!input) return;
    const val = input.value;
    if (!val.trim()) return;
    execSandboxCmd(val);
    input.value = '';
};

// --- Visitor Identity Logic (Global) ---
function toggleVisitorIdentity() {
    const modal = document.getElementById('visitor-modal');
    if (!modal) return;
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        startScan();
    }
}

async function startScan() {
    const scanning = document.getElementById('visitor-scanning');
    const dataSection = document.getElementById('visitor-data');
    if (!scanning || !dataSection) return;

    scanning.style.display = 'flex';
    dataSection.style.display = 'none';

    // Fetch Real IP and Location with multiple reliable fallbacks
    let userIp = 'Collecte...';
    let userLoc = 'Cotonou, Benin';

    try {
        // Provider 1: ipapi.co
        const res = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
        if (res.ok) {
            const data = await res.json();
            if (data.ip) {
                userIp = data.ip;
                userLoc = (data.city && data.country_name) ? `${data.city}, ${data.country_name}` : (data.country_name || 'Bénin');
            }
        }
    } catch (e1) {
        try {
            // Provider 2: ipwho.is
            const res2 = await fetch('https://ipwho.is/', { cache: 'no-store' });
            if (res2.ok) {
                const data2 = await res2.json();
                if (data2.ip) {
                    userIp = data2.ip;
                    userLoc = (data2.city && data2.country) ? `${data2.city}, ${data2.country}` : 'Cotonou, Benin';
                }
            }
        } catch (e2) {
            try {
                // Provider 3: ipify
                const res3 = await fetch('https://api.ipify.org?format=json');
                if (res3.ok) {
                    const data3 = await res3.json();
                    if (data3.ip) userIp = data3.ip;
                }
            } catch (e3) {
                userIp = '2a09:bac5:52b:2c5a::46b:5e';
            }
        }
    }

    const ipElem = document.getElementById('v-ip');
    if (ipElem) ipElem.textContent = userIp;
    const locElem = document.getElementById('v-loc');
    if (locElem) locElem.textContent = userLoc;

    // Accurate Browser & OS detection
    const ua = navigator.userAgent;
    let os = "Linux";
    if (ua.indexOf("Win") !== -1) os = "Windows";
    else if (ua.indexOf("Android") !== -1) os = "Android";
    else if (ua.indexOf("iPhone") !== -1 || ua.indexOf("iPad") !== -1) os = "iOS";
    else if (ua.indexOf("Mac") !== -1) os = "macOS";
    else if (ua.indexOf("Linux") !== -1 || ua.indexOf("X11") !== -1) os = "Linux";
    const osElem = document.getElementById('v-os');
    if (osElem) osElem.textContent = os;

    let browser = "Mozilla Firefox";
    if (ua.indexOf("Firefox") !== -1) browser = "Mozilla Firefox";
    else if (ua.indexOf("Edg") !== -1) browser = "Microsoft Edge";
    else if (ua.indexOf("Chrome") !== -1) browser = "Google Chrome";
    else if (ua.indexOf("Safari") !== -1) browser = "Apple Safari";
    else if (ua.indexOf("OPR") !== -1 || ua.indexOf("Opera") !== -1) browser = "Opera";
    const browserElem = document.getElementById('v-browser');
    if (browserElem) browserElem.textContent = browser;

    // Scan complete animation delay (1.2s realistic scanner)
    setTimeout(() => {
        scanning.style.display = 'none';
        dataSection.style.display = 'block';
        if (typeof gsap !== 'undefined') {
            gsap.from('.visitor-data .data-item', {
                opacity: 0,
                x: -15,
                stagger: 0.08,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }, 1200);
}


