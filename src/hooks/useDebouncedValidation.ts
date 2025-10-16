import { useState, useEffect } from 'react'

interface UseDebouncedValidationProps {
  value: string
  validator: (value: string) => string | null
  delay?: number
}

/**
 * Custom hook for debounced validation
 * Waits for user to stop typing before running validation
 * 
 * @param value - The input value to validate
 * @param validator - Function that returns error message or null
 * @param delay - Debounce delay in milliseconds (default: 300ms)
 * @returns The validation error message or null
 */
const useDebouncedValidation = ({ 
  value, 
  validator, 
  delay = 300 
}: UseDebouncedValidationProps): string | null => {
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Clear error immediately when user starts typing
    if (value.length > 0) {
      setError(null)
    }

    // Set up debounced validation
    const timer = setTimeout(() => {
      const validationResult = validator(value)
      setError(validationResult)
    }, delay)

    // Cleanup timer on value change or unmount
    return () => clearTimeout(timer)
  }, [value, validator, delay])

  return error
}

export default useDebouncedValidation
