type CheckboxOption = { value: string; label: string }

type CheckboxListProps = {
  options: CheckboxOption[]
  selected: Set<string>
  onChange: (value: string) => void
  className?: string
  itemClassName?: string
}

const CheckboxList = ({ options, selected, onChange, className = '', itemClassName = '' }: CheckboxListProps) => {
  return (
    <fieldset className={`flex flex-col gap-2 px-2 pb-4 ${className}`}>
      {options.map((opt) => (
        <label key={opt.value} className={`clickable flex items-center gap-3 glassy p-4 rounded-2xl has-checked:inset-ring-2 inset-ring-green-600 ${itemClassName}`}>
          <input
            type="checkbox"
            checked={selected.has(opt.value)}
            onChange={() => onChange(opt.value)}
            className="w-4 h-4 accent-green-600 transition-all duration-300"
          />
          <p className="text-sm font-bold">{opt.label}</p>
        </label>
      ))}
    </fieldset>
  )
}

export default CheckboxList
