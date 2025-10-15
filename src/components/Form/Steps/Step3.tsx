import { useFormStore } from '../../../stores/formStore'

function Step3() {
  const { name, phone, email, setName, setPhone, setEmail, isStep3Valid } = useFormStore()

  const nameError = name.trim().length === 0 ? 'Full name is required' : ''
  const phoneError = phone.trim().length === 0 ? 'Phone number is required' : ''
  const emailError = /.+@.+\..+/.test(email) ? '' : 'Valid email is required'

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Contact */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Contact information</h3>
        <input
          id='form-name'
          type='text'
          placeholder='Full name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-4 glassy rounded-2xl outline-0 focus:inset-ring-1 inset-ring-orange-400 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          aria-invalid={!!nameError}
        />
        {nameError && <p className="text-xs text-red-600">{nameError}</p>}
        <input
          id='form-phone'
          type='tel'
          inputMode='tel'
          placeholder='Phone number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-4 glassy rounded-2xl outline-0 focus:inset-ring-1 inset-ring-orange-400 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          aria-invalid={!!phoneError}
        />
        {phoneError && <p className="text-xs text-red-600">{phoneError}</p>}
        <input
          id='form-email'
          type='email'
          inputMode='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 glassy rounded-2xl outline-0 focus:inset-ring-1 inset-ring-orange-400 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
          aria-invalid={!!emailError}
        />
        {emailError && <p className="text-xs text-red-600">{emailError}</p>}
      </div>

      {/* Page validity (debug helper) */}
      {!isStep3Valid() && (
        <p className="text-xs text-amber-600">Please complete all required fields to continue.</p>
      )}
    </div>
  )
}

export default Step3