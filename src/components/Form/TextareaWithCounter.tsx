import useDebouncedValidation from '../../hooks/useDebouncedValidation'

type TextareaWithCounterProps = {
  id: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: string
  minLength?: number
  maxLength?: number
  rows?: number
  className?: string
  validator?: (value: string) => string | null
}

const TextareaWithCounter = ({ 
  id, 
  placeholder, 
  value, 
  onChange, 
  error, 
  minLength, 
  maxLength, 
  rows = 8,
  className = '',
  validator
}: TextareaWithCounterProps) => {
  // Use debounced validation if validator is provided
  const debouncedError = validator 
    ? useDebouncedValidation({ value, validator })
    : null
  
  // Use debounced error if available, otherwise fall back to prop error
  const displayError = debouncedError || error
  const hasError = !!displayError
  
  return (
    <div className="flex flex-col gap-2">
      <textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        minLength={minLength}
        maxLength={maxLength}
        rows={rows}
        className={`min-h-32 p-4 glassy rounded-2xl resize-none transition-all placeholder:text-neutral-500 dark:placeholder:text-neutral-400 outline-0 ${
          hasError 
            ? 'focus:inset-ring-2 inset-ring-red-500 headShake' 
            : 'focus:inset-ring-2 inset-ring-emerald-600'
        } ${className}`}
        aria-invalid={hasError}
      />
      
      {maxLength && (
        <div className='flex items-center justify-between'>
            {displayError && <p className="text-xs flex-2 dark:text-red-300 text-red-600">{displayError}</p>}
          <p className='text-xs flex-1 text-right'>{value.length} / {maxLength}</p>
        </div>
      )}
    </div>
  )
}

export default TextareaWithCounter
