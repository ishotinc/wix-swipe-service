"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResultStore } from "@/lib/stores/resultStore";
import { useSwipeStore } from "@/lib/stores/swipeStore";
import { Check, Copy, Download, RotateCcw, Eye, Code } from "lucide-react";

export default function ResultPage() {
  const router = useRouter();
  const { generatedCode, templateName, status, reset } = useResultStore();
  const { resetSwipe } = useSwipeStore();
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Redirect if no result is available
  useEffect(() => {
    if (!generatedCode && status !== 'generating') {
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

  const handleTryAgain = () => {
    reset();
    resetSwipe();
    router.push("/");
  };

  if (!generatedCode) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Your Landing Page is Ready!
              </h1>
              <p className="text-gray-600">
                Template used: <span className="font-semibold">{templateName || "Custom"}</span>
              </p>
            </div>
            <button
              onClick={handleTryAgain}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy HTML
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              {showPreview ? (
                <>
                  <Code className="w-5 h-5" />
                  Show Code
                </>
              ) : (
                <>
                  <Eye className="w-5 h-5" />
                  Preview
                </>
              )}
            </button>
          </div>
        </div>

        {/* Content Display */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {showPreview ? (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <iframe
                  srcDoc={generatedCode}
                  className="w-full h-[600px]"
                  title="Landing Page Preview"
                  sandbox="allow-scripts"
                />
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Generated HTML Code</h2>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto max-h-[600px] overflow-y-auto">
                  <code className="text-sm whitespace-pre-wrap">{generatedCode}</code>
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-4 right-4 p-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Usage Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            How to Use Your Landing Page
          </h3>
          <ul className="list-disc list-inside text-blue-800 space-y-1">
            <li>Copy the HTML code or download it as a file</li>
            <li>Upload it to your web hosting service</li>
            <li>Customize the content, colors, and images as needed</li>
            <li>Your landing page is ready to go live!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}