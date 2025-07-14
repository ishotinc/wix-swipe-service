import { Template } from "@/types";
import { premiumAITemplate } from "./premiumTemplate";

// 6 pre-built templates with variable system (including premium)
export const wixTemplates: Template[] = [
  premiumAITemplate, // Premium template as first option
  {
    id: "minimal-portfolio",
    name: "Minimal Portfolio",
    style: "minimal",
    variables: [
      "heroTitle",
      "heroSubtitle",
      "primaryColor",
      "backgroundColor",
      "projectTitle1",
      "projectDescription1",
      "projectTitle2",
      "projectDescription2",
      "projectTitle3",
      "projectDescription3",
      "contactEmail",
      "contactPhone"
    ],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{heroTitle}} - Minimal Portfolio</title>
    <style>{{{css}}}</style>
</head>
<body>
    <header class="header">
        <nav class="nav">
            <div class="logo">{{heroTitle}}</div>
            <ul class="nav-links">
                <li><a href="#work">Work</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <section class="hero">
        <h1 class="hero-title">{{heroTitle}}</h1>
        <p class="hero-subtitle">{{heroSubtitle}}</p>
    </section>
    
    <section id="work" class="projects">
        <div class="project">
            <h3>{{projectTitle1}}</h3>
            <p>{{projectDescription1}}</p>
        </div>
        <div class="project">
            <h3>{{projectTitle2}}</h3>
            <p>{{projectDescription2}}</p>
        </div>
        <div class="project">
            <h3>{{projectTitle3}}</h3>
            <p>{{projectDescription3}}</p>
        </div>
    </section>
    
    <section id="contact" class="contact">
        <h2>Get in Touch</h2>
        <p>Email: {{contactEmail}}</p>
        <p>Phone: {{contactPhone}}</p>
    </section>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: {{backgroundColor}};
    color: {{primaryColor}};
    line-height: 1.6;
}

.header {
    padding: 2rem 5%;
    position: fixed;
    width: 100%;
    top: 0;
    background: {{backgroundColor}};
    z-index: 100;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: {{primaryColor}};
    text-decoration: none;
    transition: opacity 0.3s;
}

.nav-links a:hover {
    opacity: 0.6;
}

.hero {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 2rem;
}

.hero-title {
    font-size: clamp(2rem, 5vw, 4rem);
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: clamp(1rem, 2vw, 1.5rem);
    opacity: 0.8;
}

.projects {
    padding: 5rem 10%;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 3rem;
}

.project {
    padding: 2rem;
    border: 1px solid {{primaryColor}};
    transition: transform 0.3s;
}

.project:hover {
    transform: translateY(-5px);
}

.contact {
    padding: 5rem 10%;
    text-align: center;
}`
  },
  {
    id: "corporate-professional",
    name: "Corporate Professional",
    style: "corporate",
    variables: [
      "companyName",
      "tagline",
      "primaryColor",
      "secondaryColor",
      "service1Title",
      "service1Description",
      "service2Title",
      "service2Description",
      "service3Title",
      "service3Description",
      "ctaButtonText",
      "contactInfo"
    ],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{companyName}} - Professional Services</title>
    <style>{{{css}}}</style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="nav">
                <h1 class="logo">{{companyName}}</h1>
                <nav>
                    <a href="#services">Services</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </nav>
            </div>
        </div>
    </header>
    
    <section class="hero">
        <div class="container">
            <h2 class="hero-title">{{companyName}}</h2>
            <p class="tagline">{{tagline}}</p>
            <button class="cta-button">{{ctaButtonText}}</button>
        </div>
    </section>
    
    <section id="services" class="services">
        <div class="container">
            <h2 class="section-title">Our Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>{{service1Title}}</h3>
                    <p>{{service1Description}}</p>
                </div>
                <div class="service-card">
                    <h3>{{service2Title}}</h3>
                    <p>{{service2Description}}</p>
                </div>
                <div class="service-card">
                    <h3>{{service3Title}}</h3>
                    <p>{{service3Description}}</p>
                </div>
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <div class="container">
            <p>{{contactInfo}}</p>
        </div>
    </footer>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    color: #333;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: {{primaryColor}};
    color: white;
    padding: 1rem 0;
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1000;
}

.nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
}

nav a {
    color: white;
    text-decoration: none;
    margin-left: 2rem;
    transition: opacity 0.3s;
}

nav a:hover {
    opacity: 0.8;
}

.hero {
    background: linear-gradient(135deg, {{primaryColor}}, {{secondaryColor}});
    color: white;
    padding: 10rem 0 5rem;
    text-align: center;
}

.hero-title {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.tagline {
    font-size: 1.25rem;
    margin-bottom: 2rem;
}

.cta-button {
    background: white;
    color: {{primaryColor}};
    border: none;
    padding: 1rem 2rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s;
}

.cta-button:hover {
    transform: scale(1.05);
}

.services {
    padding: 5rem 0;
    background: #f8f9fa;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: {{primaryColor}};
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.service-card {
    background: white;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

.service-card:hover {
    transform: translateY(-5px);
}

.footer {
    background: {{primaryColor}};
    color: white;
    text-align: center;
    padding: 2rem 0;
}`
  },
  {
    id: "creative-vibrant",
    name: "Creative Vibrant",
    style: "creative",
    variables: [
      "brandName",
      "headline",
      "subheadline",
      "primaryColor",
      "accentColor",
      "feature1",
      "feature2",
      "feature3",
      "callToAction",
      "socialLink1",
      "socialLink2",
      "socialLink3"
    ],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{brandName}} - Creative Studio</title>
    <style>{{{css}}}</style>
