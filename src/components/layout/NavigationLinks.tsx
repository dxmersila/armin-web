'use client'

import Link from 'next/link'
import { useTranslations } from '@/hooks/useTranslations'
import { useAuth } from '@/components/auth/AuthProvider'

interface NavigationLinksProps {
  onNavigate?: () => void
}

export default function NavigationLinks({
  onNavigate,
}: NavigationLinksProps) {
  const t = useTranslations()
  const { status, logout } = useAuth()

  const isAuthenticated = status === 'authenticated'

  return (
    <>
      <Link href="/items" onClick={onNavigate}>
        {t('common.items')}
      </Link>

      {isAuthenticated ? (
        <>
          <Link href="/account" onClick={onNavigate}>
            {t('common.account')}
          </Link>

          <button type="button" onClick={() => { logout(); onNavigate?.() }}>
            {t('common.logout')}
          </button>
        </>
      ) : (
        status !== 'loading' && (
          <Link href="/login" onClick={onNavigate}>
            {t('common.login')}
          </Link>
        )
      )}
    </>
  )
}
