document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger);

    // Loader Animation
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
        { cmd: "ls expertise/", output: "backend/ ai/ systems/" },
        { cmd: "cat expertise/backend/skills.txt", output: "> Laravel, PHP, API Architecture, SQL, Redis" },
        { cmd: "cat expertise/ai/models.txt", output: "> Machine Learning, Deep Learning, TensorRT, CV" },
        { cmd: "cat expertise/systems/iot.txt", output: "> Linux Admin, Embedded C++, Sensor Fusion" },
        { cmd: "ls expertise/hardware/", output: "mcu/ pcb_design/ firmware/" },
        { cmd: "cat expertise/hardware/mcu.list", output: "> STM32 (HAL/LL), ESP32-IDF, Arduino, FreeRTOS" },
        { cmd: "status --system", output: "All systems operational. Ready for deployment." }
    ];

    async function typeTerminal() {
        for (const item of skillsData) {
            // Type Command
            let cmdLine = document.createElement('div');
            cmdLine.className = 'terminal-line';
            cmdLine.innerHTML = `<span class="terminal-prompt">mourchid@portfolio:~$</span> <span class="typing"></span>`;
            terminalBody.insertBefore(cmdLine, terminalBody.lastElementChild);
            
            let typingSpan = cmdLine.querySelector('.typing');
            for (let char of item.cmd) {
                typingSpan.textContent += char;
                await new Promise(r => setTimeout(r, 40));
            }

            // Show Output
            let outputLine = document.createElement('div');
            outputLine.className = 'terminal-line';
            outputLine.style.color = '#fff';
            outputLine.style.opacity = '0';
            outputLine.textContent = item.output;
            terminalBody.insertBefore(outputLine, terminalBody.lastElementChild);
            
            gsap.to(outputLine, { opacity: 0.7, duration: 0.5 });
            await new Promise(r => setTimeout(r, 800));
        }
    }

    // Trigger terminal when in view
    ScrollTrigger.create({
        trigger: ".terminal-container",
        start: "top 80%",
        onEnter: () => typeTerminal()
    });

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
        labVisualizer.innerHTML = '<div style="color: var(--clr-primary); font-family: monospace;">[ LARAVEL_KERNEL_BOOTED ]</div>';
        await addLog("Request: GET /api/v1/sensors/data", "#10b981");
        await addLog("Middleware: SanctumAuth... PASS");
        await addLog("Middleware: ThrottleRequests... PASS");
        await addLog("Controller: SensorController@index invoked");
        await addLog("Service: IoTDataMapper processing raw bytes...");
        await addLog("Eloquent: SELECT * FROM 'sensor_logs' WHERE 'status' = 'active'", "#3b82f6");
        await addLog("Resource: Data collection transformed to JSON");
        await addLog("Response: 200 OK (Content-Length: 4.2kb)", "#10b981");
    }

    async function simulateML() {
        labVisualizer.innerHTML = '<div class="ml-chart"></div>';
        const chart = labVisualizer.querySelector('.ml-chart');
        
        await addLog("Initializing TensorRT backend...");
        await addLog("Loading pre-trained model: predictive_maintenance_v3.h5");
        
        const bars = [];
        for(let i=0; i<8; i++) {
            let bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = '10px';
            chart.appendChild(bar);
            bars.push(bar);
        }

        await addLog("Streaming live sensor data...");
        for(let i=0; i<10; i++) {
            bars.forEach(bar => {
                const h = Math.random() * 80;
                bar.style.height = `${h}px`;
                bar.style.background = h > 60 ? '#f92672' : '#10b981';
            });
            await addLog(`Processing Frame ${i+1}/10...`, "#a0a0a0", 200);
        }
        
        await addLog("Result: FAILURE_PROBABILITY = 12.4% (Healthy)", "#10b981");
    }

    async function simulateSecurity() {
        labVisualizer.innerHTML = '<div style="color: #f92672; font-family: monospace; font-size: 0.8rem;">[ SECURITY_SCAN_IN_PROGRESS ]</div>';
        await addLog("Sanitizing Request Inputs...");
        await addLog("Checking for SQL Injection patterns...");
        await addLog("Pattern Match: 'OR 1=1'... NOT_FOUND", "#10b981");
        await addLog("Checking for XSS payloads...");
        await addLog("Escape HTML Entities: OK");
        await addLog("CORS Policy: Strict-Origin-When-Cross-Origin... CHECKED");
        await addLog("Security Headers: Content-Security-Policy... OK", "#10b981");
        await addLog("THREAT_LEVEL: 0 (Secure Architecture)", "#10b981");
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
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
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
        'smart-fridge': {
            title: "Réfrigération Intelligente",
            image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?auto=format&fit=crop&w=800&q=80",
            desc: "Une solution IoT industrielle de pointe pour la surveillance de la chaîne du froid. Le système utilise des capteurs haute précision pour surveiller la température et l'humidité en temps réel.",
            features: [
                "Surveillance temps réel avec protocole MQTT",
                "Tableau de bord de maintenance prédictive (ML)",
                "Système d'alerte instantané via WhatsApp/SMS",
                "Génération automatique de rapports de conformité"
            ],
            tech: ["Laravel", "C++", "MQTT", "TensorFlow"],
            url: "https://team-d-excellence-hackbyifri-2026.vercel.app/landing"
        },
        'climatrack': {
            title: "ClimaTrack Bénin",
            image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80",
            desc: "Un projet innovant visant à optimiser le confort thermique dans les bâtiments au Bénin. ClimaTrack utilise des données environnementales pour ajuster intelligemment les systèmes de ventilation.",
            features: [
                "Analyse du microclimat intérieur",
                "Algorithmes d'optimisation énergétique",
                "Interface de contrôle intuitive pour usagers",
                "Historisation complète des données environnementales"
            ],
            tech: ["Linux", "Python", "React", "Architecture Cloud"],
            url: "https://team-d-excellence-hackbyifri-2026.vercel.app/landing"
        },
        'api-security': {
            title: "Sécurité API & Architecture",
            image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&w=800&q=80",
            desc: "Développement d'architectures backend ultra-sécurisées pour des applications critiques. Focus particulier sur la protection contre les attaques sophistiquées et la gestion fine des accès.",
            features: [
                "Authentification multi-facteurs (MFA)",
                "Système de RBAC (Role-Based Access Control) granulaire",
                "Audit logs immuables pour la traçabilité",
                "Protection avancée contre SQLi, XSS et CSRF"
            ],
            tech: ["Laravel", "Sécurité", "Architecture", "JWT"],
            url: "https://team-d-excellence-hackbyifri-2026.vercel.app/landing"
        },
        'stm32-controller': {
            title: "Contrôleur Industriel STM32",
            image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
            desc: "Développement d'un contrôleur de précision sur base STM32 pour des environnements industriels exigeants. Le projet inclut la conception du PCB, le firmware temps réel et l'intégration de bus de communication.",
            features: [
                "Conception de PCB multicouches optimisée pour l'EMC",
                "Firmware temps réel avec FreeRTOS et gestion des priorités",
                "Communication via bus RS485 (Modbus RTU) et CAN",
                "Interface Homme-Machine (HMI) sur écran OLED/TFT"
            ],
            tech: ["STM32", "C++/C", "FreeRTOS", "KiCad"],
            url: "https://team-d-excellence-hackbyifri-2026.vercel.app/landing"
        },
        'academix': {
            title: "AcademiX — Plateforme Éducative IA",
            image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
            desc: "AcademiX est une solution Visionnaire pour les étudiants, intégrant l'IA pour transformer des cours denses en outils de réussite. Développé pour un Hackathon (IFRI), le projet a cartonné par son approche UX et ses innovations IA.",
            features: [
                "Smart Summary : Résumés automatiques de cours par IA générative",
                "Audio Learning : Génération de podcasts à partir de supports textuels",
                "Quiz Gen : Création de tests d'auto-évaluation personnalisés",
                "Espace Lab : Tableau blanc et éditeur de code collaboratif",
                "Tutorat IA : Assistant académique disponible 23h/7j"
            ],
            tech: ["React", "Laravel", "Python/GPT", "Tailwind", "Remotion"],
            url: "https://team-d-excellence-hackbyifri-2026.vercel.app/landing"
        }
    };

    const projectModal = document.getElementById('project-modal');
    
    window.openProjectModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        document.getElementById('modal-project-img').src = data.image;
        document.getElementById('modal-project-title').textContent = data.title;
        document.getElementById('modal-project-desc').textContent = data.desc;

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

        // Set Project Link
        const linkBtn = document.getElementById('modal-project-link');
        if (data.url) {
            linkBtn.href = data.url;
            linkBtn.style.display = 'inline-flex';
        } else {
            linkBtn.style.display = 'none';
        }

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scroll
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
    // --- Contact Form Submission ---
    const contactForm = document.getElementById('contact-form');
    const contactStatus = document.getElementById('contact-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Disable button and show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Envoi en cours...</span>';

            // Prepare for response
            contactStatus.className = 'contact-status';
            contactStatus.style.display = 'none';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('process.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                contactStatus.textContent = result.message;
                contactStatus.className = `contact-status ${result.success ? 'success' : 'error'}`;
                
                if (result.success) {
                    contactForm.reset();
                }
            } catch (error) {
                contactStatus.textContent = "Une erreur est survenue lors de l'envoi.";
                contactStatus.className = 'contact-status error';
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                
                // Animate status message
                gsap.from(contactStatus, {
                    y: 10,
                    opacity: 0,
                    duration: 0.4,
                    ease: 'power2.out'
                });
            }
        });
    }

}); // End of DOMContentLoaded

