
const CategorySelector = () => {
    return (
        <fieldset id="form-category" className="min-h-fit has-checked:flex snap-x grid-cols-5 gap-8 overflow-x-auto grid">


            <label htmlFor="option" className="cursor-pointer transition-all flex h-16 flex-row items-center justify-center gap-1 border rounded-full md:rounded-2xl px-4 md:size-32 md:flex-col has-checked:bg-green-300">
                                   <p className="text-3xl md:text-5xl">🪴</p>
                
                <div><p>Gardening</p></div>
                <input id="option" type="radio" name="category" className="absolute opacity-0" />
            </label>
          



        </fieldset>
    )
}

export default CategorySelector