
import { useEffect, useMemo, useRef } from 'react'
import { useFormStore, type CategoryNode } from '../../../stores/formStore'
import RadioList from '../RadioList'
import CheckboxList from '../CheckboxList'
import TextareaWithCounter from '../TextareaWithCounter'
import FileDropZone from '../FileDropZone'

const Step1 = () => {

  const categoryIcons = {
    'Gardening' : "🪴",
    'Entertainment' : "🎉",
    'Pets' : "🐶",
    'House chores' : "🧼",
    'Technology' : "🖥️",
    'Transport' : "🚛",
    'Babysitting' : "🐣",
    'Lessons' : "🎓",
    'Wellness' : "🧘‍♀️",
    'Handywork' : "🛠️",
  }

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
    // actions
    setCategory,
    setSubCategory,
    toggleSubActivity,
    setDescription,
    addPhotos,
    
  } = useFormStore()

  // Refs for scrolling to selected category and progressive sections
  const selectedCategoryRef = useRef<HTMLLabelElement>(null)
  const hasScrolledToCategoryRef = useRef<boolean>(false)
  const subCategoryRef = useRef<HTMLDivElement>(null)
  const subActivitiesRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  // Fetch categories on first mount
  useEffect(() => {
    if (!categories.length && !isCategoriesLoading && !categoriesError) {
      void fetchCategories()
    }
  }, [categories.length, isCategoriesLoading, categoriesError, fetchCategories])

  // Scroll to selected category only when first selecting any category
  useEffect(() => {
    if (category && selectedCategoryRef.current && !hasScrolledToCategoryRef.current) {
      selectedCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
      hasScrolledToCategoryRef.current = true
    }
  }, [category])

  // Narrow current category/subcategory for dependent rendering
  const currentCategory: CategoryNode | undefined = useMemo(
    () => categories.find((c) => c.title === category),
    [categories, category]
  )
  const currentSubCategory = useMemo(
    () => currentCategory?.subCategories?.find((s) => s.title === subCategory),
    [currentCategory, subCategory]
  )

  // Scroll to subcategory section when it appears
  useEffect(() => {
    if (currentCategory && subCategoryRef.current) {
      subCategoryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [currentCategory])

  // Scroll to subactivities section when it appears
  useEffect(() => {
    if (currentSubCategory && subActivitiesRef.current) {
      subActivitiesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [currentSubCategory])

  // Scroll to description section when it appears
  useEffect(() => {
    if (subActivities.size > 0 && descriptionRef.current) {
      descriptionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }, [subActivities.size])

  // Handlers
  const handleCategoryChange = (categoryTitle: string) => {
    setCategory(categoryTitle)
  }
  const handleSubCategoryChange = (subCategoryTitle: string) => {
    setSubCategory(subCategoryTitle)
  }

  const descriptionError = currentSubCategory && description.trim().length < 20 ? 'Please enter at least 20 characters' : ''

  return (
    <div className="flex flex-1 flex-col gap-4 h-full overflow-y-auto">
      {/* Loading/Error States */}
      {isCategoriesLoading && (
        <div className="flex flex-col items-center justify-center p-8">
          <i className='fa-solid fa-spinner animate-spin text-2xl'></i>
          <p className="text-lg text-gray-500">Loading categories…</p>
        </div>
      )}
      {categoriesError && (
        <div className="flex items-center justify-center p-8">
          <p className="text-lg text-red-600">Failed to load categories: {categoriesError}</p>
        </div>
      )}

      {!isCategoriesLoading && !categoriesError && (
        <>
          {/* Category Selection */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Choose a category</h3>
            <form className="h-full  rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 has-checked:flex has-checked:min-w-full has-checked:overflow-x-auto has-checked:px-2 px-8 pb-4 ">
                {categories.map((c) => (
                  <label
                    key={c.title}
                    ref={category === c.title ? selectedCategoryRef : null}
                    htmlFor={`option-${c.title}`}
                    className={`cursor-pointer transition-all flex px-4 py-2 items-center justify-center gap-2 glassy rounded-2xl has-checked:inset-ring-2 inset-ring-orange-400 ${currentCategory ? "flex-row" : "flex-col aspect-square w-32 mx-auto"}`}
                  >
                    <p className={`${currentCategory ? "text-2xl" : "text-4xl"}`}>
                      {categoryIcons[c.title as keyof typeof categoryIcons]}
                    </p>
                    <div>
                      <p className="font-bold text-sm">{c.title}</p>
                    </div>
                    <input
                      id={`option-${c.title}`}
                      type="radio"
                      name="category"
                      className="absolute opacity-0"
                      value={c.title}
                      checked={category === c.title}
                      onChange={() => handleCategoryChange(c.title)}
                    />
                  </label>
                ))}
              </div>
            </form>
            
          </div>

          {/* Subcategory Selection - Only show if category is selected */}
          {currentCategory?.subCategories && (
            <div ref={subCategoryRef} className="flex flex-col gap-2 fadeIn">
              <h3 className="text-lg font-semibold">Choose a subcategory</h3>
              <RadioList
                name="subcategory"
                options={currentCategory.subCategories.map(s => ({ value: s.title, label: s.title }))}
                value={subCategory}
                onChange={handleSubCategoryChange}
              />
             
            </div>
          )}

          {/* Subactivity Selection - Only show if subcategory is selected */}
          {currentSubCategory?.subActivities && (
            <div ref={subActivitiesRef} className="flex flex-col gap-2 fadeIn">
              <h3 className="text-lg font-semibold">Select activities (multiple allowed)</h3>
              <CheckboxList
                options={currentSubCategory.subActivities.map(a => ({ value: a, label: a }))}
                selected={subActivities}
                onChange={toggleSubActivity}
              />
             
            </div>
          )}

           {/* Photo Upload - Only show if subactivities are selected */}
           { subActivities.size > 0 && (
            <div className="flex flex-col gap-2 fadeIn">
              <h3 className="text-lg font-semibold">Add photos (encouraged)</h3>
              <FileDropZone
                onFilesChange={addPhotos}
                maxFiles={3}
                acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']}
                maxSize={5 * 1024 * 1024} // 5MB
                existingFiles={photos}
              />
            </div>
          )}

          {/* Description - Only show if subcategory is selected */}
          {subActivities.size > 0 && (
            <div ref={descriptionRef} className="flex flex-col gap-2 fadeIn">
              <h3 className="text-lg font-semibold">Describe the task</h3>
              <TextareaWithCounter
                id="form-task-description"
                placeholder="Provide details about what needs to be done..."
                value={description}
                onChange={setDescription}
                error={descriptionError}
                minLength={20}
                maxLength={750}
                rows={5}
              />
            </div>
          )}

         

          
        </>
      )}
    </div>
  )
}

export default Step1