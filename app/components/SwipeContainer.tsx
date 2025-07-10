"use client";

import React, { useEffect, useCallback } from "react";
import { AnimatePresence, useAnimationControls } from "framer-motion";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { SwipeCard } from "./SwipeCard";
import { useSwipeStore } from "@/lib/stores/swipeStore";
import { usePreferenceStore } from "@/lib/stores/preferenceStore";

export const SwipeContainer: React.FC = () => {
  const {
    imageUrls,
    currentIndex,
    swipeLeft,
    swipeRight,
    resetSwipe,
    isComplete,
  } = useSwipeStore();

  const { settings } = usePreferenceStore();
  const animationControls = useAnimationControls();

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

  if (isComplete()) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl font-bold mb-4">All done!</h2>
        <p className="text-gray-600 mb-8">
          You've swiped through all the sites. Ready to generate your landing page?
        </p>
        <button
          onClick={resetSwipe}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          Start Over
        </button>
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
              animationControls={
                index === visibleCards.length - 1
                  ? animationControls
                  : useAnimationControls()
              }
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