// --- Visitor Identity Logic (Global) ---
function toggleVisitorIdentity() {
    const modal = document.getElementById('visitor-modal');
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) {
        startScan();
    }
}

async function startScan() {
    const scanning = document.getElementById('visitor-scanning');
    const dataSection = document.getElementById('visitor-data');
    
    scanning.style.display = 'flex';
    dataSection.style.display = 'none';
    
    // Fetch IP and Info
    try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        document.getElementById('v-ip').textContent = data.ip || 'UNKNOWN';
        document.getElementById('v-loc').textContent = `${data.city}, ${data.country_name}` || 'ANONYMOUS';
    } catch (e) {
        document.getElementById('v-ip').textContent = '127.0.0.1 (LOCAL)';
    }

    // Browser & OS detection
    const ua = navigator.userAgent;
    let os = "Unknown OS";
    if (ua.indexOf("Win") != -1) os = "Windows";
    if (ua.indexOf("Mac") != -1) os = "MacOS";
    if (ua.indexOf("Linux") != -1) os = "Linux";
    if (ua.indexOf("Android") != -1) os = "Android";
    if (ua.indexOf("like Mac") != -1) os = "iOS";
    document.getElementById('v-os').textContent = os;

    let browser = "Unknown Browser";
    if (ua.indexOf("Chrome") != -1) browser = "Google Chrome";
    else if (ua.indexOf("Firefox") != -1) browser = "Mozilla Firefox";
    else if (ua.indexOf("Safari") != -1) browser = "Apple Safari";
    document.getElementById('v-browser').textContent = browser;

    // Completion delay
    setTimeout(() => {
        scanning.style.display = 'none';
        dataSection.style.display = 'flex';
        gsap.from('.data-item', {
            opacity: 0,
            x: -20,
            stagger: 0.1,
            duration: 0.5
        });
    }, 2000);
}
