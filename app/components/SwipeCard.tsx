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
  onSwipe: (direction: "left" | "right") => void;
  animationControls: ReturnType<typeof useAnimationControls>;
}

const SWIPE_THRESHOLD = 100;
const VELOCITY_THRESHOLD = 500;

export const SwipeCard: React.FC<SwipeCardProps> = React.memo(
  ({ site, isActive, onSwipe, animationControls }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);

    // Transform values for visual feedback
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    
    // Overlay color and opacity for swipe feedback
    const likeOverlayOpacity = useTransform(
      x,
      [0, SWIPE_THRESHOLD],
      [0, 1]
    );
    const dislikeOverlayOpacity = useTransform(
      x,
      [-SWIPE_THRESHOLD, 0],
      [1, 0]
    );

    // Scale transform for subtle depth effect
    const scale = useTransform(
      x,
      [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
      [0.95, 1, 0.95]
    );

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      info: PanInfo
    ) => {
      const { offset, velocity } = info;
      
      // Determine swipe direction based on offset and velocity
      if (
        offset.x > SWIPE_THRESHOLD ||
        (velocity.x > VELOCITY_THRESHOLD && offset.x > 0)
      ) {
        setExitDirection("right");
        onSwipe("right");
      } else if (
        offset.x < -SWIPE_THRESHOLD ||
        (velocity.x < -VELOCITY_THRESHOLD && offset.x < 0)
      ) {
        setExitDirection("left");
        onSwipe("left");
      }
    };

    // Reset exit direction when card becomes active again
    useEffect(() => {
      if (isActive) {
        setExitDirection(null);
      }
    }, [isActive]);

    return (
      <motion.div
        className={`absolute inset-0 cursor-grab active:cursor-grabbing ${
          isActive ? "z-10" : "z-0"
        }`}
        style={{
          x: isActive ? x : 0,
          y: isActive ? y : 0,
          rotate: isActive ? rotate : 0,
          scale,
        }}
        drag={isActive}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={animationControls}
        initial={{ scale: 0.9, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        exit={
          exitDirection
            ? {
                x: exitDirection === "right" ? 300 : -300,
                opacity: 0,
                scale: 0.8,
                transition: { duration: 0.3 },
              }
            : undefined
        }
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

          {/* Like Overlay */}
          <motion.div
            className="absolute inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center pointer-events-none"
            style={{ opacity: isActive ? likeOverlayOpacity : 0 }}
          >
            <div className="bg-green-500 text-white p-6 rounded-full">
              <Heart className="w-16 h-16 fill-current" />
            </div>
          </motion.div>

          {/* Dislike Overlay */}
          <motion.div
            className="absolute inset-0 bg-red-500/20 backdrop-blur-sm flex items-center justify-center pointer-events-none"
            style={{ opacity: isActive ? dislikeOverlayOpacity : 0 }}
          >
            <div className="bg-red-500 text-white p-6 rounded-full">
              <X className="w-16 h-16" strokeWidth={3} />
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  }
);

SwipeCard.displayName = "SwipeCard";