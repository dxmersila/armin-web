'use client'

import Link from 'next/link'
import { LogOut } from 'lucide-react'

import { useAuth } from '@/components/auth/AuthProvider'
import { userMenuItems } from '@/components/layout/userMenuItems'
import { useTranslations } from '@/hooks/useTranslations'

export default function HeaderUserMenu() {
  const t = useTranslations()
  const { status, user, logout } = useAuth()

  if (status === 'loading') {
    return null
  }

  if (status !== 'authenticated') {
    const { subscription, login, register } = userMenuItems.guest

    return (
      <div className="flex items-center gap-1">
        <Link
          href={subscription.href}
          aria-label={t(subscription.label)}
          title={t(subscription.label)}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
        >
          <subscription.icon className="size-4" />
          <span>{t(subscription.label)}</span>
        </Link>

        <Link
          href={login.href}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
        >
          <login.icon className="size-4" />
          <span>{t(login.label)}</span>
        </Link>

        <Link
          href={register.href}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
        >
          <register.icon className="size-4" />
          <span>{t(register.label)}</span>
        </Link>
      </div>
    )
  }

  const { account, library, orders, subscription } = userMenuItems.authenticated

  return (
    <div className="flex items-center gap-1">
      <Link
        href={library.href}
        aria-label={t(library.label)}
        title={t(library.label)}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
      >
        <library.icon className="size-4" />
        <span>{t(library.label)}</span>
      </Link>

      <Link
        href={orders.href}
        aria-label={t(orders.label)}
        title={t(orders.label)}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
      >
        <orders.icon className="size-4" />
        <span>{t(orders.label)}</span>
      </Link>

      <Link
        href={subscription.href}
        aria-label={t(subscription.label)}
        title={t(subscription.label)}
        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-primary"
      >
        <subscription.icon className="size-4" />
        <span>{t(subscription.label)}</span>
      </Link>

      <Link
        href={account.href}
        aria-label={t(account.label)}
        title={user?.name || t(account.label)}
        className="group flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-surface-muted hover:text-primary"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-muted group-hover:text-primary">
          <account.icon className="size-4" />
        </span>

        <span className="max-w-36 truncate text-sm font-medium text-foreground group-hover:text-primary">
          {user?.name || t(account.label)}
        </span>
      </Link>

      <button
        type="button"
        onClick={logout}
        aria-label={t('common.logout')}
        title={t('common.logout')}
        className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-primary"
      >
        <LogOut className="size-4 ltr:rotate-180" />
      </button>
    </div>
  )
}
