'use client'

import Link from 'next/link'
import { ArrowRight, Search } from 'lucide-react'

import { useTranslations } from '@/hooks/useTranslations'

interface NavigationLinksProps {
  onNavigate?: () => void
  mobile?: boolean
}

export default function NavigationLinks({
  onNavigate,
  mobile = false,
}: NavigationLinksProps) {
  const t = useTranslations()

  if (mobile) {
    return (
      <Link
        href="/items"
        onClick={onNavigate}
        className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
      >
        <span className="min-w-0">
          <span className="block group-hover:text-primary">{t('navigation.explore')}</span>
          <span className="mt-0.5 block text-xs font-normal text-muted">
            {t('navigation.exploreHint')}
          </span>
        </span>

        <ArrowRight className="size-4 shrink-0 text-muted transition-colors group-hover:text-primary rtl:rotate-180" />
      </Link>
    )
  }

  return (
    <>
      <Link
        href="/items"
        onClick={onNavigate}
        className="rounded-lg px-2.5 py-2 text-sm text-muted transition-colors hover:bg-surface-muted hover:text-primary"
      >
        {t('navigation.explore')}
      </Link>

      <Link
        href="/items"
        aria-label={t('navigation.search')}
        className="flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-primary"
      >
        <Search className="size-4" />
      </Link>
    </>
  )
}
