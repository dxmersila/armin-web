'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

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

        <Link
          href="/#categories"
          onClick={onNavigate}
          className="group flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted"
        >
          <span>{t('navigation.categories')}</span>
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

      <Link href="/#categories" onClick={onNavigate}>
        {t('navigation.categories')}
      </Link>
    </>
  )
}
