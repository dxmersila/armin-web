'use client'

import Link from 'next/link'
import { useTranslations } from '@/hooks/useTranslations'

export default function Logo() {
  const t = useTranslations()

  return (
    <Link
      href="/"
      className="text-xl font-bold text-primary"
    >
      {t('common.appName')}
    </Link>
  )
}
