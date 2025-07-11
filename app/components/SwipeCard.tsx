"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationControls,
  PanInfo,
} from "framer-motion";
import Image from "next/image";
import { Heart, X } from "lucide-react";
import { WixSite } from "@/types";

interface SwipeCardProps {
  site: WixSite;
  isActive: boolean;
  stackIndex?: number; // Position in the stack for dynamic transforms
  onSwipe: (direction: "left" | "right") => void;
  animationControls: ReturnType<typeof useAnimationControls>;
}

// Tinder-style physics constants
const SWIPE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 0.3; // px/ms
const ROTATION_FACTOR = 20; // Controls rotation sensitivity
const EXIT_ANIMATION_DISTANCE = 400;
const EXIT_CURVE_FACTOR = 0.3; // Curve trajectory multiplier

// Dynamic card stack transform calculation
const getCardTransform = (isActive: boolean, stackIndex: number = 0) => {
  if (isActive) {
    return { scale: 1, translateY: 0, zIndex: 10, rotate: 0 };
  }
  
  switch(stackIndex) {
    case 1: return { scale: 0.95, translateY: 10, zIndex: 2, rotate: -1 };
    case 2: return { scale: 0.9, translateY: 20, zIndex: 1, rotate: -2 };
    default: return { scale: 0.85, translateY: 30, zIndex: 0, rotate: -3 };
  }
};

export const SwipeCard: React.FC<SwipeCardProps> = React.memo(
  ({ site, isActive, stackIndex = 0, onSwipe, animationControls }) => {
    console.log(`CardRender: active=${isActive}, id=${site.id}, stackIndex=${stackIndex}`);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

    // Unified transform for all card properties (Tinder-style optimization)
    const cardTransforms = useTransform(x, (value) => {
      if (!isActive) return { 
        rotate: 0, 
        scale: 0.95, 
        likeOpacity: 0, 
        dislikeOpacity: 0,
        nextCardScale: 0.95
      };
      
      // Calculate progress and direction
      const progress = Math.min(Math.abs(value) / 150, 1);
      const direction = value > 0 ? 1 : -1;
      
      return {
        // Natural rotation curve
        rotate: (value / ROTATION_FACTOR) * -1,
        // Subtle scale change for depth
        scale: 1 - progress * 0.05,
        // Smooth opacity transitions
        likeOpacity: Math.max(0, Math.min(1, value / SWIPE_THRESHOLD)),
        dislikeOpacity: Math.max(0, Math.min(1, -value / SWIPE_THRESHOLD)),
        // Next card scaling up
        nextCardScale: 0.95 + progress * 0.05
      };
    });

    const handleDragEnd = React.useCallback((
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const { offset, velocity } = info;
      
      // Velocity-based swipe detection (Tinder physics)
      const velocityInPxPerMs = Math.abs(velocity.x) / 1000; // Convert to px/ms
      const shouldSwipe = 
        Math.abs(offset.x) > SWIPE_THRESHOLD || 
        velocityInPxPerMs > VELOCITY_THRESHOLD;
      
      if (shouldSwipe) {
        const direction = offset.x > 0 ? "right" : "left";
        console.log(`SwipeCard: Immediate callback for ${direction}`);
        
        // ✅ Immediately call onSwipe (Optimistic Update)
        onSwipe(direction);
        
        // ✅ Visual feedback (non-blocking)
        setExitDirection(direction);
        
        // Animate exit with curved trajectory
        const exitX = offset.x > 0 ? EXIT_ANIMATION_DISTANCE : -EXIT_ANIMATION_DISTANCE;
        const exitY = -100 - Math.abs(offset.x) * EXIT_CURVE_FACTOR;
        const exitRotate = offset.x > 0 ? 45 : -45;
        
        animationControls.start({
          x: exitX,
          y: exitY,
          rotate: exitRotate,
          opacity: 0,
          transition: {
            type: "spring",
            stiffness: 200,
            damping: 50,
            mass: 1
          }
        });
      } else {
        // Snap back to center with spring physics
        animationControls.start({
          x: 0,
          y: 0,
          rotate: 0,
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 30,
            mass: 1
          }
        });
      }
    }, [onSwipe, animationControls]);

    // Reset exit direction when card becomes active again
    useEffect(() => {
      if (isActive) {
        setExitDirection(null);
      }
    }, [isActive]);

    // Get card transforms based on position
    const cardTransform = getCardTransform(isActive, stackIndex);
    
    return (
      <motion.div
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        style={{
          x: isActive ? x : 0,
          y: isActive ? y : cardTransform.translateY,
          rotate: isActive ? cardTransforms.get().rotate : cardTransform.rotate,
          scale: isActive ? cardTransforms.get().scale : cardTransform.scale,
          zIndex: cardTransform.zIndex,
          // GPU optimization hints
          willChange: "transform",
          transform: "translate3d(0, 0, 0)" // Force GPU layer
        }}
        drag={isActive}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={cardTransform}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: cardTransform.scale, opacity: 1 }}
        transition={{ 
          duration: 0.15, 
          ease: "easeOut"
        }}
      >
        {/* Card Content */}
        <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Site Image */}
          <div className="relative h-3/5 bg-gray-100">
            <Image
              src={site.imageUrl}
              alt={site.name}
              fill
              className="object-cover"
              priority={isActive}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Industry Badge */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-sm font-medium capitalize">
                {site.industry}
              </span>
            </div>
          </div>

          {/* Site Info */}
          <div className="p-6 h-2/5">
            <h3 className="text-2xl font-bold mb-2">{site.name}</h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {site.metadata.description}
            </p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {site.metadata.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Layout & Style Info */}
            <div className="mt-4 flex gap-4 text-sm text-gray-500">
              <span>Layout: {site.layout.replace(/-/g, " ")}</span>
              <span>Style: {site.templateInfluence}</span>
            </div>
          </div>

          {/* Simple LIKE Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: isActive ? cardTransforms.get().likeOpacity : 0 }}
          >
            <motion.div
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-bold text-2xl shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: cardTransforms.get().likeOpacity > 0.2 ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              LIKE
            </motion.div>
          </motion.div>

          {/* Simple NOPE Overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ opacity: isActive ? cardTransforms.get().dislikeOpacity : 0 }}
          >
            <motion.div
              className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold text-2xl shadow-lg"
              initial={{ scale: 0 }}
              animate={{ scale: cardTransforms.get().dislikeOpacity > 0.2 ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              NOPE
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

SwipeCard.displayName = "SwipeCard";