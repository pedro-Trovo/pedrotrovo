import { createContext, useContext, useState, useEffect } from 'react'
import pt from './pt.json'
import en from './en.json'
import es from './es.json'
import it from './it.json'

const translations = { pt, en, es, it }

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('lang') || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('lang', language)
  }, [language])

  const setLanguage = (lang) => {
    if (translations[lang]) setLanguageState(lang)
  }

  const t = (key) => {
    return translations[language]?.[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
