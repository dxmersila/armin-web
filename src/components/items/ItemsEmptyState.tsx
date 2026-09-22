'use client'

import { useTranslations } from '@/hooks/useTranslations'

export default function ItemsEmptyState() {
  const t = useTranslations()

  return (
    <section className="mt-8 rounded-2xl border border-border bg-surface px-6 py-14 text-center sm:px-10">
      <h2 className="text-lg font-semibold text-foreground">
        {t('items.noItemsFound')}
      </h2>

      <p className="mt-2 text-sm text-muted">
        {t('items.tryChangingSearch')}
      </p>
    </section>
  )
}
