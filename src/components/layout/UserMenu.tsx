'use client'

import Link from 'next/link'
import { Library, LogIn, LogOut, ShoppingBag, User } from 'lucide-react'

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
        <div className="flex items-start gap-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
            <User className="size-4" />
          </span>

          <div className="min-w-0 pt-0.5">
            <p className="truncate text-sm font-medium text-foreground">
              {t('common.guest')}
            </p>

            <div className="mt-2 flex items-center gap-2">
              <Link
                href="/login"
                onClick={onNavigate}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
              >
                <LogIn className="size-3.5" />
                {t('common.login')}
              </Link>

              <Link
                href="/register"
                onClick={onNavigate}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
              >
                <User className="size-3.5" />
                {t('common.register')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-w-0">
      <div className="flex items-start gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
          <User className="size-4" />
        </span>

        <div className="min-w-0 pt-0.5">
          <p className="truncate text-sm font-medium text-foreground">
            {user?.name || t('common.account')}
          </p>

          <p className="mt-0.5 truncate text-xs text-muted">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1 border-t border-border pt-3">
        <Link
          href="/account"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
        >
          <User className="size-4" />
          <span>{t('common.account')}</span>
        </Link>

        <Link
          href="/library"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
        >
          <Library className="size-4" />
          <span>{t('common.library')}</span>
        </Link>

        <Link
          href="/orders"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
        >
          <ShoppingBag className="size-4" />
          <span>{t('common.orders')}</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            logout()
            onNavigate?.()
          }}
          aria-label={t('common.logout')}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <LogOut className="size-4 rtl:rotate-180" />
          <span>{t('common.logout')}</span>
        </button>
      </div>
    </div>
  )
}
