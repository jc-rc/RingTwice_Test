import { useFormStore } from '../../../stores/formStore'

function Step3() {
  const { name, phone, email, setName, setPhone, setEmail } = useFormStore()

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
        />
        <input
          id='form-phone'
          type='tel'
          inputMode='tel'
          placeholder='Phone number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="p-4 glassy rounded-2xl outline-0 focus:inset-ring-1 inset-ring-orange-400 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
        />
        <input
          id='form-email'
          type='email'
          inputMode='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 glassy rounded-2xl outline-0 focus:inset-ring-1 inset-ring-orange-400 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
        />
      </div>
    </div>
  )
}

export default Step3