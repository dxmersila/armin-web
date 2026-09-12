'use client'

import Link from 'next/link'
import { useTranslations } from '@/hooks/useTranslations'
import { useAuth } from '@/components/auth/AuthProvider'

export default function NavigationLinks() {
  const t = useTranslations()
  const { status, logout } = useAuth()

  const isAuthenticated = status === 'authenticated'

  return (
    <>
      <Link href="/items">
        {t('common.items')}
      </Link>

      {isAuthenticated ? (
        <>
          <Link href="/account">
            {t('common.account')}
          </Link>

          <button type="button" onClick={logout}>
            {t('common.logout')}
          </button>
        </>
      ) : (
        status !== 'loading' && (
          <Link href="/login">
            {t('common.login')}
          </Link>
        )
      )}
    </>
  )
}
