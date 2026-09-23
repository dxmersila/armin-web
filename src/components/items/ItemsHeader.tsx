'use client'

import { useTranslations } from '@/hooks/useTranslations'

export default function ItemsHeader() {
  const t = useTranslations()

  return (
    <header className="max-w-2xl">
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {t('items.exploreProducts')}
      </h1>

      <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
        {t('items.description')}
      </p>
    </header>
  )
}
