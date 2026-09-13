import Link from 'next/link'
import { BadgeDollarSign, CircleCheck } from 'lucide-react'

import type { Item } from '@/types/item'

interface ItemCardProps {
  item: Item
}

export default function ItemCard({ item }: ItemCardProps) {
  const primaryMedia =
    item.media.find((media) => media.is_primary) ??
    item.media[0]

  const isFree = item.access_type === 'free'

  return (
    <article className="group min-w-0">
      <Link
        href={`/items/${item.slug}`}
        className="block rounded-xl p-2 transition hover:bg-surface-muted/50"
      >
        <div className="aspect-square overflow-hidden rounded-xl bg-surface-muted">
          {primaryMedia ? (
            <img
              src={primaryMedia.file.url}
              alt={item.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-xs text-muted">
              No image
            </div>
          )}
        </div>

        <div className="mt-3 space-y-2 px-1">
          <h3 className="truncate text-sm font-medium text-foreground">
            {item.title}
          </h3>

          <span
            className={[
              'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
              isFree
                ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
            ].join(' ')}
          >
            {isFree ? (
              <>
                <CircleCheck className="size-3.5" />
                Free
              </>
            ) : (
              <>
                <BadgeDollarSign className="size-3.5" />
                Paid
              </>
            )}
          </span>
        </div>
      </Link>
    </article>
  )
}
