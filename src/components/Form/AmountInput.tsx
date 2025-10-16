import React from 'react'
import { useTranslation } from 'react-i18next'

interface AmountInputProps {
  value: number | null
  onChange: (value: number | null) => void
  min?: number
  max?: number
  step?: number
  placeholder?: string
  error?: string | null
  className?: string
}

const AmountInput = ({
  value,
  onChange,
  min = 1,
  max = 20,
  step = 1,
  placeholder = "0",
  error,
  className = ""
}: AmountInputProps) => {
  const { t } = useTranslation()
  const handleIncrement = () => {
    const currentValue = value || 0
    const newValue = Math.min(currentValue + step, max)
    onChange(newValue)
  }

  const handleDecrement = () => {
    const currentValue = value || 0
    const newValue = Math.max(currentValue - step, min)
    onChange(newValue)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    if (inputValue === '') {
      onChange(null)
    } else {
      const numValue = parseInt(inputValue, 10)
      if (!isNaN(numValue)) {
        const clampedValue = Math.min(Math.max(numValue, min), max)
        onChange(clampedValue)
      }
    }
  }

  const displayValue = value === null ? '' : value.toString()
  const isMinDisabled = value === null || value <= min
  const isMaxDisabled = value !== null && value >= max

  return (
    <div className={`flex flex-col gap-2 glassy rounded-2xl p-4 items-center ${className}`}>
      <div className="flex items-center gap-2">
        {/* STYLING AREA 1: Decrement Button */}
        <button
          type="button"
          onClick={handleDecrement}
          disabled={isMinDisabled}
          className={`
            size-10 rounded-full flex items-center justify-center text-neutral-200
            ${isMinDisabled
              ? 'bg-emerald-600/30  cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-600 clickable'
            }
          `}
            aria-label={t('accessibility.decrease_amount')}
        >
          <i className="fa-solid fa-minus"></i>
        </button>

        {/* STYLING AREA 2: Number Input */}
        <input
          type="number"
          value={displayValue}
          onChange={handleInputChange}
          placeholder={t('placeholders.amount_input')}
          min={min}
          max={max}
          step={step}
          className={`
            flex items-center justify-center p-3 text-center font-bold text-2xl rounded-lg outline-0
            placeholder:text-neutral-500 dark:placeholder:text-neutral-400 appearance-none
            ${error
              ? 'focus:inset-ring-2 inset-ring-red-500 focus:headShake'
              : 'focus:inset-ring-2 inset-ring-emerald-600'
            }
          `}
          aria-invalid={!!error}
        />

        {/* STYLING AREA 3: Increment Button */}
        <button
          type="button"
          onClick={handleIncrement}
          disabled={isMaxDisabled}
          className={`
            size-10 rounded-full flex items-center justify-center text-neutral-200
            ${isMaxDisabled
              ? 'bg-emerald-600/30  cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-600  clickable'
            }
          `}
            aria-label={t('accessibility.increase_amount')}
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

    
    
    </div>
  )
}

export default AmountInput