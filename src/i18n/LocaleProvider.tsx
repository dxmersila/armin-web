'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import {
  defaultLocale,
  type Locale,
} from '@/i18n/config'

const STORAGE_KEY = 'armin_locale'

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | undefined>(
  undefined,
)

export function LocaleProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null

    if (stored === 'fa' || stored === 'en') {
      setLocaleState(stored)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'fa' ? 'rtl' : 'ltr'
  }, [locale])

  const setLocale = (nextLocale: Locale) => {
    localStorage.setItem(STORAGE_KEY, nextLocale)
    setLocaleState(nextLocale)
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext)

  if (!context) {
    throw new Error(
      'useLocaleContext must be used within LocaleProvider',
    )
  }

  return context
}
