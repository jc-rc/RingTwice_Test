import { useEffect, useRef, useState } from 'react'
import RadioList from '../RadioList'
import LabeledTextInput from '../LabeledTextInput'
import AmountInput from '../AmountInput'
import CheckboxList from '../CheckboxList'
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

    // Local state for address validation for progressive rendering
    const [addressError, setAddressError] = useState<string | null>(null)

    // Local state for resources (materials and tools) as a Set
    const [resources, setResources] = useState<Set<string>>(new Set())

    // Sync local resources state with form store
    useEffect(() => {
        const newResources = new Set<string>()
        if (materialsProvided) newResources.add('materials')
        if (toolsProvided) newResources.add('tools')
        setResources(newResources)
    }, [materialsProvided, toolsProvided])

    // Handle resource changes
    const handleResourceChange = (value: string) => {
        const newResources = new Set(resources)
        if (newResources.has(value)) {
            newResources.delete(value)
        } else {
            newResources.add(value)
        }
        setResources(newResources)
        
        // Update form store
        setMaterialsProvided(newResources.has('materials'))
        setToolsProvided(newResources.has('tools'))
    }

    // Refs for scrolling to progressive sections
    const placeTypeRef = useRef<HTMLDivElement>(null)
    const resourcesRef = useRef<HTMLDivElement>(null)
    const teamSizeRef = useRef<HTMLDivElement>(null)
    const extraDetailsRef = useRef<HTMLDivElement>(null)

    const placeTypes = [
        { value: 'house', label: 'House' },
        { value: 'apartment', label: 'Apartment' },
        { value: 'other', label: 'Other' },
    ] as const

    // Address validator function that also updates local state for progressive rendering
    const addressValidator = (value: string) => {
        const error = value.trim().length === 0 ? 'Address is required' : null
        setAddressError(error)
        return error
    }

    const placeTypeError = !placeType ? 'Type of place is required' : ''
    const peopleError = typeof peopleNeeded !== 'number' || Number.isNaN(peopleNeeded) ? 'Please enter a valid number' : ''

    // Scroll to place type section when address becomes valid
    useEffect(() => {
        if (!addressError && placeTypeRef.current) {
            placeTypeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [addressError])

    // Scroll to resources section when place type is selected
    useEffect(() => {
        if (placeType && resourcesRef.current) {
            resourcesRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [placeType])

    // Scroll to team size section when place type is selected
    useEffect(() => {
        if (placeType && teamSizeRef.current) {
            teamSizeRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [placeType])

    // Scroll to extra details section when people needed is provided
    useEffect(() => {
        if (typeof peopleNeeded === 'number' && !Number.isNaN(peopleNeeded) && extraDetailsRef.current) {
            extraDetailsRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [peopleNeeded])

    return (
        <div className="flex flex-2 flex-col gap-4 h-full overflow-y-auto fadeIn">
            {/* Address */}
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold">Location</h3>
                    <LabeledTextInput
                        id="form-address"
                        placeholder="Address"
                        value={address}
                        onChange={setAddress}
                        validator={addressValidator}
                        iconName="fa-solid fa-location-dot"
                    />
            </div>

            {/* Place type - radio group - Only show if address is valid */}
            {!addressError && (
                <div ref={placeTypeRef} className="flex flex-col gap-2 fadeIn">
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
                <div ref={resourcesRef} className="flex flex-col gap-2 fadeIn">
                    <h3 className="text-lg font-semibold">Resources</h3>
                    <CheckboxList
                        options={[
                            { value: 'materials', label: 'Materials provided?' },
                            { value: 'tools', label: 'Tools provided?' }
                        ]}
                        selected={resources}
                        onChange={handleResourceChange}
                    />
                </div>
            )}

            {/* People needed - Only show if place type is selected */}
            {placeType && (
                <div ref={teamSizeRef} className="flex flex-col gap-2 fadeIn">
                    <h3 className="text-lg font-semibold">How many people are needed?</h3>
                    <AmountInput
                        value={peopleNeeded}
                        onChange={setPeopleNeeded}
                        min={1}
                        max={10}
                        step={1}
                        placeholder="0"
                        error={peopleError}
                    />
                </div>
            )}

            {/* Extra details - Only show if people needed is provided */}
            {typeof peopleNeeded === 'number' && !Number.isNaN(peopleNeeded) && (
                <div ref={extraDetailsRef} className="flex flex-col gap-2 fadeIn">
                    <h3 className="text-lg font-semibold">Extra details</h3>
                    <textarea
                        className="min-h-32 p-4 glassy rounded-2xl resize-none placeholder:text-neutral-500 dark:placeholder:text-neutral-400 outline-0 focus:inset-ring-1 inset-ring-green-600"
                        rows={5}
                        maxLength={300}
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