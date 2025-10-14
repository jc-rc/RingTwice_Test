import { useEffect, useMemo } from "react"
import { useFormStore, type CategoryNode } from "../../stores/formStore"

const CategorySelector = () => {
    const { categories, isCategoriesLoading, categoriesError, fetchCategories, category, subCategory, setCategory, setSubCategory, toggleSubActivity } = useFormStore()



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


    return (
        <div className="flex flex-col gap-4 min-h-full">

            <form id="form-category" className="h-full border flex items-center justify-center has-checked:items-start has-checked:justify-start overflow-hidden has-checked:h-fit bg-pink-300">
                
                <div className="border grid grid-cols-2 gap-8 has-checked:flex has-checked:min-w-full has-checked:overflow-x-auto snap-x snap-proximity bg-blue-200 has-checked:py-4">

                    {categories.map((c) => (
                            <label key={c.title} htmlFor={`option-${c.title}`} className="cursor-pointer transition-all flex p-4 aspect-square size-32 flex-col items-center justify-center gap-1 border  has-checked:bg-green-300 snap-center">
                                <p className="text-4xl ">🪴</p>

                                <div><p className="font-bold text-sm">{c.title}</p></div>
                                <input id={`option-${c.title}`} type="radio" name="category" className="absolute opacity-0" value={c.title} />
                            </label>
                        ))
                    }
                </div>
            </form>



            { currentCategory?.subCategories && <form className="">

                    SUBCATEGORIES

            </form>}
        </div>
    )
}

export default CategorySelector