import OpenAI from 'openai';
import { UserPreferences, Template } from '@/types';
import { wixTemplates } from './wixTemplates';

// Initialize OpenAI client (singleton pattern for Edge Functions)
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  maxRetries: 3, // Automatic retry with exponential backoff
  timeout: 60 * 1000, // 60 seconds timeout
});

// Template selection logic with confidence scoring
export function selectTemplate(preferences: UserPreferences): {
  template: Template;
  confidence: number;
} {
  let bestMatch = wixTemplates[0]; // Default to premium template
  let highestScore = 0;

  for (const template of wixTemplates) {
    let score = 0;
    
    // Premium template gets bonus for tech/modern preferences
    if (template.id === 'premium-ai-tech') {
      if (preferences.styles.includes('modern') || 
          preferences.styles.includes('tech') || 
          preferences.styles.includes('minimal') ||
          preferences.templateInfluence === 'professional') {
        score += 50; // Strong bonus for premium template
      }
    }
    
    // Style matching
    if (preferences.styles.includes(template.style)) {
      score += 40;
    }
    
    // Template influence matching
    if (preferences.templateInfluence === template.style || 
        (preferences.templateInfluence === 'professional' && template.style === 'corporate') ||
        (preferences.templateInfluence === 'vibrant' && template.style === 'creative')) {
      score += 30;
    }
    
    // Industry/layout bonus
    const likedLayouts = preferences.layouts.slice(0, 3);
    for (const layout of likedLayouts) {
      if (template.html.includes(layout.replace(/-/g, ' '))) {
        score += 10;
      }
    }
    
    if (score > highestScore) {
      highestScore = score;
      bestMatch = template;
    }
  }

  return {
    template: bestMatch,
    confidence: Math.min(highestScore, 100),
  };
}

// Generate template variables using OpenAI
export async function generateTemplateVariables(
  template: Template,
  preferences: UserPreferences
): Promise<Record<string, string>> {
  const prompt = createPrompt(template, preferences);
  
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are an expert web designer and copywriter. Generate professional, engaging content for landing pages based on user preferences.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 1000,
      temperature: 0.7,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content generated');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI generation error:', error);
    // Return fallback variables
    return generateFallbackVariables(template);
  }
}

// Create optimized prompt for variable generation
function createPrompt(template: Template, preferences: UserPreferences): string {
  const likedSites = preferences.likedImages.map(img => img.name).join(', ');
  const primaryColors = preferences.colors.slice(0, 3).join(', ');
  const preferredStyles = preferences.styles.slice(0, 3).join(', ');
  
  // Determine animation style based on preferences
  let animationStyle = 'network'; // default
  if (preferredStyles.includes('elegant') || preferredStyles.includes('classic')) {
    animationStyle = 'particle';
  } else if (preferredStyles.includes('modern') || preferredStyles.includes('minimal')) {
    animationStyle = 'line';
  } else if (preferredStyles.includes('creative') || preferredStyles.includes('playful')) {
    animationStyle = 'morphing';
  }
  
  return `Create a modern, high-impact landing page with these specifications:

User Preferences (from swipe analysis):
- Liked sites: ${likedSites}
- Preferred styles: ${preferredStyles}
- Preferred colors: ${primaryColors}
- Template influence: ${preferences.templateInfluence}

Template: ${template.name}
Required Variables: ${template.variables.join(', ')}

DESIGN REQUIREMENTS:
1. Use a futuristic, digital design with glassmorphism effects
2. Dark theme with blue color palette (#0066ff, #00ccff, #4d94ff)
3. Hero section with transparent header and company name in top-left
4. Prominent CTA button with micro-interactions
5. Background animation style: ${animationStyle}
6. All sections: Hero, Problem, Solution, Results, CTA, Profile, FAQ, Footer

Generate professional content that:
- Matches the user's industry and style preferences
- Uses impactful, concise copy
- Includes compelling statistics (90 seconds, 95% satisfaction, 1000+ created)
- Features clear problem/solution narrative

Return ONLY a JSON object with ALL required variables. Include:
- Hero title (split into 2 lines for impact)
- Hero subtitle (max 100 characters)
- CTA button text (max 3 words)
- Company/brand name
- 3 problem points with titles
- 3 solution features
- FAQ questions and answers (3 items)
- All color values in hex format

Example format:
{
  "heroTitle": "Build Landing Pages",
  "heroTitleLine2": "With AI Magic",
  "heroSubtitle": "Transform your vision into stunning websites in seconds",
  "ctaButtonText": "Start Creating",
  "companyName": "YourBrand AI",
  "primaryColor": "#0066ff",
  "accentColor": "#00ccff"
}`;
}

