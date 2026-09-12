'use client'

import ThemeProvider from './ThemeProvider'
import I18nProvider from '@/i18n/I18nProvider'
import { AuthProvider } from '@/components/auth/AuthProvider'

export default function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
