'use client'

import fa from '@/i18n/messages/fa.json'
import en from '@/i18n/messages/en.json'
import { useLocale } from './useLocale'

const messages = {
  fa,
  en,
}

export function useTranslations() {
  const { locale } = useLocale()

  function t(key: string): string {
    const keys = key.split('.')

    let value: unknown = messages[locale]

    for (const item of keys) {
      if (
        typeof value !== 'object' ||
        value === null ||
        !(item in value)
      ) {
        return key
      }

      value = value[item as keyof typeof value]
    }

    return typeof value === 'string'
      ? value
      : key
  }

  return t
}
