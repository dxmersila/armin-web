'use client'

import ThemeProvider from './ThemeProvider'
import { AuthProvider } from '@/components/auth/AuthProvider'

export default function AppProviders({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ThemeProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ThemeProvider>
  )
}
