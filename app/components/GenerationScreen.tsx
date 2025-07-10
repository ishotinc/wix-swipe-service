"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle, XCircle, Copy, Download, RotateCcw } from "lucide-react";
import { useGeneration } from "@/lib/hooks/useGeneration";
import { useSwipeStore } from "@/lib/stores/swipeStore";

interface GenerationScreenProps {
  onReset: () => void;
}

export const GenerationScreen: React.FC<GenerationScreenProps> = ({ onReset }) => {
  const { 
    startGeneration, 
    status, 
    progress, 
    generatedCode, 
    templateName, 
    error, 
    reset 
  } = useGeneration();

  const { resetSwipe } = useSwipeStore();

  // Start generation when component mounts
  useEffect(() => {
    startGeneration();
  }, []);

  // Handle copy to clipboard
  const handleCopy = async () => {
    if (generatedCode) {
      try {
        await navigator.clipboard.writeText(generatedCode);
        // You could add a toast notification here
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  // Handle download
  const handleDownload = () => {
    if (generatedCode) {
      const blob = new Blob([generatedCode], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `landing-page-${templateName || 'generated'}.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Handle try again
  const handleTryAgain = () => {
    reset();
    resetSwipe();
    onReset();
  };

  // Progress messages
  const getProgressMessage = () => {
    if (progress <= 25) return "Analyzing your preferences...";
    if (progress <= 50) return "Selecting optimal template...";
    if (progress <= 75) return "Generating custom content with AI...";
    if (progress < 100) return "Finalizing your landing page...";
    return "Your landing page is ready!";
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-4xl">
        {/* Generation in progress */}
        {status === 'generating' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <Loader2 className="w-16 h-16 animate-spin text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Creating Your Landing Page</h2>
              <p className="text-gray-600">{getProgressMessage()}</p>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3 mb-8">
              <motion.div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <p className="text-sm text-gray-500">
              This usually takes 3-5 seconds...
            </p>
          </motion.div>
        )}

        {/* Generation completed */}
        {status === 'completed' && generatedCode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-2">Your Landing Page is Ready!</h2>
              <p className="text-gray-600">
                Generated using the <span className="font-semibold">{templateName}</span> template
              </p>
            </div>

            {/* Code preview */}
            <div className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <span className="text-gray-400 text-sm">HTML Code</span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="p-2 hover:bg-gray-800 rounded transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={handleDownload}
                    className="p-2 hover:bg-gray-800 rounded transition-colors"
                    title="Download HTML file"
                  >
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
              <pre className="p-4 overflow-x-auto max-h-96">
                <code className="text-sm text-gray-300">
                  {generatedCode.substring(0, 1000)}...
                </code>
              </pre>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleCopy}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Copy className="w-5 h-5" />
                Copy Code
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download HTML
              </button>
              <button
                onClick={handleTryAgain}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {/* Error state */}
        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Generation Failed</h2>
            <p className="text-gray-600 mb-8">{error || 'Something went wrong'}</p>
            <button
              onClick={handleTryAgain}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};