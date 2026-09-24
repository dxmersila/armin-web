'use client'

import Link from 'next/link'
import { LogOut, User } from 'lucide-react'

import { useAuth } from '@/components/auth/AuthProvider'
import { userMenuItems } from '@/components/layout/userMenuItems'
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
    const { subscription, login, register } = userMenuItems.guest

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

            <div className="mt-2 flex flex-col items-start gap-1.5">
              <Link
                href={subscription.href}
                onClick={onNavigate}
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
              >
                <subscription.icon className="size-3.5" />
                {t(subscription.label)}
              </Link>

              <div className="flex items-center gap-1.5">
                <Link
                  href={login.href}
                  onClick={onNavigate}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
                >
                  <login.icon className="size-3.5" />
                  {t(login.label)}
                </Link>

                <Link
                  href={register.href}
                  onClick={onNavigate}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
                >
                  <register.icon className="size-3.5" />
                  {t(register.label)}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const { account, library, orders, subscription } = userMenuItems.authenticated

  return (
    <div className="min-w-0">
      <div className="flex items-start gap-2">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted">
          <account.icon className="size-4" />
        </span>

        <div className="min-w-0 pt-0.5">
          <p className="truncate text-sm font-medium text-foreground">
            {user?.name || t(account.label)}
          </p>

          <p className="mt-0.5 truncate text-xs text-muted">
            {user?.email}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-1 border-t border-border pt-3">
        <Link
          href={account.href}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
        >
          <account.icon className="size-4" />
          <span>{t(account.label)}</span>
        </Link>

        <Link
          href={library.href}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
        >
          <library.icon className="size-4" />
          <span>{t(library.label)}</span>
        </Link>

        <Link
          href={orders.href}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
        >
          <orders.icon className="size-4" />
          <span>{t(orders.label)}</span>
        </Link>

        <Link
          href={subscription.href}
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
        >
          <subscription.icon className="size-4" />
          <span>{t(subscription.label)}</span>
        </Link>

        <button
          type="button"
          onClick={() => {
            logout()
            onNavigate?.()
          }}
          aria-label={t('common.logout')}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-2 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <LogOut className="size-4 rtl:rotate-180" />
          <span>{t('common.logout')}</span>
        </button>
      </div>
    </div>
  )
}
