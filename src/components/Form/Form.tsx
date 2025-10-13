import { useOnboardingStore } from '../../stores/onboardingStore'

const Form = () => {

//const categories = [];
//const subCategories=[];
//const subActivities=[]

    const {resetOnboarding} = useOnboardingStore()


  return (
    <div className='flex flex-col gap-4 fadeIn border flex-1 overflow-hidden'>
        <button onClick={resetOnboarding}>RESET ONBOARDING</button>

        <div className='flex items-center gap-4'>
            <div className='flex flex-col gap-8 overflow-auto flex-1'>
                <select name="" id="">
                    <option value="">Categories</option>
                </select>
                <select name="" id="">
                    <option value="">Sub-category</option>
                </select>
                <select name="" id="">
                    <option value="">Sub-Activity</option>
                </select>

                <input type="file" name="" id="" accept='img/jpg, img/jpeg, img/png, img/heic' />
                <textarea name="" id="" placeholder='Extra details'></textarea>
                <hr />
                <input type="text" name="" id="" placeholder='Address' />
                <select name="" id="">
                    <option value="">Type of place</option>
                </select>
                <label htmlFor="">
                    <input type="checkbox" name="" id="" />
                    <p>Materials provided?</p>
                </label>
                <label htmlFor="">
                    <input type="checkbox" name="" id="" />
                    <p>Tools provided?</p>
                </label>
                <input type="number" name="" id="" placeholder='People required?' />
                <textarea name="" id="" placeholder='Extra details (how to enter, parking, etc.)'></textarea>

                <hr />

                <input type="text" name="" id="" placeholder='Full name' />
                <input type="tel" name="" id="" placeholder='Phone number' />
                <input type="email" name="" id="" placeholder='Email' />



            </div>
            <div>
                SUMMARY
            </div>
        </div>
    </div>
  )
}

export default Form