</head>
<body>
    <div class="gradient-bg"></div>
    
    <header class="header">
        <div class="brand">{{brandName}}</div>
        <div class="menu-toggle">≡</div>
    </header>
    
    <main class="main">
        <section class="hero">
            <h1 class="headline">{{headline}}</h1>
            <p class="subheadline">{{subheadline}}</p>
            <div class="cta-container">
                <button class="cta-primary">{{callToAction}}</button>
            </div>
        </section>
        
        <section class="features">
            <div class="feature-card">
                <div class="feature-icon">✨</div>
                <p>{{feature1}}</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <p>{{feature2}}</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">💡</div>
                <p>{{feature3}}</p>
            </div>
        </section>
    </main>
    
    <footer class="footer">
        <div class="social-links">
            <a href="{{socialLink1}}">Instagram</a>
            <a href="{{socialLink2}}">Twitter</a>
            <a href="{{socialLink3}}">LinkedIn</a>
        </div>
    </footer>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow-x: hidden;
    color: #fff;
    background: #000;
}

.gradient-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, {{primaryColor}}, {{accentColor}}, {{primaryColor}});
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    z-index: -1;
}

@keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.header {
    padding: 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 10;
}

.brand {
    font-size: 1.5rem;
    font-weight: bold;
}

.menu-toggle {
    font-size: 2rem;
    cursor: pointer;
}

.main {
    min-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
}

.hero {
    text-align: center;
    margin-bottom: 4rem;
}

.headline {
    font-size: clamp(2.5rem, 8vw, 5rem);
    font-weight: 900;
    margin-bottom: 1rem;
    animation: fadeInUp 1s ease;
}

