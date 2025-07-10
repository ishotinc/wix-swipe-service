"use client";

import React, { useEffect, useCallback, useState } from "react";
import { AnimatePresence, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw, AlertCircle } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(false);

  // Get current and next few cards for stack effect
  const visibleCards = imageUrls
    .slice(currentIndex, currentIndex + 3)
    .reverse(); // Reverse to render top card last

  // Handle keyboard navigation
  useEffect(() => {
    if (isComplete()) return;

    const handleKeyDown = (e: KeyboardEvent) => {
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
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isComplete]);

  // Trigger programmatic swipe with animation
  const triggerSwipe = useCallback(
    async (direction: "left" | "right") => {
      if (isComplete()) return;

      const xValue = direction === "right" ? 400 : -400;
      const rotation = direction === "right" ? 30 : -30;

      await animationControls.start({
        x: xValue,
        rotate: rotation,
        opacity: 0,
        transition: {
          duration: settings.animationSpeed / 1000,
          ease: "easeOut",
        },
      });

      // Execute swipe
      if (direction === "left") {
        swipeLeft();
      } else {
        swipeRight();
      }

      // Reset animation for next card
      animationControls.set({ x: 0, rotate: 0, opacity: 1 });
    },
    [animationControls, swipeLeft, swipeRight, isComplete, settings.animationSpeed]
  );

  // Handle swipe from card
  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      if (direction === "left") {
        swipeLeft();
      } else {
        swipeRight();
      }
    },
    [swipeLeft, swipeRight]
  );

  // Handle LP generation
  const handleGenerateLP = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Validate preferences exist
      if (!preferences) {
        throw new Error("Preferences not calculated. Please try swiping again.");
      }
      
      // Call Edge Function to start generation
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
      setJobId(jobId);

      // Navigate to generation status page
      router.push("/generation");
    } catch (err) {
      console.error("Error starting LP generation:", err);
      setError(err instanceof Error ? err.message : "Failed to start LP generation");
    } finally {
      setIsLoading(false);
    }
  }, [history, preferences, setJobId, router]);

  if (isComplete()) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl font-bold mb-4">All done!</h2>
        <p className="text-gray-600 mb-8">
          You've swiped through all the sites. Ready to generate your landing page?
        </p>
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
          </div>
        )}
        <div className="flex gap-4">
          <button
            onClick={handleGenerateLP}
            disabled={isLoading}
            className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Generating..." : "Generate LP"}
          </button>
          <button
            onClick={resetSwipe}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Start Over
          </button>
        </div>
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
            <SwipeCard
              key={card.id}
              site={card}
              isActive={index === visibleCards.length - 1}
              onSwipe={handleSwipe}
              animationControls={animationControls}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => triggerSwipe("left")}
          className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group"
          aria-label="Dislike"
        >
          <X className="w-8 h-8 text-red-500 group-hover:scale-110 transition-transform" />
        </button>

        <button
          onClick={resetSwipe}
          className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Reset"
        >
          <RotateCcw className="w-6 h-6 text-gray-600" />
        </button>

        <button
          onClick={() => triggerSwipe("right")}
          className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 group"
          aria-label="Like"
        >
          <Heart className="w-8 h-8 text-green-500 group-hover:scale-110 transition-transform fill-current" />
        </button>
      </div>

      {/* Keyboard Hints */}
      <div className="mt-6 text-sm text-gray-500 text-center">
        <p>Use arrow keys to swipe • Enter to like • Backspace to undo</p>
      </div>
    </div>
  );
};

// Import necessary icons
import { Heart, X } from "lucide-react";