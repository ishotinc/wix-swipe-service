import { useEffect, useCallback } from 'react';
import { useResultStore } from '@/lib/stores/resultStore';
import { useSwipeStore } from '@/lib/stores/swipeStore';
import { GenerateLPResponse, GenerationStatusResponse, GetResultResponse } from '@/types';

const POLLING_INTERVAL = 1000; // 1 second
const MAX_POLLING_ATTEMPTS = 60; // 60 seconds max

export function useGeneration() {
  const { 
    jobId, 
    status, 
    setJobId, 
    setStatus, 
    setProgress, 
    setResult, 
    setError, 
    reset 
  } = useResultStore();
  
  const { history, preferences } = useSwipeStore();

  // Start generation process
  const startGeneration = useCallback(async () => {
    try {
      // Reset previous state
      reset();
      setStatus('generating');

      // Prepare request data
      const requestData = {
        swipeResults: history,
        preferences: preferences,
      };

      // Call generate-lp API
      const response = await fetch('/api/generate-lp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to start generation');
      }

      const data: GenerateLPResponse = await response.json();
      setJobId(data.jobId);
    } catch (error) {
      console.error('Generation start error:', error);
      setError(error instanceof Error ? error.message : 'Failed to start generation');
    }
  }, [history, preferences, reset, setJobId, setStatus, setError]);

  // Poll for job status
  const pollStatus = useCallback(async (jobId: string, attempts = 0): Promise<void> => {
    if (attempts >= MAX_POLLING_ATTEMPTS) {
      setError('Generation timeout - please try again');
      return;
    }

    try {
      // Check job status
      const statusResponse = await fetch(`/api/generation-status?jobId=${jobId}`);
      
      if (!statusResponse.ok) {
        throw new Error('Failed to check status');
      }

      const statusData: GenerationStatusResponse = await statusResponse.json();
      
      // Update progress
      setProgress(statusData.progress);

      // Handle different statuses
      switch (statusData.status) {
        case 'completed':
          // Fetch the result
          const resultResponse = await fetch(`/api/get-result?jobId=${jobId}`);
          
          if (!resultResponse.ok) {
            throw new Error('Failed to get result');
          }

          const resultData: GetResultResponse = await resultResponse.json();
          setResult(resultData.code, resultData.templateName);
          break;

        case 'error':
          setError(statusData.error || 'Generation failed');
          break;

        case 'pending':
        case 'generating':
          // Continue polling
          setTimeout(() => {
            pollStatus(jobId, attempts + 1);
          }, POLLING_INTERVAL);
          break;
          
        default:
          // Handle any other status (like 'processing') as generating
          setStatus('generating');
          setTimeout(() => {
            pollStatus(jobId, attempts + 1);
          }, POLLING_INTERVAL);
          break;
      }
    } catch (error) {
      console.error('Polling error:', error);
      setError(error instanceof Error ? error.message : 'Failed to check status');
    }
  }, [setProgress, setResult, setError]);

  // Start polling when jobId is set
  useEffect(() => {
    if (jobId && status === 'generating') {
      pollStatus(jobId);
    }
  }, [jobId, status, pollStatus]);

  return {
    startGeneration,
    status,
    progress: useResultStore(state => state.progress),
    generatedCode: useResultStore(state => state.generatedCode),
    templateName: useResultStore(state => state.templateName),
    error: useResultStore(state => state.error),
    reset,
  };
}