'use client'

import Link from 'next/link'
import { BadgeDollarSign, CircleCheck } from 'lucide-react'

import type { Item } from '@/types/item'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'

interface ItemCardProps {
  item: Item
}

export default function ItemCard({ item }: ItemCardProps) {
  const t = useTranslations()
  const { locale } = useLocale()

  const primaryMedia =
    item.media.find((media) => media.is_primary) ??
    item.media[0]

  const isFree = item.access_type === 'free'

  const formattedPrice = new Intl.NumberFormat(
    locale === 'fa' ? 'fa-IR' : 'en-US',
  ).format(item.price)

  return (
    <article className="group min-w-0">
      <Link href={`/items/${item.slug}`} className="block">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface-muted transition duration-300 group-hover:border-primary/30 group-hover:shadow-[0_8px_30px_-18px_rgba(124,58,237,0.45)]">
          {primaryMedia ? (
            <div className="aspect-square overflow-hidden">
              <img
                src={primaryMedia.file.url}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center text-xs text-muted">
              {t('home.noImage')}
            </div>
          )}
        </div>

        <div className="mt-3 px-0.5">
          <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-foreground transition">
            {item.title}
          </h3>

          <div className="mt-2.5 flex items-center justify-between gap-3">
            <span
              className={[
                'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                isFree
                  ? 'bg-success/10 text-success'
                  : 'bg-secondary/10 text-secondary',
              ].join(' ')}
            >
              {isFree ? (
                <>
                  <CircleCheck className="size-3.5" />
                  {t('item.free')}
                </>
              ) : (
                <>
                  <BadgeDollarSign className="size-3.5" />
                  {t('item.paid')}
                </>
              )}
            </span>

            {!isFree && (
              <span className="text-sm font-semibold tabular-nums text-foreground">
                {formattedPrice} {t('item.toman')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
