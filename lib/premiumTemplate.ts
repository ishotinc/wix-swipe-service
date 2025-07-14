import { Template } from "@/types";

// Premium AI/Tech template based on teaser-lp.html
export const premiumAITemplate: Template = {
  id: "premium-ai-tech",
  name: "Premium AI Tech",
  style: "premium",
  variables: [
    // Hero Section
    "companyName",
    "heroTitle",
    "heroTitleLine2",
    "heroSubtitle",
    "ctaButtonText",
    
    // Problem Section
    "problemTitle1",
    "problemDesc1",
    "problemTitle2", 
    "problemDesc2",
    "problemTitle3",
    "problemDesc3",
    
    // Solution Section
    "solutionTitle",
    "solutionSubtitle",
    "solutionFeature1",
    "solutionFeature2",
    "solutionFeature3",
    "solutionFeature4",
    
    // Results Section
    "stat1Number",
    "stat1Label",
    "stat2Number",
    "stat2Label",
    "stat3Number",
    "stat3Label",
    
    // CTA Section
    "ctaTitle",
    "ctaSubtitle",
    "ctaLink",
    
    // Profile Section
    "profileTitle",
    "profileContent",
    
    // FAQ Section
    "faq1Question",
    "faq1Answer",
    "faq2Question",
    "faq2Answer",
    "faq3Question",
    "faq3Answer",
    
    // Colors
    "primaryColor",
    "accentColor"
  ],
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{companyName}} - {{heroTitle}}</title>
    <meta name="description" content="{{heroSubtitle}}">
    
    <!-- Preload critical resources -->
    <link rel="preload" href="/teaser2.jpg" as="image">
    
    <!-- Open Graph -->
    <meta property="og:title" content="{{companyName}} - {{heroTitle}}">
    <meta property="og:description" content="{{heroSubtitle}}">
    <meta property="og:type" content="website">
    
    <style>{{{css}}}</style>
