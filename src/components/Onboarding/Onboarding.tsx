import { useOnboardingStore } from '../../stores/onboardingStore'
import { useTranslation } from 'react-i18next'

const Onboarding = () => {

    const { currentStep, prevStep, nextStep } = useOnboardingStore()
    const { t } = useTranslation()


    return (
        <div className='border flex-1 flex flex-col'>

            <div className='flex gap-2'>
                <div className='flex-1'>
                    <p className='text-lg font-bold'>{t(`onboarding.title_step${currentStep}`)}</p>
                </div>
                <div>SKIP</div>
            </div>
            <div className='flex-3'>Graphic</div>
            <div className='flex-1'>Paragraphs</div>
            <div className='flex items-center justify-between'>
            <button onClick={prevStep}>prev step</button>
            <button onClick={nextStep} disabled={currentStep >= 3}>next-step</button>
            </div>
            
            
        </div>
    )
}

export default Onboarding