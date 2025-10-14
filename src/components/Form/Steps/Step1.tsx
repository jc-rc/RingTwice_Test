
import { useEffect, useMemo } from 'react'
import { useFormStore, type CategoryNode } from '../../../stores/formStore'

const Step1 = () => {
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
  const handleToggleSubActivity = (name: string) => () => {
    toggleSubActivity(name)
  }
  const handlePhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addPhotos(Array.from(e.target.files))
    }
  }

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto">
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
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-semibold">Choose a category</h3>
            <form className="h-full  rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 gap-4 has-checked:flex has-checked:min-w-full has-checked:overflow-x-auto has-checked:pe-6 py-2 ">
                {categories.map((c) => (
                  <label
                    key={c.title}
                    htmlFor={`option-${c.title}`}
                    className={`cursor-pointer transition-all flex px-4 py-2 items-center justify-center gap-1 glassy rounded-2xl has-checked:border-2 has-checked:order-first ${currentCategory ? "flex-row" : "flex-col aspect-square w-32 mx-auto"}`}
                  >
                    <p className="text-4xl">🪴</p>
                    <div>
                      <p className="font-bold text-xs">{c.title}</p>
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
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Choose a subcategory</h3>
              <form className="h-full border rounded-lg overflow-hidden bg-pink-300">
                <div className="border grid grid-cols-1 gap-4 has-checked:flex has-checked:min-w-full has-checked:overflow-x-auto snap-x snap-proximity bg-blue-200 has-checked:py-4">
                  {currentCategory.subCategories.map((s) => (
                    <label
                      key={s.title}
                      htmlFor={`suboption-${s.title}`}
                      className="cursor-pointer transition-all flex p-4 min-h-16 flex-col items-center justify-center gap-1 border has-checked:bg-green-300 snap-center "
                    >
                      <div>
                        <p className="font-bold text-sm">{s.title}</p>
                      </div>
                      <input
                        id={`suboption-${s.title}`}
                        type="radio"
                        name="subcategory"
                        className="absolute opacity-0"
                        value={s.title}
                        checked={subCategory === s.title}
                        onChange={() => handleSubCategoryChange(s.title)}
                      />
                    </label>
                  ))}
                </div>
              </form>
            </div>
          )}

          {/* Subactivity Selection - Only show if subcategory is selected */}
          {currentSubCategory?.subActivities && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Select activities (multiple allowed)</h3>
              <fieldset className="flex flex-col gap-3 p-4 border rounded-lg bg-gray-50">
                {currentSubCategory.subActivities.map((a) => (
                  <label key={a} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={subActivities.has(a)}
                      onChange={handleToggleSubActivity(a)}
                      className="w-4 h-4"
                    />
                    <p className="text-sm">{a}</p>
                  </label>
                ))}
              </fieldset>
            </div>
          )}

          {/* Description - Only show if subcategory is selected */}
          {currentSubCategory && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Describe the task</h3>
              <textarea
                className="min-h-32 p-4 border rounded-lg resize-none"
                rows={5}
                placeholder="Provide details about what needs to be done..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          )}

          {/* Photo Upload - Only show if description has content */}
          {currentSubCategory && (
            <div className="flex flex-col gap-4">
              <h3 className="text-lg font-semibold">Add photos (optional)</h3>
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
        </>
      )}
    </div>
  )
}

export default Step1