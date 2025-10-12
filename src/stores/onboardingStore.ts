import { create } from 'zustand'

// Define the store interface
interface OnboardingStore {
  isOnboardingComplete: boolean
  currentStep: number
  nextStep: () => void
  prevStep: () => void
  setStep: (step: number) => void
  completeOnboarding: () => void
  resetOnboarding: () => void
}

// Create the onboarding store
export const useOnboardingStore = create<OnboardingStore>((set) => ({
  // Initial state
  isOnboardingComplete: false,
  currentStep: 1,

  // Actions
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () => set((state) => ({ currentStep: state.currentStep > 1 ? state.currentStep - 1 : 1 })),
  setStep: (step: number) => set({ currentStep: step }),
  completeOnboarding: () => set({ isOnboardingComplete: true }),
  resetOnboarding: () => set({ isOnboardingComplete: false, currentStep: 1 })
}))
