'use client'

import {
  locales,
  type Locale,
} from '@/i18n/config'
import { useLocale } from '@/hooks/useLocale'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()

  function handleChange() {
    const nextLocale: Locale =
      locale === locales[0]
        ? locales[1]
        : locales[0]

    setLocale(nextLocale)
  }

  return (
    <button
      type="button"
      onClick={handleChange}
      className="rounded-lg border px-3 py-2 text-sm transition"
      aria-label="Change language"
    >
      {locale.toUpperCase()}
    </button>
  )
}
