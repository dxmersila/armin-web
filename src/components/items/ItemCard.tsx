'use client'

import Link from 'next/link'
import { BadgeDollarSign, CircleCheck } from 'lucide-react'

import type { Item } from '@/types/item'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'
import { formatNumber } from '@/lib/format/number'

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

  const formattedPrice = formatNumber(item.price, locale)

  return (
    <article className="group min-w-0">
      <Link href={`/items/${item.slug}`} className="block">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 ease-out group-hover:-translate-y-0.5 group-hover:border-primary/30 group-hover:shadow-[0_18px_45px_-28px_rgba(124,58,237,0.55)]">
          {primaryMedia ? (
            <div className="relative aspect-square overflow-hidden">
              <img
                src={primaryMedia.file.url}
                alt={item.title}
                className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <span
                className={[
                  'absolute start-3 top-3 inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[10px] font-semibold shadow-[0_6px_18px_-10px_rgba(0,0,0,0.5)] backdrop-blur-md',
                  isFree
                    ? 'border-success/30 bg-success/55 text-success-foreground'
                    : 'border-secondary/30 bg-secondary/55 text-secondary-foreground',
                ].join(' ')}
              >
                {isFree ? (
                  <>
                    <CircleCheck className="size-3" />
                    {t('item.free')}
                  </>
                ) : (
                  <>
                    <BadgeDollarSign className="size-3" />
                    {t('item.paid')}
                  </>
                )}
              </span>
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center bg-surface-muted text-xs text-muted">
              {t('home.noImage')}
            </div>
          )}

          <div className="px-4 pb-4 pt-4">
            <h3 className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
              {item.title}
            </h3>

            <div className="mt-4 flex min-h-5 items-center justify-between gap-3">
              {isFree ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-success">
                  <CircleCheck className="size-3.5" />
                  {t('item.free')}
                </span>
              ) : (
                <span className="text-xs font-medium text-muted">
                  {t('item.paid')}
                </span>
              )}

              <span
                className={[
                  'inline-flex shrink-0 items-baseline gap-1 whitespace-nowrap tabular-nums',
                  isFree ? 'invisible' : '',
                ].join(' ')}
                aria-hidden={isFree}
              >
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  {formattedPrice}
                </span>
                <span className="text-[10px] font-medium text-muted">
                  {t('item.toman')}
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
