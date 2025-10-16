import { create } from 'zustand'

// Define the store interface
interface OffboardingStore {
  isOffboardingComplete: boolean
  currentStep: number
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
  completeOffboarding: () => void
  resetOffboarding: () => void
}

// Create the onboarding store
export const useOffboardingStore = create<OffboardingStore>((set) => ({
  // Initial state
  isOffboardingComplete: false,
  currentStep: 1,

  // Actions
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep > 1 ? state.currentStep - 1 : 1 })),
  setStep: (step: number) => set({ currentStep: step }),
  completeOffboarding: () => set({ isOffboardingComplete: true }),
  resetOffboarding: () => set({ isOffboardingComplete: false, currentStep: 1 })
}))