// Fallback variable generation for error cases
function generateFallbackVariables(template: Template): Record<string, string> {
  const fallbackValues: Record<string, string> = {
    // Generic values that work for most templates
    heroTitle: 'Transform Your Business',
    heroTitleLine2: 'With AI Innovation',
    heroSubtitle: 'Cutting-edge solutions that drive growth and efficiency',
    primaryColor: '#0066ff',
    backgroundColor: '#FFFFFF',
    secondaryColor: '#F3F4F6',
    accentColor: '#00ccff',
    ctaButtonText: 'Get Started',
    ctaLink: '#',
    companyName: 'Your Company',
    brandName: 'Your Brand',
    appName: 'Your App',
    storeName: 'Your Store',
    contactEmail: 'hello@example.com',
    contactPhone: '+1 (555) 123-4567',
    contactInfo: 'Contact us for more information',
    
    // Problem section
    problemTitle1: 'Time-Consuming Process',
    problemDesc1: 'Traditional methods take weeks to implement',
    problemTitle2: 'High Costs',
    problemDesc2: 'Enterprise solutions are expensive and complex',
    problemTitle3: 'Limited Flexibility',
    problemDesc3: 'One-size-fits-all approaches don\'t work',
    
    // Solution section
    solutionTitle: 'Smart. Fast. Reliable.',
    solutionSubtitle: 'Our AI-powered platform delivers results in minutes, not months',
    solutionFeature1: 'AI-driven automation',
    solutionFeature2: 'Real-time analytics',
    solutionFeature3: 'Seamless integration',
    solutionFeature4: 'Enterprise-grade security',
    
    // Results section
    stat1Number: '90',
    stat1Label: 'Seconds to Deploy',
    stat2Number: '95',
    stat2Label: '% Customer Satisfaction',
    stat3Number: '1000',
    stat3Label: 'Active Users',
    
    // CTA section
    ctaTitle: 'Ready to Get Started?',
    ctaSubtitle: 'Join thousands of satisfied customers',
    
    // Profile section
    profileTitle: 'About Us',
    profileContent: 'We are dedicated to bringing cutting-edge AI technology to businesses of all sizes',
    
    // FAQ section
    faq1Question: 'How does it work?',
    faq1Answer: 'Our AI analyzes your requirements and generates optimized solutions in real-time',
    faq2Question: 'What\'s included?',
    faq2Answer: 'Full access to all features, unlimited usage, and dedicated support',
    faq3Question: 'Is it secure?',
    faq3Answer: 'Yes, we use enterprise-grade encryption and follow industry best practices',
  };

  // Return only the variables required by the template
  const result: Record<string, string> = {};
  for (const variable of template.variables) {
    result[variable] = fallbackValues[variable] || `[${variable}]`;
  }
  
  return result;
}

// Apply variables to template HTML
export function assembleTemplate(
  template: Template,
  variables: Record<string, string>
): string {
  let html = template.html;
  let css = template.css;
  
  // Replace variables in HTML and CSS
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, value);
    css = css.replace(regex, value);
  }
  
  // Inject CSS into HTML
  html = html.replace('{{{css}}}', `<style>${css}</style>`);
  
  return html;
}