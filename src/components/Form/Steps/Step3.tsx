import LabeledTextInput from '../LabeledTextInput'
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
        <LabeledTextInput
          id='form-name'
          placeholder='Full name'
          value={name}
          onChange={setName}
          error={nameError}
        />
        <LabeledTextInput
          id='form-phone'
          type='tel'
          inputMode='tel'
          placeholder='Phone number'
          value={phone}
          onChange={setPhone}
          error={phoneError}
        />
        <LabeledTextInput
          id='form-email'
          type='email'
          inputMode='email'
          placeholder='Email'
          value={email}
          onChange={setEmail}
          error={emailError}
        />
      </div>

      {/* Page validity (debug helper) */}
      {!isStep3Valid() && (
        <p className="text-xs text-amber-600">Please complete all required fields to continue.</p>
      )}
    </div>
  )
}

export default Step3