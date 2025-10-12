import { useOnboardingStore } from '../../stores/onboardingStore'

const Form = () => {

    const {resetOnboarding} = useOnboardingStore()


  return (
    <div className='felx flex-col gap-4 fadeIn'>
        <p>THE FORM</p>
        <button onClick={resetOnboarding}>RESET ONBOARDING</button>
    </div>
  )
}

export default Form