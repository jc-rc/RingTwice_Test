import { useOnboardingStore } from '../../stores/onboardingStore'

const Form = () => {

//const categories = [];
//const subCategories=[];
//const subActivities=[]

    const {resetOnboarding} = useOnboardingStore()


  return (
    <div className='flex flex-col gap-4 fadeIn  flex-1 h-full overflow-hidden px-3 pt-4 pb-8 '>
        <button onClick={resetOnboarding}>RESET ONBOARDING</button>

        <div className='flex items-center gap-4 flex-1 overflow-hidden border'>
            <div className='flex flex-col gap-8 h-full flex-1 overflow-y-auto'>
                <select name="" id="">
                    <option value="">Categories</option>
                </select>
                <select name="" id="">
                    <option value="">Sub-category</option>
                </select>
                <select name="" id="">
                    <option value="">Sub-Activity</option>
                </select>
                <input type="text" name="" id="" placeholder='Publication title' />
                <textarea className='min-h-fit' rows={5} name="" id="" placeholder='Description details'></textarea>
                <input type="file" name="" id="" accept='image/jpg, image/jpeg, image/png, image/heic' />
                <hr />
                <input type="text" name="" id="" placeholder='Address' />
                <select name="" id="">
                    <option value="">Type of place</option>
                </select>
                <label htmlFor="materials" className='flex items-center gap-2'>
                    <input type="checkbox" name="" id="materials" />
                    <p>Materials provided?</p>
                </label>
                <label htmlFor="tools" className='flex items-center gap-2'>
                    <input type="checkbox" name="" id="tools" />
                    <p>Tools provided?</p>
                </label>
                <input type="number" inputMode='numeric' name="" id="" placeholder='People required?' />
                <textarea className='min-h-fit' rows={5} name="" id="" placeholder='Extra details (how to enter, parking, etc.)'></textarea>

                <hr />

                <input type="text" name="" id="" placeholder='Full name' />
                <input type="tel" inputMode='tel' name="" id="" placeholder='Phone number' />
                <input type="email" inputMode='email' name="" id="" placeholder='Email' />



            </div>
            <div className='hidden flex-1 md:flex'>
                SUMMARY
            </div>
        </div>

        <div>
            BUTTON ZONE
        </div>
    </div>
  )
}

export default Form