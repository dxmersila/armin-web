'use client'

import { useEffect, useState } from 'react'
import {
  defaultLocale,
  type Locale,
} from '@/i18n/config'

const STORAGE_KEY = 'armin_locale'

export function useLocale() {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null

    if (stored) {
      setLocaleState(stored)
      updateDocument(stored)
    } else {
      updateDocument(defaultLocale)
    }
  }, [])

  function setLocale(locale: Locale) {
    localStorage.setItem(STORAGE_KEY, locale)
    setLocaleState(locale)
    updateDocument(locale)
  }

  return {
    locale,
    setLocale,
  }
}

function updateDocument(locale: Locale) {
  document.documentElement.lang = locale
  document.documentElement.dir =
    locale === 'fa' ? 'rtl' : 'ltr'
}
