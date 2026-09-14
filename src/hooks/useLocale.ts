'use client'

import type { Locale } from '@/i18n/config'
import { useLocaleContext } from '@/i18n/LocaleProvider'

export function useLocale(): {
  locale: Locale
  setLocale: (locale: Locale) => void
} {
  return useLocaleContext()
}
