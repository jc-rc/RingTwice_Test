import { useFormStore } from '../../stores/formStore'
import Button from './Button'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import Step3 from './Steps/Step3'
import Step4 from './Steps/Step4'
import { t } from 'i18next'

const Form = () => {

    // Pull step navigation and validation from the form store
    const {
        currentStep,
        prevStep,
        nextStep,
        canGoNext,
    } = useFormStore()

    const canContinue = canGoNext()

    return (
        <>
            <div className='flex flex-col gap-4 fadeInRight flex-1 h-full overflow-hidden p-4 glassy md:rounded-4xl'>

                <div>
                    <p className='font-bold text-2xl'>{`Step ${currentStep}`}</p>
                </div>

                
                <div className='flex-1 overflow-hidden'>
                    {/* Step Content */}
                    {currentStep === 1 && <Step1 />}
                    {currentStep === 2 && <Step2 />}
                    {currentStep === 3 && <Step3 />}
                    {currentStep === 4 && <Step4 />}
                </div>


                <div>

                    <div className='flex items-center gap-8'>
                        <Button label={t("form.back")} className=' w-full bg-green-600 text-neutral-200 shadow-lg' onClick={prevStep} />
                        
                        <Button label={t("form.continue")} className=' w-full bg-green-600 text-neutral-200 shadow-lg' onClick={nextStep} disabled={!canContinue} />
                    </div>
                </div>
            </div>


        </>
    )
}

export default Form