type RadioOption = { value: string; label: string }

type RadioListProps = {
  name: string
  options: RadioOption[]
  value: string | null
  onChange: (value: string) => void
  className?: string
  itemClassName?: string
  showCheckIcon?: boolean
}

const RadioList = ({ name, options, value, onChange, className = '', itemClassName = '', showCheckIcon = true }: RadioListProps) => {
  return (
    <form className={`h-full overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 gap-2 has-checked:flex has-checked:min-w-full has-checked:overflow-x-auto snap-x snap-proximity pb-2 px-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            htmlFor={`${name}-${opt.value}`}
            className={`cursor-pointer transition-all flex flex-col items-start justify-center gap-2 has-checked:inset-ring-2 snap-center inset-ring-orange-400 glassy rounded-2xl p-4 ${value ? 'min-w-fit' : 'p-4'} ${itemClassName}`}
          >
            <div className='flex items-center gap-2'>
              {showCheckIcon && (
                <i className={`fa-solid ${value === opt.value ? 'fa-circle-check text-orange-400' : 'fa-circle'}`}></i>
              )}
              <p className="font-bold text-sm">{opt.label}</p>
            </div>
            <input
              id={`${name}-${opt.value}`}
              type="radio"
              name={name}
              className="peer absolute opacity-0"
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
          </label>
        ))}
      </div>
    </form>
  )
}

export default RadioList