</head>
<body>
    <!-- Hero Section -->
    <header class="hero">
        <div class="hero-bg">
            <div class="hero-overlay"></div>
            <canvas id="network-animation"></canvas>
        </div>
        <nav class="hero-nav">
            <div class="container">
                <div class="logo">{{companyName}}</div>
            </div>
        </nav>
        <div class="hero-content">
            <div class="container">
                <h1 class="hero-title">
                    <span class="title-line">{{heroTitle}}</span>
                    <span class="title-line gradient-text">{{heroTitleLine2}}</span>
                </h1>
                <p class="hero-subtitle">{{heroSubtitle}}</p>
                <a href="{{ctaLink}}" class="cta-button">
                    <span class="cta-text">{{ctaButtonText}}</span>
                    <span class="cta-glow"></span>
                </a>
            </div>
        </div>
    </header>

    <!-- Problem Section -->
    <section class="problem-section" id="problem">
        <div class="container">
            <h2 class="section-title">The Challenge</h2>
            <div class="problem-grid">
                <div class="problem-card">
                    <div class="card-icon">⏱️</div>
                    <h3>{{problemTitle1}}</h3>
                    <p>{{problemDesc1}}</p>
                </div>
                <div class="problem-card">
                    <div class="card-icon">💸</div>
                    <h3>{{problemTitle2}}</h3>
                    <p>{{problemDesc2}}</p>
                </div>
                <div class="problem-card">
                    <div class="card-icon">🎨</div>
                    <h3>{{problemTitle3}}</h3>
                    <p>{{problemDesc3}}</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Solution Section -->
    <section class="solution-section" id="solution">
        <div class="container">
            <h2 class="section-title">Our Solution</h2>
            <div class="solution-content">
                <div class="solution-text">
                    <h3>{{solutionTitle}}</h3>
                    <p>{{solutionSubtitle}}</p>
                    <ul class="solution-features">
                        <li>{{solutionFeature1}}</li>
                        <li>{{solutionFeature2}}</li>
                        <li>{{solutionFeature3}}</li>
                        <li>{{solutionFeature4}}</li>
                    </ul>
                </div>
                <div class="solution-visual">
                    <div class="floating-cards">
                        <div class="float-card card-1">AI</div>
                        <div class="float-card card-2">Design</div>
                        <div class="float-card card-3">Launch</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Results Section -->
    <section class="results-section" id="results">
        <div class="container">
            <h2 class="section-title">Proven Results</h2>
            <div class="stats-grid">
                <div class="stat-card">
                    <div class="stat-number" data-count="{{stat1Number}}">0</div>
                    <div class="stat-label">{{stat1Label}}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-count="{{stat2Number}}">0</div>
                    <div class="stat-label">{{stat2Label}}</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number" data-count="{{stat3Number}}">0</div>
                    <div class="stat-label">{{stat3Label}}</div>
                </div>
            </div>
        </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section" id="start">
        <div class="container">
            <h2 class="cta-title">{{ctaTitle}}</h2>
            <p class="cta-subtitle">{{ctaSubtitle}}</p>
            <a href="{{ctaLink}}" class="cta-button cta-primary">
                <span class="cta-text">{{ctaButtonText}}</span>
                <span class="cta-glow"></span>
            </a>
        </div>
    </section>

    <!-- Profile Section -->
    <section class="profile-section" id="about">
        <div class="container">
            <h2 class="section-title">{{profileTitle}}</h2>
            <div class="profile-content">
                <p>{{profileContent}}</p>
                <div class="tech-stack">
                    <span class="tech-badge">AI-Powered</span>
                    <span class="tech-badge">Next.js</span>
                    <span class="tech-badge">Cloud Native</span>
                    <span class="tech-badge">Enterprise Ready</span>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section" id="faq">
        <div class="container">
            <h2 class="section-title">Frequently Asked Questions</h2>
            <div class="faq-accordion">
                <div class="faq-item">
                    <button class="faq-question">
                        <span>{{faq1Question}}</span>
                        <svg class="faq-icon" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <div class="faq-answer">
                        <p>{{faq1Answer}}</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">
                        <span>{{faq2Question}}</span>
                        <svg class="faq-icon" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <div class="faq-answer">
                        <p>{{faq2Answer}}</p>
                    </div>
                </div>
                <div class="faq-item">
                    <button class="faq-question">
                        <span>{{faq3Question}}</span>
                        <svg class="faq-icon" viewBox="0 0 24 24">
                            <path d="M7 10l5 5 5-5z"/>
                        </svg>
                    </button>
                    <div class="faq-answer">
                        <p>{{faq3Answer}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <p>&copy; {{companyName}} All Rights Reserved.</p>
                <button class="privacy-link" onclick="openPrivacyModal()">Privacy Policy</button>
            </div>
        </div>
    </footer>

    <!-- Privacy Policy Modal -->
    <div class="modal" id="privacyModal">
        <div class="modal-content">
            <button class="modal-close" onclick="closePrivacyModal()">&times;</button>
            <h2>Privacy Policy</h2>
            <div class="modal-body">
                <p>Last updated: January 2025</p>
                <h3>Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
                <h3>How We Use Your Information</h3>
                <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
                <h3>Data Security</h3>
                <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
                <h3>Contact Us</h3>
                <p>If you have any questions about this Privacy Policy, please contact us.</p>
            </div>
        </div>
    </div>

    <script>{{{js}}}</script>
</body>
</html>`,
  css: `/* Premium AI Tech CSS - Glassmorphism & Modern Effects */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --primary-blue: {{primaryColor}};
    --dark-blue: #001a33;
    --light-blue: #4d94ff;
    --accent-blue: {{accentColor}};
    --text-primary: #ffffff;
    --text-secondary: #b3d9ff;
    --bg-dark: #000d1a;
    --glass-bg: rgba(255, 255, 255, 0.05);
    --glass-border: rgba(255, 255, 255, 0.1);
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--text-primary);
    background-color: var(--bg-dark);
    line-height: 1.6;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero Section */
.hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.hero-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
}

.hero-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('/teaser2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

.hero-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, 
        rgba(0, 13, 26, 0.9) 0%, 
        rgba(0, 26, 51, 0.7) 50%, 
        rgba(0, 13, 26, 0.9) 100%);
    backdrop-filter: blur(3px);
}

#network-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.3;
}

.hero-nav {
    position: relative;
    padding: 2rem 0;
    background: transparent;
}