.subheadline {
    font-size: clamp(1rem, 3vw, 1.5rem);
    opacity: 0.9;
    margin-bottom: 2rem;
    animation: fadeInUp 1s ease 0.2s both;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.cta-primary {
    background: rgba(255,255,255,0.2);
    border: 2px solid #fff;
    color: #fff;
    padding: 1rem 3rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s;
    backdrop-filter: blur(10px);
}

.cta-primary:hover {
    background: #fff;
    color: {{primaryColor}};
    transform: scale(1.05);
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

.feature-card {
    background: rgba(255,255,255,0.1);
    padding: 2rem;
    text-align: center;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.2);
    transition: transform 0.3s;
}

.feature-card:hover {
    transform: translateY(-10px);
}

.feature-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.footer {
    padding: 2rem;
    text-align: center;
}

.social-links a {
    color: #fff;
    text-decoration: none;
    margin: 0 1rem;
    transition: opacity 0.3s;
}

.social-links a:hover {
    opacity: 0.7;
}`
  },
  {
    id: "developer-tech",
    name: "Developer Tech",
    style: "developer",
    variables: [
      "appName",
      "appDescription",
      "primaryColor",
      "backgroundColor",
      "codeSnippet",
      "feature1Title",
      "feature1Desc",
      "feature2Title",
      "feature2Desc",
      "githubLink",
      "demoLink",
      "documentationLink"
    ],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{appName}} - Developer Tools</title>
    <style>{{{css}}}</style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1 class="app-name">{{appName}}</h1>
            <nav class="nav">
                <a href="{{githubLink}}">GitHub</a>
                <a href="{{documentationLink}}">Docs</a>
                <a href="{{demoLink}}" class="demo-link">Demo</a>
            </nav>
        </header>
        
        <section class="hero">
            <h2 class="hero-title">{{appName}}</h2>
            <p class="app-description">{{appDescription}}</p>
            
            <div class="code-preview">
                <div class="code-header">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                </div>
                <pre><code>{{codeSnippet}}</code></pre>
            </div>
        </section>
        
        <section class="features">
            <div class="feature">
                <h3>{{feature1Title}}</h3>
                <p>{{feature1Desc}}</p>
            </div>
            <div class="feature">
                <h3>{{feature2Title}}</h3>
                <p>{{feature2Desc}}</p>
            </div>
        </section>
        
        <footer class="footer">
            <div class="links">
                <a href="{{githubLink}}">Source Code</a>
                <a href="{{documentationLink}}">Documentation</a>
                <a href="{{demoLink}}">Live Demo</a>
            </div>
        </footer>
    </div>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
    background: {{backgroundColor}};
    color: {{primaryColor}};
    line-height: 1.6;
}

.container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 2rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.1);
}

.app-name {
    font-size: 1.5rem;
    color: {{primaryColor}};
}

.nav a {
    color: {{primaryColor}};
    text-decoration: none;
    margin-left: 2rem;
    opacity: 0.7;
    transition: opacity 0.3s;
}

.nav a:hover {
    opacity: 1;
}

.demo-link {
    padding: 0.5rem 1rem;
    border: 1px solid {{primaryColor}};
    border-radius: 4px;
}

.hero {
    margin-bottom: 4rem;
}

.hero-title {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.app-description {
    font-size: 1.25rem;
    opacity: 0.8;
    margin-bottom: 2rem;
}

.code-preview {
    background: #1a1a1a;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.code-header {
    background: #2a2a2a;
    padding: 0.75rem 1rem;
    display: flex;
    gap: 0.5rem;
}

.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.red { background: #ff5f56; }
.yellow { background: #ffbd2e; }
.green { background: #27c93f; }

pre {
    padding: 1.5rem;
    overflow-x: auto;
}

code {
    color: #61dafb;
    font-size: 0.9rem;
}

.features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 4rem;
}

.feature {
    padding: 2rem;
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px;
    transition: transform 0.3s;
}

.feature:hover {
    transform: translateY(-5px);
    border-color: {{primaryColor}};
}

.feature h3 {
    margin-bottom: 1rem;
    color: {{primaryColor}};
}

.footer {
    text-align: center;
    padding-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.1);
}

.links a {
    color: {{primaryColor}};
    text-decoration: none;
    margin: 0 1rem;
    opacity: 0.7;
    transition: opacity 0.3s;
}

.links a:hover {
    opacity: 1;
}`
  },
  {
    id: "ecommerce-modern",
    name: "E-commerce Modern",
    style: "ecommerce",
    variables: [
      "storeName",
      "heroHeadline",
      "heroSubtext",
      "primaryColor",
      "accentColor",
      "product1Name",
      "product1Price",
      "product2Name",
      "product2Price",
      "product3Name",
      "product3Price",
      "shippingInfo"
    ],
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{storeName}} - Modern Shopping</title>
    <style>{{{css}}}</style>
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="nav-wrapper">
                <h1 class="logo">{{storeName}}</h1>
                <nav class="nav">
                    <a href="#shop">Shop</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                    <a href="#cart" class="cart-icon">Cart (0)</a>
                </nav>
            </div>
        </div>
    </header>
    
    <section class="hero">
        <div class="container">
            <h2 class="hero-headline">{{heroHeadline}}</h2>
            <p class="hero-subtext">{{heroSubtext}}</p>
            <button class="shop-now-btn">Shop Now</button>
        </div>
    </section>
    
    <section id="shop" class="products">
        <div class="container">
            <h2 class="section-title">Featured Products</h2>
            <div class="product-grid">
                <div class="product-card">
                    <div class="product-image"></div>
                    <h3>{{product1Name}}</h3>
                    <p class="price">{{product1Price}}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
                <div class="product-card">
                    <div class="product-image"></div>
                    <h3>{{product2Name}}</h3>
                    <p class="price">{{product2Price}}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
                <div class="product-card">
                    <div class="product-image"></div>
                    <h3>{{product3Name}}</h3>
                    <p class="price">{{product3Price}}</p>
                    <button class="add-to-cart">Add to Cart</button>
                </div>
            </div>
        </div>
    </section>
    
    <section class="shipping-banner">
        <div class="container">
            <p>{{shippingInfo}}</p>
        </div>
    </section>
</body>
</html>`,
    css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    color: #333;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.header {
    background: #fff;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem 0;
}

.logo {
    font-size: 1.5rem;
    color: {{primaryColor}};
}

.nav {
    display: flex;
    gap: 2rem;
    align-items: center;
}

.nav a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s;
}

.nav a:hover {
    color: {{primaryColor}};
}

.cart-icon {
    background: {{primaryColor}};
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 20px;
}

.hero {
    background: linear-gradient(135deg, {{primaryColor}}20, {{accentColor}}20);
    padding: 6rem 0;
    text-align: center;
}

.hero-headline {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: {{primaryColor}};
}

.hero-subtext {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.8;
}

.shop-now-btn {
    background: {{primaryColor}};
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.1rem;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}

.shop-now-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

.products {
    padding: 5rem 0;
}

.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
}

.product-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.product-card {
    text-align: center;
    transition: transform 0.3s;
}

.product-card:hover {
    transform: translateY(-10px);
}

.product-image {
    width: 100%;
    height: 300px;
    background: linear-gradient(45deg, {{primaryColor}}30, {{accentColor}}30);
    border-radius: 10px;
    margin-bottom: 1rem;
}

.product-card h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
}

.price {
    font-size: 1.5rem;
    color: {{primaryColor}};
    font-weight: bold;
    margin-bottom: 1rem;
}

.add-to-cart {
    background: {{accentColor}};
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    cursor: pointer;
    transition: background 0.3s;
    border-radius: 5px;
}

.add-to-cart:hover {
    background: {{primaryColor}};
}

.shipping-banner {
    background: {{primaryColor}};
    color: white;
    padding: 1.5rem 0;
    text-align: center;
    font-weight: bold;
}`
  }
];