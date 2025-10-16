import React from 'react'
import useDebouncedValidation from '../../hooks/useDebouncedValidation'

type LabeledTextInputProps = {
  id: string
  type?: string
  placeholder?: string
  value: string
  iconName?: string
  onChange: (v: string) => void
  error?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
  pattern?: string
  validator?: (value: string) => string | null
}

const LabeledTextInput = ({ id, type = 'text', placeholder, value, onChange, error, inputMode, iconName, pattern, validator }: LabeledTextInputProps) => {
  // Use debounced validation if validator is provided
  const debouncedError = validator 
    ? useDebouncedValidation({ value, validator })
    : null
  
  // Use debounced error if available, otherwise fall back to prop error
  const displayError = debouncedError || error
  const hasError = !!displayError
  
  return (
    <div className="flex flex-col gap-2">
      <div className={`flex items-center gap-2 p-4 glassy rounded-2xl ${hasError
              ? 'has-focus:inset-ring-2 inset-ring-red-500 headShake'
              : 'inset-ring-2 inset-ring-emerald-600'
            }`}>
        <i className={`fa-solid ${iconName}`}></i>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          inputMode={inputMode}
          className={`w-full outline-0 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 `}
          aria-invalid={hasError}
          pattern={pattern}
        />
      </div>
      {displayError && <p className="text-xs text-red-600">{displayError}</p>}
    </div>
  )
}

export default LabeledTextInput