.logo {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    background: linear-gradient(135deg, var(--light-blue), var(--accent-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 0;
    text-align: center;
}

.hero-title {
    font-size: clamp(2rem, 6vw, 4rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    line-height: 1.2;
}

.title-line {
    display: block;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s ease forwards;
}

.title-line:nth-child(2) {
    animation-delay: 0.2s;
}

.gradient-text {
    background: linear-gradient(135deg, var(--light-blue), var(--accent-blue));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.hero-subtitle {
    font-size: clamp(1rem, 2.5vw, 1.25rem);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 2rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease 0.4s forwards;
}

/* CTA Button */
.cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 2.5rem;
    background: linear-gradient(135deg, var(--primary-blue), var(--light-blue));
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 600;
    font-size: clamp(1rem, 2vw, 1.125rem);
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease 0.6s forwards;
}

.cta-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(0, 102, 255, 0.4);
}

.cta-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.6s ease;
}

.cta-button:hover .cta-glow {
    transform: translate(-50%, -50%) scale(2);
}

/* Sections Base */
section {
    padding: clamp(3rem, 10vw, 6rem) 0;
    position: relative;
}

.section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    text-align: center;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
}

/* Problem Section */
.problem-section {
    background: linear-gradient(180deg, var(--bg-dark) 0%, rgba(0, 26, 51, 0.3) 100%);
}

.problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.problem-card {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.problem-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 102, 255, 0.1);
}

.card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.problem-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--light-blue);
}

/* Solution Section */
.solution-section {
    background: transparent;
    position: relative;
}

.solution-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
}

.solution-features {
    list-style: none;
    margin-top: 2rem;
}

.solution-features li {
    padding: 0.75rem 0;
    padding-left: 2rem;
    position: relative;
    opacity: 0;
    transform: translateX(-20px);
}

.solution-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: var(--accent-blue);
    font-weight: bold;
}

.floating-cards {
    position: relative;
    height: 400px;
}

.float-card {
    position: absolute;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    padding: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--light-blue);
    opacity: 0;
    animation: float 6s ease-in-out infinite;
}

.card-1 {
    top: 20%;
    left: 10%;
    animation-delay: 0s;
}

.card-2 {
    top: 40%;
    right: 20%;
    animation-delay: 2s;
}

.card-3 {
    bottom: 20%;
    left: 30%;
    animation-delay: 4s;
}

/* Results Section */
.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
}

.stat-card {
    text-align: center;
    padding: 2rem;
    opacity: 0;
    transform: scale(0.8);
}

.stat-number {
    font-size: clamp(3rem, 6vw, 4rem);
    font-weight: 700;
    color: var(--accent-blue);
    margin-bottom: 0.5rem;
}

/* CTA Section */
.cta-section {
    background: linear-gradient(135deg, rgba(0, 102, 255, 0.1) 0%, rgba(0, 204, 255, 0.1) 100%);
    text-align: center;
    border-radius: 30px;
    margin: 2rem 0;
}

.cta-primary {
    font-size: 1.25rem;
    padding: 1.25rem 3rem;
}

/* Profile Section */
.profile-content {
    max-width: 800px;
    margin: 0 auto;
    text-align: center;
}

.tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

.tech-badge {
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.875rem;
    opacity: 0;
    transform: scale(0.8);
}

/* FAQ Section */
.faq-section {
    background: transparent;
}

.faq-accordion {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    margin-bottom: 1rem;
    opacity: 0;
    transform: translateY(20px);
}

.faq-question {
    width: 100%;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border: 1px solid var(--glass-border);
    padding: 1.5rem;
    border-radius: 15px;
    font-size: 1.125rem;
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
}

.faq-question:hover {
    background: rgba(255, 255, 255, 0.08);
}

.faq-icon {
    width: 24px;
    height: 24px;
    fill: currentColor;
    transition: transform 0.3s ease;
}

.faq-item.active .faq-icon {
    transform: rotate(180deg);
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
}

.faq-item.active .faq-answer {
    max-height: 200px;
    padding: 1rem 1.5rem;
}

/* Footer */
.footer {
    background: var(--bg-dark);
    padding: 2rem 0;
    text-align: center;
    border-top: 1px solid var(--glass-border);
}

.footer-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    flex-wrap: wrap;
}

.privacy-link {
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    text-decoration: underline;
    font-size: inherit;
    transition: color 0.3s ease;
}

.privacy-link:hover {
    color: var(--light-blue);
}

/* Modal */
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1000;
    padding: 2rem;
    overflow-y: auto;
}

