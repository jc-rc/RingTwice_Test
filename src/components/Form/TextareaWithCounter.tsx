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
  className = ''
}: TextareaWithCounterProps) => {
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
        className={`min-h-32 p-4 glassy rounded-2xl resize-none transition-all placeholder:text-neutral-500 dark:placeholder:text-neutral-400 outline-0 focus:inset-ring-1 invalid:inset-ring-red-500 valid:inset-ring-orange-500 ${className}`}
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {maxLength && (
        <div className='flex items-center justify-end'>
          <p className='text-xs'>{value.length} / {maxLength}</p>
        </div>
      )}
    </div>
  )
}

export default TextareaWithCounter
