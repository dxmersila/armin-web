'use client'

import { Globe } from 'lucide-react'

import {
  locales,
  type Locale,
} from '@/i18n/config'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale()
  const t = useTranslations()

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
      className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm text-muted transition hover:bg-surface-muted hover:text-primary"
      aria-label={t('common.changeLanguage')}
    >
      <Globe className="size-4" />
      {locale.toUpperCase()}
    </button>
  )
}
