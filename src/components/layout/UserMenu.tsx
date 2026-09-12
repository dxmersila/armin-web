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

  const isAuthenticated = status === 'authenticated'

  if (!isAuthenticated) {
    return (
      <div className="flex w-full items-center justify-between gap-3 md:w-auto">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-surface-muted text-muted">
            <User className="size-4" />
          </div>

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-foreground">
              {t('common.guest')}
            </p>
          </div>
        </div>

        <Link
          href="/login"
          onClick={onNavigate}
          className="inline-flex shrink-0 items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:bg-surface-muted"
        >
          <LogIn className="size-4" />
          {t('common.login')}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-between gap-3 md:w-auto">
      <Link
        href="/account"
        onClick={onNavigate}
        className="flex min-w-0 items-center gap-2 rounded-md px-2 py-1.5 transition hover:bg-surface-muted"
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-surface-muted text-muted">
          <User className="size-4" />
        </div>

        <div className="min-w-0">
          <p className="max-w-44 truncate text-sm font-medium text-foreground">
            {user?.name || t('common.profile')}
          </p>

          <p className="max-w-44 truncate text-xs text-muted">
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
        className="inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted transition hover:bg-surface-muted hover:text-foreground"
        aria-label={t('common.logout')}
        title={t('common.logout')}
      >
        <LogOut className="size-4" />
      </button>
    </div>
  )
}
