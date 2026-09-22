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
      <>
        <Link
          href="/items"
          onClick={onNavigate}
          className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          <span>{t('navigation.items')}</span>
          <ArrowRight className="size-4 text-muted transition-colors group-hover:text-primary rtl:rotate-180" />
        </Link>

      </>
    )
  }

  return (
    <>
      <Link href="/items" onClick={onNavigate}>
        {t('navigation.items')}
      </Link>

      <Link
        href="/items"
        aria-label={t('navigation.search')}
        className="flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground"
      >
        <Search className="size-4" />
      </Link>
    </>
  )
}
