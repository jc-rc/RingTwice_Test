
import { useTranslation } from 'react-i18next'
import { useThemeStore } from './stores/themeStore'
import ThemeToggle from './components/ThemeToggle/ThemeToggle'
import LanguageToggle from './components/LanguageToggle/LanguageToggle'

const App = () => {
  const { theme } = useThemeStore()
  const { t } = useTranslation()

  return (
    <div className={`${theme} h-dvh overflow-hidden bg- d-200 dark:bg-neutral-900 transition-all duration-1000 flex flex-col dark:text-neutral-200 text-neutral-700`}>

      <nav id='navbar' className='flex gap-4 p-4 items-center shadow-lg'>
        <div className='flex-1'>
          <p>LOGO</p>
        </div>
        <LanguageToggle />
        <ThemeToggle />

      </nav>
      <main id='content' className='flex-1 flex flex-col p-10'>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">
            {t("onboarding.welcome")}
          </h1>
          <p className="text-xl">
            {t("common.working")} 🎉
          </p>
        </div>
      </main>




    </div>
  )
}

export default App
