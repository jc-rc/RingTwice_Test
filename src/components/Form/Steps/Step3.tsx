import LabeledTextInput from '../LabeledTextInput'
import { useFormStore } from '../../../stores/formStore'

function Step3() {
  const { name, phone, email, setName, setPhone, setEmail } = useFormStore()

  const nameError = name.trim().length === 0 ? 'Full name is required' : ''
  const phoneError = phone.trim().length === 0 || !/^[0-9]*$/.test(phone) ? 'Phone number is required' : ''
  const emailError = /.+@.+\..+/.test(email) ? '' : 'Valid email is required'

  return (
    <div className="flex flex-col flex-2 gap-4 h-full overflow-y-auto fadeinRight">
      {/* Contact */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Contact information</h3>
        <LabeledTextInput
          id='form-name'
          placeholder='Full name'
          value={name}
          onChange={setName}
          error={nameError}
          iconName="fa-solid fa-user"
        />
      </div>

      {/* Phone - Only show if name is provided */}
      {!nameError && (
        <div className="flex flex-col gap-2 fadeIn">
          <LabeledTextInput
            id='form-phone'
            type='tel'
            inputMode='tel'
            placeholder='Phone number'
            value={phone}
            onChange={setPhone}
            error={phoneError}
            iconName="fa-solid fa-phone"
            pattern="^[0-9]*$"
          />
        </div>
      )}

      {/* Email - Only show if phone is provided */}
      {!phoneError && (
        <div className="flex flex-col gap-2 fadeIn">
          <LabeledTextInput
            id='form-email'
            type='email'
            inputMode='email'
            placeholder='Email'
            value={email}
            onChange={setEmail}
            error={emailError}
            iconName="fa-solid fa-envelope"
          />
        </div>
      )}
    </div>
  )
}

export default Step3