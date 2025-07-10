import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PreferenceStore } from '@/types';

export const usePreferenceStore = create<PreferenceStore>()(
  persist(
    (set) => ({
      settings: {
        animationSpeed: 300,
        soundEnabled: false,
        autoGenerate: true,
      },
      theme: 'light',
      language: 'en',

      updateSettings: (settings) =>
        set((state) => ({
          settings: { ...state.settings, ...settings },
        })),

      setTheme: (theme) => set({ theme }),

      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'wix-swipe-preferences',
      partialize: (state) => ({
        settings: state.settings,
        theme: state.theme,
        language: state.language,
      }),
    }
  )
);