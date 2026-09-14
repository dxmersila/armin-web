'use client'

import { ArrowRight, LockOpen } from 'lucide-react'

import type { Item } from '@/types/item'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'

interface ItemActionsProps {
  item: Item
}

export default function ItemActions({
  item,
}: ItemActionsProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const isFree = item.access_type === 'free'

  const formattedPrice = new Intl.NumberFormat(
    locale === 'fa' ? 'fa-IR' : 'en-US',
  ).format(item.price)

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-muted">
          {t('item.access')}
        </span>

        <span className="text-sm font-medium text-foreground">
          {isFree ? t('item.free') : t('item.paid')}
        </span>
      </div>

      {!isFree && (
        <div className="mb-4 text-right">
          <span className="text-xl font-semibold tabular-nums text-foreground">
            {formattedPrice}
          </span>

          <span className="ms-1 text-sm text-muted">
            {t('item.toman')}
          </span>
        </div>
      )}

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        {isFree ? (
          <>
            <LockOpen className="size-4" />
            {t('item.getAccess')}
          </>
        ) : (
          <>
            {t('item.buyNow')}
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </section>
  )
}
