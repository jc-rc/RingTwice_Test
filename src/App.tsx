
//import { useTranslation } from 'react-i18next'
import { useThemeStore } from './stores/themeStore'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import LanguageToggle from './components/LanguageToggle/LanguageToggle'
import Onboarding from './components/Onboarding/Onboarding'
import { useOnboardingStore } from './stores/onboardingStore'
import Form from './components/Form/Form'

const App = () => {
  const { theme } = useThemeStore()
  const {isOnboardingComplete} = useOnboardingStore()
//  const { t } = useTranslation()

  return (
    <div className={`${theme} h-dvh overflow-hidden bg-gradient-to-b from-orange-400 to-pink-300 d-200 dark:bg-neutral-950 transition-all duration-1000 flex flex-col dark:text-neutral-200 text-neutral-700`}>

      <nav id='navbar' className='flex gap-4 pe-3 items-center justify-center bg-neutral-200/30 dark:bg-neutral-900 transition-all duration-1000'>
        <div className='flex items-center gap-4 flex-1 md:px-8'>

          <div className='flex-1  md:py-2'>

            {
              theme === "dark" ? 
              <img src="/RingTwice-logo-negative-rgb.svg" alt="RingTwice Logo Negative" className='w-40 fadeIn'/>
              :
              <img src="/RingTwice-logo-main-rgb.svg" alt="RingTwice Logo" className='w-40 fadeIn' />
            }
           
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>

      </nav>
      <main id='content' className='flex-1 flex flex-col  overflow-hidden h-full md:p-8'>
        

       {!isOnboardingComplete && <Onboarding/>}
       {isOnboardingComplete && <Form/>}
          
        
      </main>




    </div>
  )
}

export default App
