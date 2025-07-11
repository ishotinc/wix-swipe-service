"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useResultStore } from "@/lib/stores/resultStore";
import { useGeneration } from "@/lib/hooks/useGeneration";
import { Loader2 } from "lucide-react";

const PROGRESS_STAGES = {
  idle: { progress: 0, message: "Initializing generation process..." },
  pending: { progress: 10, message: "Starting generation process..." },
  analyzing: { progress: 25, message: "Analyzing your design preferences..." },
  selecting: { progress: 40, message: "Selecting optimal template..." },
  generating: { progress: 70, message: "Generating custom content with AI..." },
  assembling: { progress: 90, message: "Finalizing your landing page..." },
  completed: { progress: 100, message: "Your landing page is ready!" },
  error: { progress: 0, message: "An error occurred during generation." },
};

export default function GenerationPage() {
  const router = useRouter();
  const { jobId, status: storeStatus, generatedCode } = useResultStore();
  const { status, error } = useGeneration();
  const [currentStage, setCurrentStage] = useState(PROGRESS_STAGES.idle);

  // Update progress stage based on status
  useEffect(() => {
    if (status && status in PROGRESS_STAGES) {
      setCurrentStage(PROGRESS_STAGES[status as keyof typeof PROGRESS_STAGES]);
    }
  }, [status]);

  // Handle completion
  useEffect(() => {
    console.log("Generation status:", status);
    console.log("Generated code exists:", !!generatedCode);
    console.log("Store status:", storeStatus);
    
    if (status === "completed" && generatedCode) {
      // Navigate to result page after a short delay
      setTimeout(() => {
        router.push("/result");
      }, 1000);
    }
  }, [status, generatedCode, router, storeStatus]);

  // Handle error state
  const handleRetry = () => {
    router.push("/");
  };

  // Redirect if no job is in progress
  useEffect(() => {
    if (storeStatus !== 'generating' && !jobId) {
      router.push("/");
    }
  }, [storeStatus, jobId, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Generating Your Landing Page
          </h1>
          <p className="text-gray-600">{currentStage.message}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-green-500 h-full rounded-full transition-all duration-700 ease-out"
              style={{ width: `${currentStage.progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>Progress</span>
            <span>{currentStage.progress}%</span>
          </div>
        </div>

        {/* Status Icon */}
        <div className="flex justify-center mb-8">
          {status === "error" ? (
            <div className="text-red-500">
              <svg
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          ) : status === "completed" ? (
            <div className="text-green-500">
              <svg
                className="w-16 h-16"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          ) : (
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          )}
        </div>

        {/* Error Handling */}
        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Generation Failed
            </h3>
            <p className="text-red-600 mb-4">
              {error || "An unexpected error occurred during generation."}
            </p>
            <button
              onClick={handleRetry}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Processing Status Details */}
        {status !== "error" && status !== "completed" && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  currentStage.progress >= 25 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span
                className={
                  currentStage.progress >= 25
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                Analyzing preferences
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  currentStage.progress >= 40 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span
                className={
                  currentStage.progress >= 40
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                Selecting template
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  currentStage.progress >= 70 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span
                className={
                  currentStage.progress >= 70
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                Generating content
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`w-4 h-4 rounded-full ${
                  currentStage.progress >= 90 ? "bg-green-500" : "bg-gray-300"
                }`}
              />
              <span
                className={
                  currentStage.progress >= 90
                    ? "text-gray-900"
                    : "text-gray-400"
                }
              >
                Finalizing
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}