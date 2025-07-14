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
    
    // Colors (not used - hardcoded Google colors)
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
    <!-- Animated Mesh Gradient Overlay -->
    <div class="mesh-gradient"></div>
    
    <!-- Floating Geometric Shapes -->
    <div class="floating-shapes">
        <div class="shape shape-circle" style="top: 10%; left: 5%;"></div>
        <div class="shape shape-square" style="top: 20%; right: 10%;"></div>
        <div class="shape shape-triangle" style="bottom: 30%; left: 15%;"></div>
        <div class="shape shape-circle" style="bottom: 10%; right: 20%;"></div>
        <div class="shape shape-blob" style="top: 50%; left: 80%;"></div>
    </div>
    
    <!-- Hero Section -->
    <header class="hero">
        <div class="hero-bg">
            <div class="hero-overlay"></div>
            <canvas id="particle-animation"></canvas>
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
  css: `/* Premium AI Tech CSS - Google-Inspired Bold Design */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    /* Google Colors */
    --google-blue: #4285f4;
    --google-red: #ea4335;
    --google-yellow: #fbbc04;
    --google-green: #34a853;
    
    /* Text Colors */
    --text-primary: #202124;
    --text-secondary: #5f6368;
    
    /* Backgrounds */
    --bg-white: #ffffff;
    --bg-light: #f8f9fa;
    
    /* Glassmorphism for light theme */
    --glass-bg: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.9);
    --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: 'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: var(--text-primary);
    background-color: var(--bg-white);
    line-height: 1.6;
    overflow-x: hidden;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Animated Mesh Gradient */
.mesh-gradient {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 20% 50%, rgba(66, 133, 244, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(234, 67, 53, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 40% 20%, rgba(251, 188, 4, 0.4) 0%, transparent 50%),
        radial-gradient(circle at 80% 10%, rgba(52, 168, 83, 0.4) 0%, transparent 50%);
    z-index: 2;
    opacity: 0.6;
    animation: meshMove 20s ease-in-out infinite;
    pointer-events: none;
    mix-blend-mode: multiply;
}

@keyframes meshMove {
    0%, 100% {
        transform: translate(0, 0) scale(1) rotate(0deg);
    }
    25% {
        transform: translate(-10%, -10%) scale(1.2) rotate(90deg);
    }
    50% {
        transform: translate(10%, -10%) scale(0.8) rotate(180deg);
    }
    75% {
        transform: translate(-10%, 10%) scale(1.1) rotate(270deg);
    }
}

/* Floating Geometric Shapes */
.floating-shapes {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 3;
}

.shape {
    position: absolute;
    opacity: 0.6;
    animation: float 20s ease-in-out infinite;
}

.shape-circle {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, var(--google-blue), var(--google-red));
    border-radius: 50%;
    filter: blur(1px);
}

.shape-square {
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--google-yellow), var(--google-green));
    border-radius: 15px;
    transform: rotate(45deg);
    filter: blur(1px);
}

.shape-triangle {
    width: 0;
    height: 0;
    border-left: 40px solid transparent;
    border-right: 40px solid transparent;
    border-bottom: 70px solid var(--google-red);
    filter: blur(1px);
}

.shape-blob {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, var(--google-green), var(--google-blue));
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    filter: blur(2px);
    animation: blob 8s ease-in-out infinite;
}

@keyframes float {
    0%, 100% {
        transform: translateY(0) translateX(0) scale(1);
    }
    25% {
        transform: translateY(-30px) translateX(20px) scale(1.1);
    }
    50% {
        transform: translateY(20px) translateX(-20px) scale(0.9);
    }
    75% {
        transform: translateY(-20px) translateX(30px) scale(1.05);
    }
}

@keyframes blob {
    0%, 100% {
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    50% {
        border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
    }
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
        rgba(255, 255, 255, 0.85) 0%, 
        rgba(248, 249, 250, 0.7) 50%, 
        rgba(255, 255, 255, 0.85) 100%);
    backdrop-filter: blur(2px);
}

#particle-animation {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index: 1;
}

.hero-nav {
    position: relative;
    padding: 2rem 0;
    background: transparent;
}

.logo {
    font-size: clamp(1.5rem, 3vw, 2rem);
    font-weight: 700;
    background: linear-gradient(90deg, 
        var(--google-blue) 0%, 
        var(--google-red) 25%, 
        var(--google-yellow) 50%, 
        var(--google-green) 75%,
        var(--google-blue) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: googleGradientFlow 4s linear infinite;
}

@keyframes googleGradientFlow {
    0% {
        background-position: 0% 50%;
    }
    100% {
        background-position: 200% 50%;
    }
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
    font-size: clamp(3rem, 8vw, 5rem);
    font-weight: 900;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    text-transform: uppercase;
    letter-spacing: -0.02em;
}

.title-line {
    display: block;
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.8s ease forwards;
    position: relative;
    text-shadow: 
        0 2px 4px rgba(0,0,0,0.1),
        0 4px 8px rgba(0,0,0,0.08),
        0 8px 16px rgba(0,0,0,0.06);
}

.title-line:nth-child(2) {
    animation-delay: 0.2s;
}

.gradient-text {
    background: linear-gradient(90deg, 
        var(--google-blue) 0%, 
        var(--google-red) 25%, 
        var(--google-yellow) 50%, 
        var(--google-green) 75%,
        var(--google-blue) 100%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: googleGradientFlow 3s linear infinite;
    filter: drop-shadow(0 0 20px rgba(66, 133, 244, 0.3));
}

.hero-subtitle {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto 2rem;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease 0.4s forwards;
    font-weight: 400;
    line-height: 1.6;
}

/* CTA Button */
.cta-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 1.25rem 3rem;
    background: linear-gradient(90deg, var(--google-blue), var(--google-red));
    color: white;
    text-decoration: none;
    border-radius: 50px;
    font-weight: 700;
    font-size: clamp(1rem, 2vw, 1.125rem);
    position: relative;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s ease 0.6s forwards;
    box-shadow: 0 4px 15px rgba(66, 133, 244, 0.3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.cta-button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
}

.cta-button:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 30px rgba(66, 133, 244, 0.4),
                0 15px 40px rgba(234, 67, 53, 0.3);
}

.cta-button:active::before {
    width: 300px;
    height: 300px;
}

/* Magnetic effect container */
.cta-button-wrapper {
    display: inline-block;
    position: relative;
}

.cta-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(66,133,244,0.4) 0%, transparent 70%);
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.6s ease;
    pointer-events: none;
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
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    text-align: center;
    margin-bottom: 3rem;
    opacity: 0;
    transform: translateY(30px);
    font-weight: 900;
    color: var(--text-primary);
    text-transform: uppercase;
    letter-spacing: -0.02em;
    background: linear-gradient(90deg, var(--google-blue), var(--google-red));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

/* Problem Section */
.problem-section {
    background: var(--bg-white);
    position: relative;
}

.problem-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.problem-card {
    background: var(--glass-bg);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 2px solid var(--glass-border);
    border-radius: 24px;
    padding: 2.5rem;
    text-align: center;
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
    box-shadow: var(--glass-shadow);
    position: relative;
    overflow: hidden;
    transform-style: preserve-3d;
    will-change: transform;
}

.problem-card::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(90deg, var(--google-blue), var(--google-red), var(--google-yellow), var(--google-green));
    border-radius: 24px;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
}

.problem-card:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.problem-card:hover::before {
    opacity: 0.5;
}

.card-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.problem-card h3 {
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    margin-bottom: 1rem;
    color: var(--text-primary);
    font-weight: 700;
}

.problem-card p {
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Solution Section */
.solution-section {
    background: var(--bg-light);
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
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 2px solid var(--glass-border);
    border-radius: 24px;
    padding: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
    opacity: 0;
    animation: floatCard 6s ease-in-out infinite;
    box-shadow: var(--glass-shadow);
    background: linear-gradient(135deg, 
        rgba(66, 133, 244, 0.1), 
        rgba(234, 67, 53, 0.1));
}

@keyframes floatCard {
    0%, 100% {
        opacity: 0.8;
        transform: translateY(0) rotate(0deg);
    }
    50% {
        opacity: 1;
        transform: translateY(-20px) rotate(5deg);
    }
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
  js: `// 3D Tilt Effect for Cards
function initTiltEffect() {
    const cards = document.querySelectorAll('.problem-card, .stat-card, .faq-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg) scale(1.02)\`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px) scale(1.05)\`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0) scale(1)';
        });
    });
}

// Network Animation on Canvas
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

            // Draw particle with Google colors
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            const colors = ['rgba(66, 133, 244, 0.8)', 'rgba(234, 67, 53, 0.8)', 'rgba(251, 188, 4, 0.8)', 'rgba(52, 168, 83, 0.8)'];
            this.ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
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
                    this.ctx.strokeStyle = \`rgba(66, 133, 244, \${0.3 * (1 - distance / 150)})\`;
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
    const canvas = document.getElementById('particle-animation');
    if (canvas) {
        new NetworkAnimation(canvas);
    }
    
    // Initialize interactive effects
    initTiltEffect();
    initMagneticButtons();

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