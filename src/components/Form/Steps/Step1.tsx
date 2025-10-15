
import { useEffect, useMemo } from 'react'
import { useFormStore, type CategoryNode } from '../../../stores/formStore'
import RadioList from '../RadioList'
import CheckboxList from '../CheckboxList'
import TextareaWithCounter from '../TextareaWithCounter'

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
    removePhotoAt,
    isStep1Valid,
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
  const handleCategoryChange = (categoryTitle: string) => {
    setCategory(categoryTitle)
  }
  const handleSubCategoryChange = (subCategoryTitle: string) => {
    setSubCategory(subCategoryTitle)
  }
  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addPhotos(Array.from(e.target.files))
    }
  }

  const categoryError = !category ? 'Please select a category' : ''
  const subCategoryError = currentCategory && !subCategory ? 'Please select a subcategory' : ''
  const descriptionError = currentSubCategory && description.trim().length < 20 ? 'Please enter at least 20 characters' : ''

  return (
    <div className="flex flex-col gap-4 h-full overflow-y-auto">
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
            {categoryError && <p className="text-xs text-red-600 px-2">{categoryError}</p>}
          </div>

          {/* Subcategory Selection - Only show if category is selected */}
          {currentCategory?.subCategories && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Choose a subcategory</h3>
              <RadioList
                name="subcategory"
                options={currentCategory.subCategories.map(s => ({ value: s.title, label: s.title }))}
                value={subCategory}
                onChange={handleSubCategoryChange}
              />
              {subCategoryError && <p className="text-xs text-red-600 px-2">{subCategoryError}</p>}
            </div>
          )}

          {/* Subactivity Selection - Only show if subcategory is selected */}
          {currentSubCategory?.subActivities && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Select activities (multiple allowed)</h3>
              <CheckboxList
                options={currentSubCategory.subActivities.map(a => ({ value: a, label: a }))}
                selected={subActivities}
                onChange={toggleSubActivity}
              />
            </div>
          )}

          {/* Description - Only show if subcategory is selected */}
          {currentSubCategory && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Describe the task</h3>
              <TextareaWithCounter
                id="form-task-description"
                placeholder="Provide details about what needs to be done..."
                value={description}
                onChange={setDescription}
                error={descriptionError}
                minLength={20}
                maxLength={750}
                rows={8}
              />
            </div>
          )}

          {/* Photo Upload - Only show if description has content */}
          {currentSubCategory && (
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold">Add photos (encouraged)</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  accept="image/jpg, image/jpeg, image/png, image/heic"
                  multiple
                  onChange={handlePhotos}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <div className="flex flex-col items-center gap-2">
                    <i className="fa-solid fa-camera text-2xl text-gray-400"></i>
                    <p className="text-sm text-gray-600">Click to upload photos</p>
                    <p className="text-xs text-gray-400">JPG, PNG, HEIC supported</p>
                  </div>
                </label>
              </div>
              
              {/* Photo List */}
              {photos.length > 0 && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-sm font-medium">Uploaded photos:</h4>
                  <ul className="text-sm text-gray-600 flex flex-col gap-1">
                    {photos.map((f, i) => (
                      <li key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <span className="truncate flex-1">{f.name}</span>
                        <button 
                          className="text-red-600 hover:text-red-800" 
                          onClick={() => removePhotoAt(i)}
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Page validity (debug helper) */}
          {!isStep1Valid() && (
            <p className="text-xs text-amber-600 px-2">Please complete all required fields to continue.</p>
          )}
        </>
      )}
    </div>
  )
}

export default Step1