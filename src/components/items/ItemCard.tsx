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
      <Link href={`/items/${item.slug}`} className="block">
        <div className="overflow-hidden rounded-2xl bg-surface-muted">
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
              No image
            </div>
          )}
        </div>

        <div className="mt-3 px-0.5">
          <h3 className="line-clamp-2 min-h-10 text-sm font-medium leading-5 text-foreground transition group-hover:text-muted">
            {item.title}
          </h3>

          <div className="mt-2.5 flex items-center justify-between gap-3">
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

            {!isFree && (
              <span className="text-sm font-semibold tabular-nums text-foreground">
                {item.price.toLocaleString('en-US')}
              </span>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
