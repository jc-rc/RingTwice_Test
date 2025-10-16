import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import LabeledTextInput from '../LabeledTextInput'
import { useFormStore } from '../../../stores/formStore'

function Step3() {
  const { t } = useTranslation()
  const { name, phone, email, setName, setPhone, setEmail } = useFormStore()
  
  // Local state to track validation results for progressive rendering
  const [nameError, setNameError] = useState<string | null>(null)
  const [phoneError, setPhoneError] = useState<string | null>(null)

    // Validator functions that also update local state for progressive rendering
    const nameValidator = (value: string) => {
        const error = value.trim().length === 0 ? t('validation.full_name_required') : null
        setNameError(error)
        return error
    }

    const phoneValidator = (value: string) => {
        const error = value.trim().length === 0 || !/^[0-9]*$/.test(value) ? t('validation.phone_required') : null
        setPhoneError(error)
        return error
    }

    const emailValidator = (value: string) => {
        if (!/.+@.+\..+/.test(value)) {
            return t('validation.valid_email_required')
        }
        return null
    }

  return (
    <div className="flex flex-col flex-2 gap-4 h-full overflow-y-auto fadeIn">
      {/* Contact */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{t('form_labels.contact_information')}</h3>
        <LabeledTextInput
          id='form-name'
          placeholder={t('placeholders.full_name')}
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
             placeholder={t('placeholders.phone_number')}
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
             placeholder={t('placeholders.email')}
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