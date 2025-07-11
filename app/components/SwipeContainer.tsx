"use client";

import React, { useEffect, useCallback, useState, useMemo } from "react";
import { AnimatePresence, useAnimationControls, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle, Heart, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SwipeCard } from "./SwipeCard";
import { useSwipeStore } from "@/lib/stores/swipeStore";
import { usePreferenceStore } from "@/lib/stores/preferenceStore";
import { useResultStore } from "@/lib/stores/resultStore";

export const SwipeContainer: React.FC = () => {
  const {
    imageUrls,
    currentIndex,
    swipeLeft,
    swipeRight,
    resetSwipe,
    isComplete,
    history,
    preferences,
  } = useSwipeStore();

  const { settings } = usePreferenceStore();
  const { setJobId } = useResultStore();
  const animationControls = useAnimationControls();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [hasTriggeredGeneration, setHasTriggeredGeneration] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [feedbackShown, setFeedbackShown] = useState<"like" | "nope" | null>(null);
  
  // Cleanup animation controls on unmount
  useEffect(() => {
    return () => {
      animationControls.stop();
    };
  }, [animationControls]);

  // Optimized: Fixed 3-card window with minimal recalculation
  const visibleCards = useMemo(() => {
    console.log(`Computing visibleCards: currentIndex=${currentIndex}, total=${imageUrls.length}`);
    
    if (currentIndex >= imageUrls.length) {
      console.log('Reached end, returning empty array');
      return [];
    }
    
    const cards = imageUrls.slice(currentIndex, currentIndex + 3);
    console.log(`VisibleCards: showing ${cards.length} cards from index ${currentIndex}`);
    return cards; // Remove reverse for clearer logic
  }, [currentIndex, imageUrls.length]); // Optimized dependencies

  // Optimized swipe trigger with Optimistic Update pattern
  const triggerSwipe = useCallback(
    (direction: "left" | "right") => {
      if (isComplete()) return;
      
      console.log(`TriggerSwipe: ${direction} at ${currentIndex}/${imageUrls.length}`);
      
      // ✅ Immediately update state (Optimistic Update)
      if (direction === "left") {
        swipeLeft();
      } else {
        swipeRight();
      }
      
      // ✅ Animate in parallel (fire-and-forget)
      const xValue = direction === "right" ? 400 : -400;
      const rotation = direction === "right" ? 30 : -30;
      
      animationControls.start({
        x: xValue,
        rotate: rotation,
        opacity: 0,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        },
      });
      
      // ✅ Reset for next card (parallel execution)
      setTimeout(() => {
        animationControls.set({ x: 0, rotate: 0, opacity: 1 });
      }, 200);
    },
    [animationControls, swipeLeft, swipeRight, isComplete, currentIndex, imageUrls.length]
  );

  // Trigger swipe with visual feedback for button clicks
  const triggerSwipeWithFeedback = useCallback((direction: "left" | "right") => {
    // Show instant feedback
    setFeedbackShown(direction === "right" ? "like" : "nope");
    
    // Execute the swipe
    triggerSwipe(direction);
    
    // Hide feedback after animation
    setTimeout(() => setFeedbackShown(null), 400);
  }, [triggerSwipe]);

  // Stable keyboard handler with useCallback
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isComplete()) return;
    
    switch (e.key) {
      case "ArrowLeft":
        triggerSwipe("left");
        break;
      case "ArrowRight":
      case "Enter":
        triggerSwipe("right");
        break;
      case "Backspace":
        // TODO: Implement undo functionality
        break;
    }
  }, [isComplete, triggerSwipe]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Handle swipe from card - now with consistent feedback
  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      console.log(`HandleSwipe: ${direction} at ${currentIndex}/${imageUrls.length}`);
      
      if (currentIndex >= imageUrls.length) {
        console.error('HandleSwipe: Beyond bounds, stopping');
        return;
      }
      
      try {
        // Use triggerSwipeWithFeedback for consistent feedback display
        triggerSwipeWithFeedback(direction);
      } catch (error) {
        console.error('Swipe execution error:', error);
      }
    },
    [triggerSwipeWithFeedback, currentIndex, imageUrls.length]
  );

  // Handle LP generation
  const handleGenerateLP = useCallback(async () => {
    try {
      setError(null);
      
      // Validate preferences exist
      if (!preferences) {
        throw new Error("Preferences not calculated. Please try swiping again.");
      }
      
      // 1. First reset the result store to ensure clean state
      const { reset } = useResultStore.getState();
      reset();
      
      // 2. Call API to start generation
      const response = await fetch("/api/generate-lp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          swipeResults: history,
          preferences: preferences 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const { jobId } = await response.json();
      
      // 3. Set jobId in store
      setJobId(jobId);
      
    } catch (err) {
      console.error("Error starting LP generation:", err);
      setError(err instanceof Error ? err.message : "Failed to start LP generation");
      // Navigate back to home on error
      router.push('/');
    }
  }, [history, preferences, setJobId, router]);

  // Auto-trigger generation when swipe is complete with animation delay
  useEffect(() => {
    const startGeneration = async () => {
      if (isComplete() && !hasTriggeredGeneration) {
        console.log(`Final card completed: ${currentIndex}/${imageUrls.length}`);
        setHasTriggeredGeneration(true);
        
        // ✅ Wait for last card animation to complete
        setTimeout(() => {
          console.log('Starting generation after final card animation');
          setIsGenerating(true);
          
          handleGenerateLP().then(() => {
            console.log('[SwipeContainer] Generation started, navigating to generation page');
            router.push('/generation');
          }).catch((error) => {
            console.error('[SwipeContainer] Failed to start generation:', error);
            setIsGenerating(false);
          });
        }, 250); // Wait for animation completion
      }
    };
    
    startGeneration();
  }, [isComplete, hasTriggeredGeneration, currentIndex, imageUrls.length, handleGenerateLP, router]);

  // Show minimal loading state while generating
  if (isComplete() || isGenerating) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Progress Bar */}
      <div className="w-full max-w-md mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{currentIndex + 1} / {imageUrls.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / imageUrls.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Card Stack */}
      <div className="relative w-full max-w-md h-[600px] mb-8">
        <AnimatePresence>
          {visibleCards.map((card, index) => (
            <MemoizedSwipeCard
              key={card.id} // Simplified key for better React reconciliation
              site={card}
              isActive={index === 0} // First card is active since we removed reverse
              stackIndex={index} // Pass stack position for dynamic transforms
              onSwipe={handleSwipe}
              animationControls={animationControls}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        {/* NOPE Button */}
        <button
          onClick={() => triggerSwipeWithFeedback("left")}
          className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
          aria-label="Dislike"
        >
          <X className="w-8 h-8 text-red-500" strokeWidth={3} />
        </button>

        {/* Reset Button */}
        <button
          onClick={resetSwipe}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all"
          aria-label="Reset"
        >
          <RotateCcw className="w-6 h-6 text-gray-600" />
        </button>

        {/* LIKE Button */}
        <button
          onClick={() => triggerSwipeWithFeedback("right")}
          className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200"
          aria-label="Like"
        >
          <Heart className="w-8 h-8 text-green-500 fill-current" />
        </button>
      </div>

      {/* Keyboard Hints */}
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>Use arrow keys to swipe • Enter to like • Backspace to undo</p>
      </div>

      {/* Button Click Feedback Overlay */}
      {feedbackShown && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.25 }}
        >
          <div className={`${
            feedbackShown === "like" 
              ? "bg-green-500" 
              : "bg-red-500"
          } text-white px-8 py-4 rounded-lg font-bold text-3xl shadow-2xl`}>
            {feedbackShown === "like" ? "LIKE!" : "NOPE!"}
          </div>
        </motion.div>
      )}
    </div>
  );
};

// Memoized SwipeCard for preventing unnecessary re-renders
const MemoizedSwipeCard = React.memo(SwipeCard, (prev, next) => 
  prev.site.id === next.site.id && 
  prev.isActive === next.isActive
);