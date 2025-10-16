import { useTranslation } from 'react-i18next'

const LanguageToggle = () => {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    const languages = ['en', 'es', 'nl', 'fr']
    const currentIndex = languages.indexOf(i18n.language)
    const nextIndex = (currentIndex + 1) % languages.length
    const newLanguage = languages[nextIndex]
    i18n.changeLanguage(newLanguage)
  }

  const getLanguageDisplay = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      'en': 'EN',
      'es': 'ES', 
      'nl': 'NL',
      'fr': 'FR'
    }
    return languageMap[lang] || lang.toUpperCase()
  }

  return (
    <button
      onClick={toggleLanguage}
      className={` clickable
         h-10 px-4 rounded-full flex items-center gap-2 justify-center bg-pink-600 dark:bg-slate-500 text-neutral-200 text-xl
      `}
      aria-label={`Switch language (current: ${i18n.language})`}
    >
      <i className='fa-solid fa-globe'></i>
      <span className='text-base'>{getLanguageDisplay(i18n.language)}</span>
      
    </button>
  )
}

export default LanguageToggle
