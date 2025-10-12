import { create } from 'zustand'

// Define the theme type
type Theme = 'light' | 'dark'

// Define the store interface
interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
}

// Create the theme store
export const useThemeStore = create<ThemeStore>((set) => ({
  // Initial state
  theme: 'light',
  
  // Actions
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'light' ? 'dark' : 'light'
  }))
}))
