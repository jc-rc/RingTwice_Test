import { useOnboardingStore } from '../../stores/onboardingStore'
import { useTranslation } from 'react-i18next'

const Onboarding = () => {

    const { currentStep, prevStep, nextStep, completeOnboarding } = useOnboardingStore()
    const { t } = useTranslation()
    


    return (
        <div className=' relative flex-1 flex flex-col gap-6 px-3 py-4 overflow-hidden max-w-xl mx-auto'>

            <div className='flex gap-2 justify-end z-1 fadeIn' style={{animationDelay: "0.6s"}}>
               
                <button className='border px-2' onClick={completeOnboarding}>SKIP</button>
            </div>
            <div className='flex absolute inset-0 z-0 mask-b-from-0% fadeIn'>

                {currentStep === 1 && <img src="https://images.unsplash.com/photo-1611095785020-1ba3dd228ea7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287" alt="" className='aspect-[16/9] object-cover' />}
                {currentStep === 2 && <img src="https://images.unsplash.com/photo-1747930838628-75fa744f6b15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287" alt="" className='aspect-[16/9] object-cover' />}
                {currentStep === 3 && <img src="https://images.unsplash.com/photo-1714575600356-6635434699f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3094" alt="" className='aspect-[16/9] object-cover' />}
                
            </div>
            <div className='flex-col flex gap-6 z-1 flex-1 justify-end fadeIn' style={{animationDelay: "0.2s"}}>
                <p className='text-4xl font-bold'>{t(`onboarding.title_step${currentStep}`)}</p>
                <p className='text-xl'>{t(`onboarding.paragraph_step${currentStep}`)}</p>
            </div>
            <div className='flex  items-center justify-between z-1 gap-4 fadeIn' style={{animationDelay: "0.6s"}}>
                { currentStep > 1 &&

                <button className='border rounded-full px-4 py-2 w-full' onClick={prevStep}>prev step</button>
                }
                <button className='border rounded-full px-4 py-2 w-full' onClick={currentStep === 3 ? completeOnboarding : nextStep}>next-step</button>
            </div>


        </div>
    )
}

export default Onboarding