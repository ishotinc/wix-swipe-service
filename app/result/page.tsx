"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResultStore } from "@/lib/stores/resultStore";
import { useSwipeStore } from "@/lib/stores/swipeStore";
import { Check, Copy, Download, RotateCcw } from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const { generatedCode, templateName, status, reset } = useResultStore();
  const { resetSwipe } = useSwipeStore();
  const [copied, setCopied] = useState(false);

  // Redirect if no result is available
  useEffect(() => {
    if (!generatedCode && status !== "generating") {
      router.push("/");
    }
  }, [generatedCode, status, router]);

  const handleCopy = async () => {
    if (generatedCode) {
      await navigator.clipboard.writeText(generatedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (generatedCode) {
      const blob = new Blob([generatedCode], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `landing-page-${Date.now()}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleTryAgain = async () => {
    console.log("[ResultPage] Try Again clicked");

    // 1. Reset stores completely
    reset();
    resetSwipe();

    // 2. Wait for reset to complete
    await new Promise((resolve) => setTimeout(resolve, 100));

    // 3. Navigate to home
    await router.push("/");
  };

  if (!generatedCode) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Try Again Button - Fixed Position */}
      <div className="fixed top-4 right-4 z-20">
        <button
          onClick={handleTryAgain}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors bg-white/90 backdrop-blur-sm shadow-sm"
          aria-label="Try Again"
          title="Try Again"
        >
          <RotateCcw className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Copy & Download Buttons - Fixed Position */}
      <div className="fixed bottom-4 right-4 z-20 flex gap-2">
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors bg-white/90 backdrop-blur-sm shadow-sm"
          aria-label="Copy HTML"
          title="Copy HTML"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            <Copy className="w-4 h-4 text-gray-700" />
          )}
        </button>
        <button
          onClick={handleDownload}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors bg-white/90 backdrop-blur-sm shadow-sm"
          aria-label="Download HTML"
          title="Download HTML"
        >
          <Download className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Simple Preview Frame */}
      <div className="border border-gray-300 rounded">
        {/* Preview Header */}
        <div className="px-4 py-2 border-b border-gray-300 bg-gray-50">
          <span className="text-sm font-medium text-gray-700">Preview</span>
        </div>

        {/* LP Content */}
        <iframe
          srcDoc={generatedCode}
          className="w-full h-[calc(100vh-120px)]"
          title="Generated Landing Page"
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
}
