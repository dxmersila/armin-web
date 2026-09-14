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
        {t('navigation.items')}
      </Link>

      <Link href="/#categories" onClick={onNavigate}>
        {t('navigation.categories')}
      </Link>
    </>
  )
}
