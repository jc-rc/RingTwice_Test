import { useState } from 'react'
import LabeledTextInput from '../LabeledTextInput'
import { useFormStore } from '../../../stores/formStore'

function Step3() {
  const { name, phone, email, setName, setPhone, setEmail } = useFormStore()
  
  // Local state to track validation results for progressive rendering
  const [nameError, setNameError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

    // Validator functions that also update local state for progressive rendering
    const nameValidator = (value: string) => {
        const error = value.trim().length === 0 ? 'Full name is required' : null
        setNameError(error)
        return error
    }

    const phoneValidator = (value: string) => {
        const error = value.trim().length === 0 || !/^[0-9]*$/.test(value) ? 'Phone number is required' : null
        setPhoneError(error)
        return error
    }

    const emailValidator = (value: string) => {
        if (!/.+@.+\..+/.test(value)) {
            return 'Valid email is required'
        }
        return null
    }

  return (
    <div className="flex flex-col flex-2 gap-4 h-full overflow-y-auto fadeIn">
      {/* Contact */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Contact information</h3>
        <LabeledTextInput
          id='form-name'
          placeholder='Full name'
          value={name}
          onChange={setName}
          validator={nameValidator}
          iconName="fa-solid fa-user"
        />
      </div>

      {/* Phone - Only show if name is valid */}
      {!nameError && (
        <div className="flex flex-col gap-2 fadeIn">
          <LabeledTextInput
            id='form-phone'
            type='tel'
            inputMode='tel'
            placeholder='Phone number'
            value={phone}
            onChange={setPhone}
            validator={phoneValidator}
            iconName="fa-solid fa-phone"
            pattern="^[0-9]*$"
          />
        </div>
      )}

      {/* Email - Only show if phone is valid */}
      {!phoneError && (
        <div className="flex flex-col gap-2 fadeIn">
          <LabeledTextInput
            id='form-email'
            type='email'
            inputMode='email'
            placeholder='Email'
            value={email}
            onChange={setEmail}
            validator={emailValidator}
            iconName="fa-solid fa-envelope"
          />
        </div>
      )}
    </div>
  )
}

export default Step3