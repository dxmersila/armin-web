'use client'

import Link from 'next/link'
import { Library, LogIn, LogOut, ShoppingBag, User } from 'lucide-react'

import { useAuth } from '@/components/auth/AuthProvider'
import { useTranslations } from '@/hooks/useTranslations'

export default function HeaderUserMenu() {
  const t = useTranslations()
  const { status, user, logout } = useAuth()

  if (status === 'loading') {
    return null
  }

  if (status !== 'authenticated') {
    return (
      <Link
        href="/login"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-foreground"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
          <User className="size-4" />
        </span>

        <span>{t('common.login')}</span>
      </Link>
    )
  }

  return (
    <div className="flex items-center gap-1">
      <Link
        href="/library"
        aria-label={t('common.library')}
        title={t('common.library')}
        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground"
      >
        <Library className="size-4" />
      </Link>

      <Link
        href="/orders"
        aria-label={t('common.orders')}
        title={t('common.orders')}
        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground"
      >
        <ShoppingBag className="size-4" />
      </Link>

      <Link
        href="/account"
        aria-label={t('common.account')}
        title={user?.name || t('common.account')}
        className="flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-surface-muted"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
          <User className="size-4" />
        </span>

        <span className="max-w-36 truncate text-sm font-medium text-foreground">
          {user?.name || t('common.account')}
        </span>
      </Link>

      <button
        type="button"
        onClick={logout}
        aria-label={t('common.logout')}
        title={t('common.logout')}
        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground"
      >
        <LogOut className="size-4 ltr:rotate-180" />
      </button>
    </div>
  )
}
