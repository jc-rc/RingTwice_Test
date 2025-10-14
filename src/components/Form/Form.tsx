import { useEffect, useMemo } from 'react'
import { useFormStore, type CategoryNode } from '../../stores/formStore'
import { useOnboardingStore } from '../../stores/onboardingStore'
import CategorySelector from './CategorySelector'
import Button from './Button'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import Step4 from './Steps/Step4'
import { t } from 'i18next'

const Form = () => {
    // Onboarding control remains intact
    const { resetOnboarding } = useOnboardingStore()

    // Pull state and actions from the form store
    const {
        // catalog
        categories,
        isCategoriesLoading,
        categoriesError,
        fetchCategories,
        // inputs
        category,
        subCategory,
        subActivities,
        description,
        photos,
        address,
        placeType,
        materialsProvided,
        toolsProvided,
        peopleNeeded,
        extraDetails,
        name,
        phone,
        email,
        // steps
        currentStep,
        nextStep,
        prevStep,
        // actions
        setCategory,
        setSubCategory,
        toggleSubActivity,
        setDescription,
        addPhotos,
        removePhotoAt,
        setAddress,
        setPlaceType,
        setMaterialsProvided,
        setToolsProvided,
        setPeopleNeeded,
        setExtraDetails,
        setName,
        setPhone,
        setEmail,

    } = useFormStore()

    // Fetch categories on first mount
    useEffect(() => {
        if (!categories.length && !isCategoriesLoading && !categoriesError) {
            void fetchCategories()
        }
    }, [categories.length, isCategoriesLoading, categoriesError, fetchCategories])

    // Narrow current category/subcategory for dependent rendering
    const currentCategory: CategoryNode | undefined = useMemo(
        () => categories.find((c) => c.title === category),
        [categories, category]
    )
    const currentSubCategory = useMemo(
        () => currentCategory?.subCategories?.find((s) => s.title === subCategory),
        [currentCategory, subCategory]
    )

    // Handlers
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value || null)
    }
    const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSubCategory(e.target.value || null)
    }
    const handleToggleSubActivity = (name: string) => () => {
        toggleSubActivity(name)
    }
    const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            addPhotos(Array.from(e.target.files))
        }
    }

    return (
        <>
            <div className='flex flex-col gap-4 fadeInRight flex-1 h-full overflow-hidden p-8 glassy md:rounded-4xl'>


                <div className='flex flex-col gap-4'>
                    <i className='fa-solid fa-hammer text-4xl'></i>
                    <p className='font-bold text-xl'>What are we working on?</p>
                </div>

                <div className='flex items-center gap-4 flex-1 overflow-hidden'>
                    <div className='flex flex-col gap-8 h-full flex-1 overflow-y-auto'>
                        {/* Categories */}
                        {isCategoriesLoading && (
                            <p className='text-sm text-gray-500'>Loading categories…</p>
                        )}
                        {categoriesError && (
                            <p className='text-sm text-red-600'>Failed to load categories: {categoriesError}</p>
                        )}
                        {!isCategoriesLoading && !categoriesError && (
                            <>

                                <CategorySelector></CategorySelector>

                                <select id='form-category' value={category ?? ''} onChange={handleCategoryChange}>
                                    <option selected hidden value=''>Category</option>
                                    {categories.map((c) => (
                                        <option key={c.title} value={c.title}>
                                            {c.title}
                                        </option>
                                    ))}
                                </select>

                                {/* Sub-categories (only if available) */}
                                {currentCategory?.subCategories && (
                                    <select id='form-subcategory' value={subCategory ?? ''} onChange={handleSubCategoryChange}>
                                        <option selected hidden value=''>Sub-category</option>
                                        {currentCategory.subCategories.map((s) => (
                                            <option key={s.title} value={s.title}>
                                                {s.title}
                                            </option>
                                        ))}
                                    </select>
                                )}

                                {/* Sub-activities (multiple) */}
                                {currentSubCategory?.subActivities && (
                                    <fieldset id='form-subactivity' className='flex flex-col gap-2'>
                                        {currentSubCategory.subActivities.map((a) => (
                                            <label key={a} className='flex items-center gap-2'>
                                                <input
                                                    type='checkbox'
                                                    checked={subActivities.has(a)}
                                                    onChange={handleToggleSubActivity(a)}
                                                />
                                                <p>{a}</p>
                                            </label>
                                        ))}
                                    </fieldset>
                                )}
                            </>
                        )}

                        {/* Description */}
                        <textarea
                            className='min-h-32'
                            rows={5}
                            id='form-task-description'
                            placeholder='Description details'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* Photos */}
                        <input
                            type='file'
                            id='form-photos'
                            accept='image/jpg, image/jpeg, image/png, image/heic'
                            multiple
                            onChange={handlePhotos}
                        />
                        {photos.length > 0 && (
                            <ul className='text-sm text-gray-600 flex flex-col gap-1'>
                                {photos.map((f, i) => (
                                    <li key={i} className='flex items-center gap-2'>
                                        <span className='truncate'>{f.name}</span>
                                        <button className='text-red-600' onClick={() => removePhotoAt(i)}>
                                            Remove
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}

                        <hr />

                        {/* Address */}
                        <input
                            type='text'
                            id='form-address'
                            placeholder='Address'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        {/* Place type */}
                        <select id='form-place-type' value={placeType ?? ''} onChange={(e) => setPlaceType(e.target.value || null)}>
                            <option value=''>Type of place</option>
                            <option value='house'>House</option>
                            <option value='apartment'>Apartment</option>
                            <option value='other'>Other</option>
                        </select>

                        {/* Materials / Tools */}
                        <label htmlFor='form-materials' className='flex items-center gap-2'>
                            <input
                                id='form-materials'
                                type='checkbox'
                                checked={materialsProvided}
                                onChange={(e) => setMaterialsProvided(e.target.checked)}
                            />
                            <p>Materials provided?</p>
                        </label>
                        <label htmlFor='form-tools' className='flex items-center gap-2'>
                            <input
                                id='form-tools'
                                type='checkbox'
                                checked={toolsProvided}
                                onChange={(e) => setToolsProvided(e.target.checked)}
                            />
                            <p>Tools provided?</p>
                        </label>

                        {/* People needed */}
                        <input
                            id='form-people-needed'
                            type='number'
                            inputMode='numeric'
                            placeholder='People required?'
                            value={peopleNeeded ?? ''}
                            onChange={(e) => {
                                const v = e.target.value
                                setPeopleNeeded(v === '' ? null : Number(v))
                            }}
                        />

                        {/* Extra details */}
                        <textarea
                            className='min-h-32'
                            rows={5}
                            id='form-extra-details'
                            placeholder='Extra details (how to enter, parking, etc.)'
                            value={extraDetails}
                            onChange={(e) => setExtraDetails(e.target.value)}
                        />

                        <hr />

                        {/* Contact */}
                        <input
                            id='form-name'
                            type='text'
                            placeholder='Full name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            id='form-phone'
                            type='tel'
                            inputMode='tel'
                            placeholder='Phone number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <input
                            id='form-email'
                            type='email'
                            inputMode='email'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>


                </div>

                {
                    currentStep === 1 &&
                    <Step1 />
                }
                {
                    currentStep === 2 &&
                    <Step2 />
                }
                {
                    currentStep === 3 &&
                    <Step3 />
                }
                {
                    currentStep === 4 &&
                    <Step4 />
                }

                <div>

                    <div className='flex items-center gap-8'>
                        <Button label={t("form.back")} className=' w-full bg-green-600 text-neutral-200 shadow-lg' onClick={nextStep} />
                        <Button label='Reset onboarding' className=' w-full bg-red-600 text-neutral-200 shadow-lg' onClick={resetOnboarding} />
                        <Button label={t("form.continue")} className=' w-full bg-green-600 text-neutral-200 shadow-lg' onClick={nextStep} />
                    </div>
                </div>
            </div>


        </>
    )
}

export default Form