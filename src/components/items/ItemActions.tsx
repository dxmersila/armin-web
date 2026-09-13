import { ArrowRight, LockOpen } from 'lucide-react'

import type { Item } from '@/types/item'

interface ItemActionsProps {
  item: Item
}

export default function ItemActions({
  item,
}: ItemActionsProps) {
  const isFree = item.access_type === 'free'

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-muted">
          Access
        </span>

        <span className="text-sm font-medium text-foreground">
          {isFree ? 'Free' : 'Paid'}
        </span>
      </div>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        {isFree ? (
          <>
            <LockOpen className="size-4" />
            Get Access
          </>
        ) : (
          <>
            Buy Now
            <ArrowRight className="size-4" />
          </>
        )}
      </button>
    </section>
  )
}
