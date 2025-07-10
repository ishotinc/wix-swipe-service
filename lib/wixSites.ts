import { WixSite } from "@/types";

// Wix site data with 10 image metadata entries
export const wixSites: WixSite[] = [
  {
    id: 1,
    name: "Creative Photography Portfolio",
    imageUrl: "/wix-sites/photographer.png",
    templateInfluence: "creative",
    colors: {
      primary: "#1a1a1a",
      secondary: "#f5f5f5",
      accent: "#ff6b6b"
    },
    layout: "gallery-grid",
    industry: "creative",
    elements: [
      "masonry-gallery",
      "fullscreen-navigation",
      "minimal-typography",
      "image-hover-effects",
      "contact-form"
    ],
    metadata: {
      description: "A stunning photography portfolio showcasing artistic vision through visual storytelling",
      tags: ["photography", "portfolio", "creative", "gallery", "minimal", "artistic"]
    }
  },
  {
    id: 2,
    name: "AI Technology Company",
    imageUrl: "/wix-sites/ai-company.png",
    templateInfluence: "professional",
    colors: {
      primary: "#0066ff",
      secondary: "#ffffff",
      accent: "#00d4ff"
    },
    layout: "full-screen-hero",
    industry: "tech",
    elements: [
      "animated-hero",
      "feature-cards",
      "tech-illustrations",
      "gradient-backgrounds",
      "cta-buttons"
    ],
    metadata: {
      description: "Modern AI technology company showcasing innovation and cutting-edge solutions",
      tags: ["technology", "ai", "startup", "innovation", "modern", "professional"]
    }
  },
  {
    id: 3,
    name: "Personal Blog & Media",
    imageUrl: "/wix-sites/personal-blog.png",
    templateInfluence: "minimal",
    colors: {
      primary: "#2c3e50",
      secondary: "#ecf0f1",
      accent: "#e74c3c"
    },
    layout: "article-stack",
    industry: "blog",
    elements: [
      "article-cards",
      "sidebar-navigation",
      "author-bio",
      "comment-section",
      "newsletter-signup"
    ],
    metadata: {
      description: "Clean and focused personal blog for sharing thoughts and stories",
      tags: ["blog", "writing", "personal", "minimal", "content", "media"]
    }
  },
  {
    id: 4,
    name: "Coming Soon Landing",
    imageUrl: "/wix-sites/coming-soon.png",
    templateInfluence: "vibrant",
    colors: {
      primary: "#ff00ff",
      secondary: "#00ffff",
      accent: "#ffff00"
    },
    layout: "one-page",
    industry: "pre-launch",
    elements: [
      "countdown-timer",
      "email-capture",
      "animated-background",
      "social-links",
      "teaser-content"
    ],
    metadata: {
      description: "Eye-catching coming soon page with vibrant design and countdown",
      tags: ["landing", "coming-soon", "vibrant", "animated", "pre-launch", "teaser"]
    }
  },
  {
    id: 5,
    name: "Creative CV Portfolio",
    imageUrl: "/wix-sites/creative-cv.png",
    templateInfluence: "creative",
    colors: {
      primary: "#6c5ce7",
      secondary: "#ffffff",
      accent: "#fd79a8"
    },
    layout: "vertical-scroll",
    industry: "portfolio",
    elements: [
      "timeline-experience",
      "skill-bars",
      "project-showcase",
      "testimonials",
      "download-cv"
    ],
    metadata: {
      description: "Creative digital CV and portfolio for designers and creatives",
      tags: ["cv", "portfolio", "creative", "resume", "designer", "personal-brand"]
    }
  },
  {
    id: 6,
    name: "Tech Company Corporate",
    imageUrl: "/wix-sites/tech-company.png",
    templateInfluence: "professional",
    colors: {
      primary: "#1e3a8a",
      secondary: "#f8fafc",
      accent: "#3b82f6"
    },
    layout: "split-screen",
    industry: "corporate",
    elements: [
      "hero-slider",
      "service-grid",
      "team-section",
      "client-logos",
      "contact-info"
    ],
    metadata: {
      description: "Professional corporate website for established technology companies",
      tags: ["corporate", "technology", "professional", "business", "enterprise", "b2b"]
    }
  },
  {
    id: 7,
    name: "Fashion Accessories Store",
    imageUrl: "/wix-sites/accessories-store.png",
    templateInfluence: "vibrant",
    colors: {
      primary: "#ff1493",
      secondary: "#ffffff",
      accent: "#ffd700"
    },
    layout: "product-grid",
    industry: "retail",
    elements: [
      "product-carousel",
      "quick-view",
      "filter-sidebar",
      "shopping-cart",
      "instagram-feed"
    ],
    metadata: {
      description: "Trendy fashion accessories e-commerce store with vibrant design",
      tags: ["ecommerce", "fashion", "retail", "accessories", "shopping", "trendy"]
    }
  },
  {
    id: 8,
    name: "Home Renovation Services",
    imageUrl: "/wix-sites/home-remodeling.png",
    templateInfluence: "minimal",
    colors: {
      primary: "#8b4513",
      secondary: "#faf0e6",
      accent: "#228b22"
    },
    layout: "service-showcase",
    industry: "construction",
    elements: [
      "before-after-slider",
      "project-gallery",
      "service-packages",
      "testimonials",
      "quote-calculator"
    ],
    metadata: {
      description: "Home renovation and remodeling services with clean, trustworthy design",
      tags: ["construction", "renovation", "home", "services", "remodeling", "interior"]
    }
  },
  {
    id: 9,
    name: "Business Consulting Firm",
    imageUrl: "/wix-sites/business-consulting.png",
    templateInfluence: "professional",
    colors: {
      primary: "#2c3e50",
      secondary: "#ecf0f1",
      accent: "#27ae60"
    },
    layout: "content-focused",
    industry: "consulting",
    elements: [
      "case-studies",
      "expertise-areas",
      "team-profiles",
      "blog-section",
      "consultation-booking"
    ],
    metadata: {
      description: "Professional business consulting firm showcasing expertise and results",
      tags: ["consulting", "business", "professional", "corporate", "advisory", "strategy"]
    }
  },
  {
    id: 10,
    name: "Construction Company",
    imageUrl: "/wix-sites/construction-company.png",
    templateInfluence: "minimal",
    colors: {
      primary: "#ff6600",
      secondary: "#f5f5f5",
      accent: "#333333"
    },
    layout: "project-showcase",
    industry: "engineering",
    elements: [
      "project-portfolio",
      "service-categories",
      "equipment-showcase",
      "safety-certifications",
      "contact-forms"
    ],
    metadata: {
      description: "Industrial construction company with strong, reliable visual presence",
      tags: ["construction", "engineering", "industrial", "projects", "infrastructure", "building"]
    }
  }
];