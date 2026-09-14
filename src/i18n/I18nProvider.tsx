'use client'

import { NextIntlClientProvider } from 'next-intl'

import { useLocale } from '@/hooks/useLocale'
import fa from './messages/fa.json'
import en from './messages/en.json'

const messages = {
  fa,
  en,
}

export default function I18nProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { locale } = useLocale()

  return (
    <NextIntlClientProvider
      locale={locale}
      messages={messages[locale]}
    >
      {children}
    </NextIntlClientProvider>
  )
}
