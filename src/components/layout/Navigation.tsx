'use client'

import Link from 'next/link'
import { useTranslations } from '@/hooks/useTranslations'
import { useAuth } from '@/components/auth/AuthProvider'

export default function Navigation() {
  const t = useTranslations()
  const { status, logout } = useAuth()

  const isAuthenticated = status === 'authenticated'

  return (
    <nav className="flex gap-4">
      <Link href="/items">
        {t('items')}
      </Link>

      {isAuthenticated ? (
        <>
          <Link href="/account">
            {t('account')}
          </Link>

          <button onClick={logout}>
            {t('logout')}
          </button>
        </>
      ) : (
        status !== 'loading' && (
          <Link href="/login">
            {t('login')}
          </Link>
        )
      )}
    </nav>
  )
}
