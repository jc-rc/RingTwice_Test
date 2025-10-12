import { useThemeStore } from '../../stores/themeStore'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <button
      onClick={toggleTheme}
      className={` cursor-pointer
        size-8 rounded-full shadow-lg transition-all duration-1000 flex items-center justify-center bg-orange-400 dark:bg-slate-500 text-neutral-200 dark:text-yellow-300 
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        // Sun icon for light mode
        <i className='fa-solid fa-sun'></i>
      ) : (
        // Moon icon for dark mode
        <i className='fa-solid fa-moon '></i>
      )}
    </button>
  )
}

export default ThemeToggle
