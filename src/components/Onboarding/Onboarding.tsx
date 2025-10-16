import { useOnboardingStore } from '../../stores/onboardingStore'
import { useTranslation } from 'react-i18next'
import Button from '../Form/Button'

const Onboarding = () => {

    const { currentStep,  nextStep, completeOnboarding } = useOnboardingStore()
    const { t } = useTranslation()
    


    return (
        <div className=' relative flex-1 flex flex-col gap-8 p-8 overflow-hidden max-w-xl mx-auto glassy md:rounded-4xl fadeIn '>

            <div className='flex justify-end z-1'>
            { currentStep === 1 &&
                <Button label={t("onboarding.skip")} className='underline' onClick={completeOnboarding}/>
            }
            </div>

            
            <div className='flex absolute inset-0 z-0 mask-b-from-0% mask-b-to-80% opacity-80 '>

                {currentStep === 1 && <img src="https://images.unsplash.com/photo-1611095785020-1ba3dd228ea7?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287" alt="" className='aspect-[16/9] object-cover object-top h-full fadeIn' />}
                {currentStep === 2 && <img src="https://images.unsplash.com/photo-1747930838628-75fa744f6b15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1287" alt="" className='aspect-[16/9] object-cover object-top h-full fadeIn' />}
                {currentStep === 3 && <img src="https://images.unsplash.com/photo-1714575600356-6635434699f8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3094" alt="" className='aspect-[16/9] object-cover object-top h-full fadeIn' />}
                
            </div>
            <div className='flex-col flex gap-8 z-1 flex-1 justify-end fadeIn' style={{animationDelay: "0.2s"}}>
                <p className='text-4xl font-bold '>{t(`onboarding.title_step${currentStep}`)}</p>
                <p className='text-xl '>{t(`onboarding.paragraph_step${currentStep}`)}</p>
            </div>
            <div>
                <div className='rounded-full h-2 w-1/4 mx-auto bg-neutral-200/30'>
                    <div className={`rounded-full h-2 bg-orange-600/60 transition-all duration-500`} style={{width: `${currentStep * 33.3}%`}}></div>
                </div>
            </div>
            <div className='flex  items-center justify-between z-1 gap-4 fadeIn' style={{animationDelay: "0.6s"}}>
          
                <Button label={
            currentStep===3 ? t("onboarding.complete"): t("onboarding.next")} className=' w-full bg-emerald-600 text-neutral-200 shadow-lg' onClick={currentStep === 3 ? completeOnboarding : nextStep} />

            </div>


        </div>
    )
}

export default Onboarding