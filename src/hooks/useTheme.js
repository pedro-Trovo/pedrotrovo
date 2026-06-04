import { useState, useEffect } from 'react'

export function useTheme() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.classList.contains('light') ? 'light' : 'dark'
  )

  useEffect(() => {
    const el = document.documentElement
    const observer = new MutationObserver(() => {
      setTheme(el.classList.contains('light') ? 'light' : 'dark')
    })
    observer.observe(el, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return theme
}
