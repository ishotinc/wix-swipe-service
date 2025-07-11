import { create } from 'zustand';
import { SwipeStore, SwipeAction, UserPreferences } from '@/types';
import { wixSites } from '@/lib/wixSites';

// Optimized store interface with O(1) complexity
interface OptimizedSwipeStore extends SwipeStore {
  likeCounts: Map<string, number>;
  dislikeCounts: Map<string, number>;
  colorCounts: Map<string, number>;
  layoutCounts: Map<string, number>;
  elementCounts: Map<string, number>;
  finalizePreferences: () => void;
}

export const useSwipeStore = create<OptimizedSwipeStore>((set, get) => ({
  imageUrls: wixSites,
  currentIndex: 0,
  history: [],
  preferences: null,
  // Initialize counters for O(1) incremental updates
  likeCounts: new Map(),
  dislikeCounts: new Map(),
  colorCounts: new Map(),
  layoutCounts: new Map(),
  elementCounts: new Map(),

  swipeRight: () => {
    const { currentIndex, imageUrls, history } = get();
    
    // 詳細ログ追加
    console.log(`SwipeRight: currentIndex=${currentIndex}, total=${imageUrls.length}`);
    
    // 厳密な境界チェック
    if (currentIndex >= imageUrls.length) {
      console.warn('SwipeRight: Already at end, stopping');
      return;
    }
    
    // 現在画像の存在確認
    const currentImage = imageUrls[currentIndex];
    if (!currentImage) {
      console.error(`SwipeRight: No image at index ${currentIndex}`);
      return;
    }
    
    console.log(`Processing: ${currentImage.name} (${currentIndex + 1}/${imageUrls.length})`);

    const action: SwipeAction = {
      imageId: currentImage.id,
      action: 'like',
      timestamp: Date.now(),
      style: currentImage.templateInfluence,
      colors: [currentImage.colors.primary, currentImage.colors.secondary],
      layout: currentImage.layout,
      elements: currentImage.elements,
    };

    const newIndex = currentIndex + 1;
    
    // O(1) incremental updates
    const { likeCounts, colorCounts, layoutCounts, elementCounts } = get();
    
    // Update style counts
    const newLikeCounts = new Map(likeCounts);
    newLikeCounts.set(currentImage.templateInfluence, 
      (newLikeCounts.get(currentImage.templateInfluence) || 0) + 1);
    
    // Update color counts
    const newColorCounts = new Map(colorCounts);
    [currentImage.colors.primary, currentImage.colors.secondary].forEach(color => {
      if (color) {
        newColorCounts.set(color, (newColorCounts.get(color) || 0) + 1);
      }
    });
    
    // Update layout counts
    const newLayoutCounts = new Map(layoutCounts);
    newLayoutCounts.set(currentImage.layout, 
      (newLayoutCounts.get(currentImage.layout) || 0) + 1);
    
    // Update element counts
    const newElementCounts = new Map(elementCounts);
    currentImage.elements.forEach(element => {
      newElementCounts.set(element, (newElementCounts.get(element) || 0) + 1);
    });
    
    set({
      history: [...history, action],
      currentIndex: newIndex,
      likeCounts: newLikeCounts,
      colorCounts: newColorCounts,
      layoutCounts: newLayoutCounts,
      elementCounts: newElementCounts,
    });
    
    console.log(`SwipeRight completed: ${currentIndex} → ${newIndex} (total: ${imageUrls.length})`);

    // Only finalize preferences on the last swipe
    if (newIndex === imageUrls.length) {
      console.log(`Finalizing preferences at index ${newIndex}`);
      const store = get() as OptimizedSwipeStore;
      store.finalizePreferences();
    }
  },

  swipeLeft: () => {
    const { currentIndex, imageUrls, history } = get();
    
    // 詳細ログ追加
    console.log(`SwipeLeft: currentIndex=${currentIndex}, total=${imageUrls.length}`);
    
    // 厳密な境界チェック
    if (currentIndex >= imageUrls.length) {
      console.warn('SwipeLeft: Already at end, stopping');
      return;
    }
    
    // 現在画像の存在確認
    const currentImage = imageUrls[currentIndex];
    if (!currentImage) {
      console.error(`SwipeLeft: No image at index ${currentIndex}`);
      return;
    }
    
    console.log(`Processing: ${currentImage.name} (${currentIndex + 1}/${imageUrls.length})`);

    const action: SwipeAction = {
      imageId: currentImage.id,
      action: 'dislike',
      timestamp: Date.now(),
      style: currentImage.templateInfluence,
      colors: [currentImage.colors.primary, currentImage.colors.secondary],
      layout: currentImage.layout,
      elements: currentImage.elements,
    };

    const newIndex = currentIndex + 1;
    
    // O(1) incremental updates for dislikes
    const { dislikeCounts } = get();
    
    // Update dislike counts (style only for dislikes)
    const newDislikeCounts = new Map(dislikeCounts);
    newDislikeCounts.set(currentImage.templateInfluence, 
      (newDislikeCounts.get(currentImage.templateInfluence) || 0) + 1);
    
    set({
      history: [...history, action],
      currentIndex: newIndex,
      dislikeCounts: newDislikeCounts,
    });
    
    console.log(`SwipeLeft completed: ${currentIndex} → ${newIndex} (total: ${imageUrls.length})`);

    // Only finalize preferences on the last swipe
    if (newIndex === imageUrls.length) {
      console.log(`Finalizing preferences at index ${newIndex}`);
      const store = get() as OptimizedSwipeStore;
      store.finalizePreferences();
    }
  },

  resetSwipe: () => {
    set({
      currentIndex: 0,
      history: [],
      preferences: null,
      // Reset all counters
      likeCounts: new Map(),
      dislikeCounts: new Map(),
      colorCounts: new Map(),
      layoutCounts: new Map(),
      elementCounts: new Map(),
    });
  },

  isComplete: () => {
    const { currentIndex, imageUrls } = get();
    console.log(`IsComplete check: ${currentIndex} === ${imageUrls.length}`);
    return currentIndex === imageUrls.length; // ✅ Equal sign for accurate detection
  },

  // O(1) complexity - only called once at the end
  finalizePreferences: () => {
    const { history, imageUrls, likeCounts, dislikeCounts, colorCounts, layoutCounts, elementCounts } = get();
    
    // Convert counters to sorted arrays (most preferred first)
    const sortedStyles = Array.from(likeCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([style]) => style);
    
    const sortedColors = Array.from(colorCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([color]) => color);
    
    const sortedLayouts = Array.from(layoutCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([layout]) => layout);
    
    const sortedElements = Array.from(elementCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([element]) => element);

    // Get liked and disliked images from history
    const likedActions = history.filter(h => h.action === 'like');
    const dislikedActions = history.filter(h => h.action === 'dislike');

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

  // Legacy method kept for compatibility but now O(n) complexity - avoid using
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