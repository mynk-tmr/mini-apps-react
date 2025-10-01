import { useCallback, useEffect, useState } from 'react'

export function useThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    return isDark ? 'dark' : 'light'
  })

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return {
    theme,
    toggleTheme,
  }
}