.modal.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-content {
    background: var(--bg-dark);
    border: 1px solid var(--glass-border);
    border-radius: 20px;
    max-width: 800px;
    width: 100%;
    padding: 2rem;
    position: relative;
    max-height: 90vh;
    overflow-y: auto;
}

.modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: var(--text-primary);
    font-size: 2rem;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.3s ease;
}

.modal-close:hover {
    background: var(--glass-bg);
}

.modal-body h3 {
    color: var(--light-blue);
    margin: 1.5rem 0 0.5rem;
}

/* Animations */
@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.8;
    }
    25% {
        transform: translateY(-20px) rotate(5deg);
        opacity: 1;
    }
    75% {
        transform: translateY(10px) rotate(-5deg);
        opacity: 0.9;
    }
}

/* Intersection Observer Animation Classes */
.animate-fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.animate-fade-up.visible {
    opacity: 1;
    transform: translateY(0);
}

.animate-scale {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.animate-scale.visible {
    opacity: 1;
    transform: scale(1);
}

.animate-slide {
    opacity: 0;
    transform: translateX(-20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-slide.visible {
    opacity: 1;
    transform: translateX(0);
}

/* Responsive Design */
@media (max-width: 768px) {
    .solution-content {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .floating-cards {
        height: 250px;
        margin-top: 2rem;
    }

    .float-card {
        font-size: 1.2rem;
        padding: 1.5rem;
    }

    .hero-title {
        font-size: clamp(1.75rem, 5vw, 3rem);
    }

    .problem-grid {
        grid-template-columns: 1fr;
    }

    .stats-grid {
        grid-template-columns: 1fr;
    }

    .footer-content {
        flex-direction: column;
        gap: 1rem;
    }
}

/* Reduced Motion Support */
@media (prefers-reduced-motion: reduce) {
    * {
        animation: none !important;
        transition: none !important;
    }
}`,
  js: `// Network Animation on Canvas
class NetworkAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.connections = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
        this.animate();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Create particles
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1
            });
        }
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update particles
        this.particles.forEach(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 204, 255, 0.8)';
            this.ctx.fill();
        });

        // Draw connections
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = \`rgba(0, 204, 255, \${0.2 * (1 - distance / 150)})\`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('network-animation');
    if (canvas) {
        new NetworkAnimation(canvas);
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for staggered animations
                if (entry.target.classList.contains('problem-card')) {
                    const cards = document.querySelectorAll('.problem-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    });
                }

                if (entry.target.classList.contains('solution-features') && entry.target.querySelector('li')) {
                    const items = entry.target.querySelectorAll('li');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 100);
                    });
                }

                if (entry.target.classList.contains('tech-badge')) {
                    const badges = document.querySelectorAll('.tech-badge');
                    badges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.style.opacity = '1';
                            badge.style.transform = 'scale(1)';
                        }, index * 50);
                    });
                }
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.section-title').forEach(el => {
        el.classList.add('animate-fade-up');
        observer.observe(el);
    });

    document.querySelectorAll('.problem-card').forEach(el => {
        el.classList.add('animate-fade-up');
        observer.observe(el);
    });

    document.querySelectorAll('.solution-content').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.solution-features').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.stat-card').forEach(el => {
        el.classList.add('animate-scale');
        observer.observe(el);
    });

    document.querySelectorAll('.tech-badge').forEach(el => {
        observer.observe(el);
    });

    document.querySelectorAll('.faq-item').forEach(el => {
        el.classList.add('animate-fade-up');
        observer.observe(el);
    });

    // Animated counter for stats
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.innerHTML = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.innerHTML = end + (element.getAttribute('data-count') === '1000' ? '+' : '');
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observe stat numbers
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const endValue = parseInt(entry.target.getAttribute('data-count'));
                animateValue(entry.target, 0, endValue, 2000);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-number').forEach(el => {
        statObserver.observe(el);
    });

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked item if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // Smooth parallax effect on hero
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-bg');
        if (parallax) {
            parallax.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
        }
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
});

// Privacy Modal Functions
function openPrivacyModal() {
    document.getElementById('privacyModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closePrivacyModal() {
    document.getElementById('privacyModal').classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('privacyModal');
    if (e.target === modal) {
        closePrivacyModal();
    }
});`
};