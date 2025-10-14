
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
    <div className={`${theme} h-screen overflow-hidden bg-gradient-to-b from-pink-300/60 to-orange-400/60 d-200 dark:bg-neutral-950 transition-all duration-1000 flex flex-col dark:text-neutral-200 text-neutral-700`}>

      <nav id='navbar' className='flex gap-4 pe-3 items-center justify-center shadow-lg bg-neutral-200 dark:bg-neutral-900 transition-all duration-1000'>
        <div className='flex items-center gap-4 flex-1 max-w-xl'>

          <div className='flex-1 '>

            {
              theme === "dark" ? 
              <img src={theme === "dark" ? "https://file.notion.so/f/f/9e9c490f-7f6e-4f2e-9796-027b83925332/39325554-76df-4d6d-b357-38d5dbf7f592/RingTwice-logo-negative-rgb.svg?table=block&id=4899f51c-7cc1-4479-9f69-1c48322410af&spaceId=9e9c490f-7f6e-4f2e-9796-027b83925332&expirationTimestamp=1760306400000&signature=xmo5H4hsDNkQBTevZp2cb4PtmvduS4X5w-SdJj92Z1I&downloadName=RingTwice-logo-negative-rgb.svg" : ""} alt="" className='w-40 fadeIn'/>
              :
              <img src="https://file.notion.so/f/f/9e9c490f-7f6e-4f2e-9796-027b83925332/2e35dd39-4eaa-4629-9a41-fc3f63800eef/RingTwice-logo-main-rgb.svg?table=block&id=f556463a-61e2-4120-9615-12f238c6b6fe&spaceId=9e9c490f-7f6e-4f2e-9796-027b83925332&expirationTimestamp=1760306400000&signature=a85hilKeXEk1R16dXLhSn48bw868wordu62VnuQPOgY&downloadName=RingTwice-logo-main-rgb.svg" alt="" className='w-40 fadeIn' />
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
