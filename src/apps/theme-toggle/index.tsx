import { useThemeToggle } from './useThemeToggle'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeToggle()
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="text-xl sm:text-2xl rounded-full border p-2"
      title="Toggle Theme"
    >
      {theme === 'dark' ? '🌜' : '☀️'}
    </button>
  )
}
