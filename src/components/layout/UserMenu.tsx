'use client'

import Link from 'next/link'
import { LogIn, LogOut, User } from 'lucide-react'

import { useAuth } from '@/components/auth/AuthProvider'
import { useTranslations } from '@/hooks/useTranslations'

export default function UserMenu({
  onNavigate,
}: {
  onNavigate?: () => void
}) {
  const t = useTranslations()
  const { status, user, logout } = useAuth()

  if (status === 'loading') {
    return null
  }

  if (status !== 'authenticated') {
    return (
      <div className="min-w-0">
        <Link
          href="/login"
          onClick={onNavigate}
          aria-label={t('common.login')}
          className="flex items-start gap-2"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
            <User className="size-4" />
          </span>

          <div className="min-w-0 pt-0.5">
            <p className="truncate text-sm font-medium text-foreground transition hover:text-muted">
              {t('common.guest')}
            </p>

            <span className="mt-0.5 inline-flex items-center gap-1.5 text-xs font-medium text-muted transition hover:text-foreground">
              <LogIn className="size-3.5" />
              {t('common.login')}
            </span>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-w-0">
      <Link
        href="/account"
        onClick={onNavigate}
        className="flex items-start gap-2"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
          <User className="size-4" />
        </span>

        <div className="min-w-0 pt-0.5">
          <p className="truncate text-sm font-medium text-foreground transition hover:text-muted">
            {user?.name || t('common.account')}
          </p>

          <p className="mt-0.5 truncate text-xs text-muted">
            {user?.email}
          </p>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => {
          logout()
          onNavigate?.()
        }}
        aria-label={t('common.logout')}
        className="mt-1 flex cursor-pointer items-center gap-2 text-xs font-medium text-muted transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
          <LogOut className="size-4" />
        </span>

        <span>{t('common.logout')}</span>
      </button>
    </div>
  )
}
