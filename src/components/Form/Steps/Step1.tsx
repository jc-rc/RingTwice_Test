
import { useEffect, useMemo, useRef } from 'react'
import { useFormStore, type CategoryNode } from '../../../stores/formStore'
import { useTranslation } from 'react-i18next'
import RadioList from '../RadioList'
import CheckboxList from '../CheckboxList'
import TextareaWithCounter from '../TextareaWithCounter'
import FileDropZone from '../FileDropZone'

const Step1 = () => {
  const { t } = useTranslation()

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

  // Refs for progressive sections
  const categoryScrollerRef = useRef<HTMLDivElement>(null)
  const subCategoryRef = useRef<HTMLDivElement>(null)
  const subActivitiesRef = useRef<HTMLDivElement>(null)
  const descriptionRef = useRef<HTMLDivElement>(null)

  // Fetch categories on first mount
  useEffect(() => {
    if (!categories.length && !isCategoriesLoading && !categoriesError) {
      void fetchCategories()
    }
  }, [categories.length, isCategoriesLoading, categoriesError, fetchCategories])

  // Scroll to beginning when category is selected
  useEffect(() => {
    if (category && categoryScrollerRef.current) {
      categoryScrollerRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      })
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

        // Description validator function
        const descriptionValidator = (value: string) => {
            if (currentSubCategory && value.trim().length < 20) {
                return t('validation.min_characters')
            }
            return null
        }

  return (
    <div className="flex flex-1 flex-col gap-4 h-full overflow-y-auto">
      {/* Loading/Error States */}
      {isCategoriesLoading && (
        <div className="flex flex-col items-center justify-center p-8">
          <i className='fa-solid fa-spinner animate-spin text-2xl'></i>
          <p className="text-lg text-gray-500">{t('loading.categories')}</p>
        </div>
      )}
      {categoriesError && (
        <div className="flex items-center justify-center p-8">
          <p className="text-lg text-red-600">{t('loading.failed_load_categories')} {categoriesError}</p>
        </div>
      )}

      {!isCategoriesLoading && !categoriesError && (
        <>
          {/* Category Selection */}
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{t('form_labels.choose_category')}</h3>
            <form className="h-full flex justify-center items-center rounded-lg overflow-hidden">
              <div 
                ref={categoryScrollerRef}
                className={`${category ? 'flex overflow-x-auto gap-4 px-2 pb-4' : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-8 pb-4'}`}
              >
                {categories.map((c) => (
                  <label
                    key={c.title}
                    htmlFor={`option-${c.title}`}
                    className={`clickable flex px-4 py-2 items-center justify-center gap-2 glassy rounded-2xl has-checked:inset-ring-2 inset-ring-emerald-600 has-checked:order-first ${category ? 'flex-row min-w-max' : 'flex-col aspect-square w-32 lg:w-24 mx-auto'}`}
                  >
                    <p className={`${category ? 'text-2xl' : 'text-4xl'}`}>
                      {categoryIcons[c.title as keyof typeof categoryIcons]}
                    </p>
                    <div className=''>
                      <p className={`font-bold text-center ${category ? 'text-sm w-max' : 'text-xs'}`}>{t(`categories.${c.title}`)}</p>
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
              <h3 className="text-lg font-semibold">{t('form_labels.choose_subcategory')}</h3>
              <RadioList
                name="subcategory"
                options={currentCategory.subCategories.map(s => ({ value: s.title, label: t(`subcategories.${s.title}`) }))}
                value={subCategory}
                onChange={handleSubCategoryChange}
              />
             
            </div>
          )}

          {/* Subactivity Selection - Only show if subcategory is selected */}
          {currentSubCategory?.subActivities && (
            <div ref={subActivitiesRef} className="flex flex-col gap-2 fadeIn">
              <h3 className="text-lg font-semibold">{t('form_labels.select_activities')}</h3>
              <CheckboxList
                options={currentSubCategory.subActivities.map(a => ({ value: a, label: t(`subactivities.${a}`) }))}
                selected={subActivities}
                onChange={toggleSubActivity}
              />
             
            </div>
          )}

           {/* Photo Upload - Only show if subactivities are selected */}
           { subActivities.size > 0 && (
            <div className="flex flex-col gap-2 fadeIn">
              <h3 className="text-lg font-semibold">{t('form_labels.add_photos')}</h3>
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
              <h3 className="text-lg font-semibold">{t('form_labels.describe_task')}</h3>
                    <TextareaWithCounter
                        id="form-task-description"
                        placeholder={t('placeholders.describe_task')}
                        value={description}
                        onChange={setDescription}
                        validator={descriptionValidator}
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