'use client'

import Link from 'next/link'
import { ArrowRight, LockOpen } from 'lucide-react'

import type { Item } from '@/types/item'
import { useTranslations } from '@/hooks/useTranslations'

interface PurchasedItemCardProps {
  item: Item
}

export default function PurchasedItemCard({
  item,
}: PurchasedItemCardProps) {
  const t = useTranslations()

  const primaryMedia =
    item.media.find((media) => media.is_primary) ??
    item.media[0]

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface transition hover:border-primary/30 hover:shadow-[0_16px_40px_-28px_rgba(124,58,237,0.5)]">
      <div className="flex gap-4 p-4 sm:p-5">
        <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-muted sm:size-24">
          {primaryMedia ? (
            <img
              src={primaryMedia.file.url}
              alt={item.title}
              className="size-full object-cover"
            />
          ) : (
            <div className="flex size-full items-center justify-center text-muted">
              <LockOpen className="size-5" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-foreground sm:text-base">
            {item.title}
          </h3>

          <p className="mt-1 text-xs text-muted">
            {t('library.accessible')}
          </p>

          <Link
            href={`/items/${encodeURIComponent(item.slug)}/content`}
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition hover:opacity-80"
          >
            <LockOpen className="size-3.5" />
            {t('library.accessProduct')}
            <ArrowRight className="size-3.5 rtl:rotate-180" />
          </Link>
        </div>
      </div>
    </article>
  )
}
