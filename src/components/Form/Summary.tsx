
    import { useFormStore } from '../../stores/formStore'
const Summary = () => {

    // Read all needed state from the formStore
    const {
        category,
        subCategory,
        subActivities,
        address,
        placeType,
        materialsProvided,
        toolsProvided,
        peopleNeeded,
        name,
        phone,
        email,
        isBasicInfoValid,
        canSubmit
    } = useFormStore()
    return (
        
        < div className = 'hidden flex-1 md:flex p-4' >
            <div className='w-full rounded-lg border p-4 bg-white/50 dark:bg-black/20'>
                <p className='font-semibold mb-2'>SUMMARY</p>
                <ul className='text-sm space-y-1'>
                    <li>Category: {category ?? '-'}</li>
                    <li>Sub-category: {subCategory ?? '-'}</li>
                    <li>Sub-activities: {subActivities.size ? Array.from(subActivities).join(', ') : '-'}</li>
                    <li>Address: {address || '-'}</li>
                    <li>Place type: {placeType || '-'}</li>
                    <li>People needed: {peopleNeeded ?? '-'}</li>
                    <li>Materials: {materialsProvided ? 'Yes' : 'No'}</li>
                    <li>Tools: {toolsProvided ? 'Yes' : 'No'}</li>
                    <li>Name: {name || '-'}</li>
                    <li>Phone: {phone || '-'}</li>
                    <li>Email: {email || '-'}</li>
                </ul>
                <div className='mt-3 text-sm'>
                    <p>Basic info valid: {isBasicInfoValid() ? 'Yes' : 'No'}</p>
                    <p>Can submit: {canSubmit() ? 'Yes' : 'No'}</p>
                </div>
            </div>
        </div >
  )
}

export default Summary