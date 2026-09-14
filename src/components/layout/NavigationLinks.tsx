'use client'

import Link from 'next/link'

import { useTranslations } from '@/hooks/useTranslations'

interface NavigationLinksProps {
  onNavigate?: () => void
}

export default function NavigationLinks({
  onNavigate,
}: NavigationLinksProps) {
  const t = useTranslations()

  return (
    <>
      <Link href="/items" onClick={onNavigate}>
        {t('common.items')}
      </Link>

      <Link href="/#categories" onClick={onNavigate}>
        Categories
      </Link>
    </>
  )
}
