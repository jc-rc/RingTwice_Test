import RadioList from '../RadioList'
import LabeledTextInput from '../LabeledTextInput'
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
        isStep2Valid,
    } = useFormStore()

    const placeTypes = [
        { value: 'house', label: 'House' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'other', label: 'Other' },
    ] as const

    const addressError = address.trim().length === 0 ? 'Address is required' : ''
    const placeTypeError = !placeType ? 'Type of place is required' : ''
    const peopleError = typeof peopleNeeded !== 'number' || Number.isNaN(peopleNeeded) ? 'Please enter a valid number' : ''

    return (
        <div className="flex flex-2 flex-col gap-4 h-full overflow-y-auto fadeInRight">
            {/* Address */}
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Location</h3>
                <LabeledTextInput
                    id="form-address"
                    placeholder="Address"
                    value={address}
                    onChange={setAddress}
                    error={addressError}
                    iconName="fa-solid fa-location-dot"
                />
            </div>

            {/* Place type - radio group - Only show if address is provided */}
            {address.trim() && (
                <div className="flex flex-col gap-2 fadeIn">
                    <h3 className="text-lg font-semibold">Type of place</h3>
                    <RadioList
                        name="place-type"
                        options={[...placeTypes]}
                        value={placeType ?? null}
                        onChange={setPlaceType}
                    />
                    {placeTypeError && <p className="text-xs text-red-600">{placeTypeError}</p>}
                </div>
            )}

            {/* Materials / Tools - Only show if place type is selected */}
            {placeType && (
                <div className="flex flex-col gap-2 fadeIn">
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
            )}

            {/* People needed - Only show if place type is selected */}
            {placeType && (
                <div className="flex flex-col gap-2 fadeIn">
                    <h3 className="text-lg font-semibold">Team size</h3>
                    <LabeledTextInput
                        id='form-people-needed'
                        type='number'
                        inputMode='numeric'
                        placeholder='People required for the task?'
                        value={peopleNeeded === null ? '' : String(peopleNeeded)}
                        onChange={(v) => setPeopleNeeded(v === '' ? null : Number(v))}
                        error={peopleError}
                    />
                </div>
            )}

            {/* Extra details - Only show if people needed is provided */}
            {typeof peopleNeeded === 'number' && !Number.isNaN(peopleNeeded) && (
                <div className="flex flex-col gap-2 fadeIn">
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
            )}


        </div>
    )
}

export default Step2