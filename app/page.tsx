"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SwipeContainer } from "./components/SwipeContainer";
import { useSwipeStore } from "@/lib/stores/swipeStore";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'swiper'>('landing');
  const { resetSwipe } = useSwipeStore();

  const handleStartSwiping = () => {
    resetSwipe();
    setCurrentScreen('swiper');
  };

  // Remove auto-navigation to generation screen

  const handleReset = () => {
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <AnimatePresence mode="wait">
        {currentScreen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center min-h-screen p-8"
          >
            {/* Hero Section */}
            <div className="max-w-3xl text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>

              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-6xl font-bold text-gray-900 mb-6"
              >
                Create Your Perfect
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  {" "}Landing Page
                </span>
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-gray-600 mb-12 leading-relaxed"
              >
                Swipe through beautiful Wix site designs and let AI generate
                a custom landing page tailored to your preferences.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="space-y-4"
              >
                <button
                  onClick={handleStartSwiping}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Swiping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-sm text-gray-500">
                  10 curated designs • 5 seconds to generate • 100% free
                </div>
              </motion.div>

              {/* Feature Cards */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">👆</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Simple Swiping
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Like or dislike designs with intuitive swipe gestures
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    AI-Powered
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Advanced AI analyzes your preferences instantly
                  </p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-2xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Ready in Seconds
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Get your custom landing page code in under 5 seconds
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
        
        {currentScreen === 'swiper' && (
          <motion.div
            key="swiper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen p-8 flex items-center justify-center"
          >
            <div className="w-full max-w-4xl">
              <SwipeContainer />
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}