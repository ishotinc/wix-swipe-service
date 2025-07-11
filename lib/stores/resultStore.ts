import { create } from 'zustand';
import { ResultStore } from '@/types';

export const useResultStore = create<ResultStore>((set) => ({
  generatedCode: null,
  status: 'idle',
  error: null,
  jobId: null,
  progress: 0,
  templateName: null,

  setJobId: (jobId: string) => {
    set({ jobId, status: 'generating', progress: 0 });
  },

  setStatus: (status: ResultStore['status']) => {
    set({ status });
  },

  setProgress: (progress: number) => {
    set({ progress });
  },

  setResult: (code: string, templateName: string) => {
    set((state) => {
      // Prevent duplicate results
      if (state.generatedCode === code && state.status === 'completed') {
        console.log('[ResultStore] Duplicate result ignored');
        return state;
      }
      
      console.log('[ResultStore] Setting new result:', { 
        templateName, 
        codeLength: code.length 
      });
      
      return {
        generatedCode: code,
        templateName,
        status: 'completed',
        progress: 100,
        error: null,
      };
    });
  },

  setError: (error: string) => {
    set({
      error,
      status: 'error',
      progress: 0,
      generatedCode: null,
      templateName: null,
    });
  },

  reset: () => {
    console.log('[ResultStore] Resetting store');
    set({
      generatedCode: null,
      status: 'idle',
      error: null,
      jobId: null,
      progress: 0,
      templateName: null,
    });
  },
}));