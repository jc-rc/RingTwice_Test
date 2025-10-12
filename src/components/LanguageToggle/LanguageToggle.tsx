import { useTranslation } from 'react-i18next'

const LanguageToggle = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const currentLanguage = i18n.language
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  return (
    <button
      onClick={toggleLanguage}
      className={` cursor-pointer
         h-8 px-4 rounded-full shadow-lg transition-all duration-1000 flex items-center gap-2 justify-center bg-pink-600 dark:bg-slate-500 text-neutral-200
      `}
      aria-label={`Switch to ${i18n.language === 'en' ? 'Spanish' : 'English'} language`}
    >
      <i className='fa-solid fa-globe'></i>
      <span>{i18n.language === 'en' ? 'EN' : 'ES'}</span>
      
    </button>
  )
}

export default LanguageToggle
