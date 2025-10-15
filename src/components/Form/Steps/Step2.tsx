import { useFormStore } from '../../../stores/formStore'

const Step2 = () => {
  const {
    address,
    placeType,
    materialsProvided,
    toolsProvided,
    peopleNeeded,
    extraDetails,
    setAddress,
    setPlaceType,
    setMaterialsProvided,
    setToolsProvided,
    setPeopleNeeded,
    setExtraDetails,
  } = useFormStore()

  const placeTypes = [
    { value: 'house', label: 'House' },
    { value: 'apartment', label: 'Apartment' },
    { value: 'other', label: 'Other' },
  ] as const

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
      {/* Address */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Location</h3>
        <input
          type="text"
          id="form-address"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="p-4 glassy rounded-2xl outline-0 focus:inset-ring-1 inset-ring-orange-400 placeholder:text-neutral-500 dark:placeholder:text-neutral-400"
        />
      </div>

      {/* Place type - radio group */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Type of place</h3>
        <form className="h-full overflow-hidden ">
          <div className="grid grid-cols-1 gap-2 has-checked:flex has-checked:min-w-full has-checked:overflow-x-auto snap-x snap-proximity pb-2 px-2">
            {placeTypes.map((p) => (
              <label
                key={p.value}
                htmlFor={`place-${p.value}`}
                className={`cursor-pointer transition-all flex flex-col items-start justify-center gap-2 has-checked:inset-ring-2 snap-center inset-ring-orange-400 glassy rounded-2xl p-4 ${placeType ? 'min-w-fit' : 'p-4'}`}
              >
                <div className='flex items-center gap-2'>
                  <i className={`fa-solid ${placeType === p.value ? 'fa-circle-check text-orange-400' : 'fa-circle'}`}></i>
                  <p className="font-bold text-sm">{p.label}</p>
                </div>
                <input
                  id={`place-${p.value}`}
                  type="radio"
                  name="place-type"
                  className="peer absolute opacity-0"
                  value={p.value}
                  checked={placeType === p.value}
                  onChange={() => setPlaceType(p.value)}
                />
              </label>
            ))}
          </div>
        </form>
      </div>

      {/* Materials / Tools */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Resources</h3>
        <label htmlFor='form-materials' className='flex items-center gap-3 glassy p-4 rounded-2xl has-checked:inset-ring-2 inset-ring-orange-400'>
          <input
            id='form-materials'
            type='checkbox'
            checked={materialsProvided}
            onChange={(e) => setMaterialsProvided(e.target.checked)}
            className="w-4 h-4"
          />
          <p className="font-medium">Materials provided?</p>
        </label>
        <label htmlFor='form-tools' className='flex items-center gap-3 glassy p-4 rounded-2xl has-checked:inset-ring-2 inset-ring-orange-400'>
          <input
            id='form-tools'
            type='checkbox'
            checked={toolsProvided}
            onChange={(e) => setToolsProvided(e.target.checked)}
            className="w-4 h-4"
          />
          <p className="font-medium">Tools provided?</p>
        </label>
      </div>

      {/* People needed */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Team size</h3>
        <input
          id='form-people-needed'
          type='number'
          inputMode='numeric'
          placeholder='People required for the task?'
          value={peopleNeeded ?? ''}
          onChange={(e) => {
            const v = e.target.value
            setPeopleNeeded(v === '' ? null : Number(v))
          }}
          className="p-4 glassy rounded-2xl outline-0 focus:inset-ring-1 inset-ring-orange-400"
        />
      </div>

      {/* Extra details */}
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Extra details</h3>
        <textarea
          className="min-h-32 p-4 glassy rounded-2xl resize-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400 outline-0 focus:inset-ring-1 inset-ring-orange-400"
          rows={6}
          id='form-extra-details'
          placeholder='How to enter, parking, pets, etc.'
          value={extraDetails}
          onChange={(e) => setExtraDetails(e.target.value)}
        />
      </div>
    </div>
  )
}

export default Step2