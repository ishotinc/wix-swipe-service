import { create } from 'zustand';
import { SwipeStore, SwipeAction, UserPreferences } from '@/types';
import { wixSites } from '@/lib/wixSites';

export const useSwipeStore = create<SwipeStore>((set, get) => ({
  imageUrls: wixSites,
  currentIndex: 0,
  history: [],
  preferences: null,

  swipeRight: () => {
    const { currentIndex, imageUrls, history } = get();
    if (currentIndex >= imageUrls.length) return;

    const currentImage = imageUrls[currentIndex];
    const action: SwipeAction = {
      imageId: currentImage.id,
      action: 'like',
      timestamp: Date.now(),
      style: currentImage.templateInfluence,
      colors: [currentImage.colors.primary, currentImage.colors.secondary],
      layout: currentImage.layout,
      elements: currentImage.elements,
    };

    set({
      history: [...history, action],
      currentIndex: currentIndex + 1,
    });

    // Update preferences after each swipe
    get().updatePreferences();
  },

  swipeLeft: () => {
    const { currentIndex, imageUrls, history } = get();
    if (currentIndex >= imageUrls.length) return;

    const currentImage = imageUrls[currentIndex];
    const action: SwipeAction = {
      imageId: currentImage.id,
      action: 'dislike',
      timestamp: Date.now(),
      style: currentImage.templateInfluence,
      colors: [currentImage.colors.primary, currentImage.colors.secondary],
      layout: currentImage.layout,
      elements: currentImage.elements,
    };

    set({
      history: [...history, action],
      currentIndex: currentIndex + 1,
    });

    // Update preferences after each swipe
    get().updatePreferences();
  },

  resetSwipe: () => {
    set({
      currentIndex: 0,
      history: [],
      preferences: null,
    });
  },

  isComplete: () => {
    const { currentIndex, imageUrls } = get();
    return currentIndex >= imageUrls.length;
  },

  // Helper method to update preferences based on swipe history
  updatePreferences: () => {
    const { history, imageUrls } = get();
    
    const likedActions = history.filter(h => h.action === 'like');
    const dislikedActions = history.filter(h => h.action === 'dislike');

    // Aggregate preferences from liked items
    const styles = new Map<string, number>();
    const colors = new Map<string, number>();
    const layouts = new Map<string, number>();
    const elements = new Map<string, number>();

    likedActions.forEach(action => {
      // Count styles
      styles.set(action.style, (styles.get(action.style) || 0) + 1);
      
      // Count colors
      action.colors.forEach(color => {
        colors.set(color, (colors.get(color) || 0) + 1);
      });
      
      // Count layouts
      layouts.set(action.layout, (layouts.get(action.layout) || 0) + 1);
      
      // Count elements
      action.elements.forEach(element => {
        elements.set(element, (elements.get(element) || 0) + 1);
      });
    });

    // Convert to sorted arrays (most preferred first)
    const sortedStyles = Array.from(styles.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([style]) => style);
    
    const sortedColors = Array.from(colors.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color);
    
    const sortedLayouts = Array.from(layouts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([layout]) => layout);
    
    const sortedElements = Array.from(elements.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([element]) => element);

    // Get liked and disliked images
    const likedImages = likedActions.map(action => {
      const site = imageUrls.find(img => img.id === action.imageId)!;
      return {
        id: site.id,
        name: site.name,
        url: site.imageUrl,
        company: site.name,
        style: site.templateInfluence === 'creative' ? 'creative' as const : 
               site.templateInfluence === 'professional' ? 'corporate' as const : 
               'minimal' as const,
        colors: [site.colors.primary, site.colors.secondary].filter(Boolean),
        layout: site.layout,
        elements: site.elements,
        industry: site.industry as any,
        templateInfluence: site.templateInfluence,
        tags: site.metadata.tags,
        metadata: site.metadata,
      };
    });

    const dislikedImages = dislikedActions.map(action => {
      const site = imageUrls.find(img => img.id === action.imageId)!;
      return {
        id: site.id,
        name: site.name,
        url: site.imageUrl,
        company: site.name,
        style: site.templateInfluence === 'creative' ? 'creative' as const : 
               site.templateInfluence === 'professional' ? 'corporate' as const : 
               'minimal' as const,
        colors: [site.colors.primary, site.colors.secondary].filter(Boolean),
        layout: site.layout,
        elements: site.elements,
        industry: site.industry as any,
        templateInfluence: site.templateInfluence,
        tags: site.metadata.tags,
        metadata: site.metadata,
      };
    });

    // Determine dominant template influence
    const templateInfluence = sortedStyles[0] as UserPreferences['templateInfluence'] || 'minimal';

    const preferences: UserPreferences = {
      styles: sortedStyles,
      colors: sortedColors,
      layouts: sortedLayouts,
      elements: sortedElements,
      likedImages,
      dislikedImages,
      templateInfluence,
    };

    set({ preferences });
  },
}));