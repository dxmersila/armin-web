import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import AppProviders from '@/providers/AppProviders'

export const metadata: Metadata = {
  title: 'Armin',
  description: 'Armin Web Application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <AppProviders>
          <Header />
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
