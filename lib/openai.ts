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
  let bestMatch = wixTemplates[0];
  let highestScore = 0;

  for (const template of wixTemplates) {
    let score = 0;
    
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
  
  return `Based on user preferences from swiping through Wix sites, generate content for a ${template.name} template.

User Preferences:
- Liked sites: ${likedSites}
- Preferred styles: ${preferredStyles}
- Preferred colors: ${primaryColors}
- Template influence: ${preferences.templateInfluence}

Template: ${template.name}
Required Variables: ${template.variables.join(', ')}

Generate professional, industry-appropriate content that matches the user's visual preferences.
Return ONLY a JSON object with ALL required variables. Each value should be concise and impactful.

Example format:
{
  "heroTitle": "Innovative Solutions for Modern Business",
  "primaryColor": "#6366F1",
  ...
}`;
}

// Fallback variable generation for error cases
function generateFallbackVariables(template: Template): Record<string, string> {
  const fallbackValues: Record<string, string> = {
    // Generic values that work for most templates
    heroTitle: 'Welcome to Our Site',
    heroSubtitle: 'Discover Amazing Solutions',
    primaryColor: '#6366F1',
    backgroundColor: '#FFFFFF',
    secondaryColor: '#F3F4F6',
    accentColor: '#EC4899',
    ctaButtonText: 'Get Started',
    companyName: 'Your Company',
    brandName: 'Your Brand',
    appName: 'Your App',
    storeName: 'Your Store',
    contactEmail: 'hello@example.com',
    contactPhone: '+1 (555) 123-4567',
    contactInfo: 'Contact us for more information',
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