type LabeledTextInputProps = {
  id: string
  type?: string
  placeholder?: string
  value: string
  onChange: (v: string) => void
  error?: string
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"]
}

const LabeledTextInput = ({ id, type = 'text', placeholder, value, onChange, error, inputMode }: LabeledTextInputProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        inputMode={inputMode}
        className="p-4 glassy rounded-2xl outline-0 focus:inset-ring-1 inset-ring-orange-400 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}

export default LabeledTextInput
