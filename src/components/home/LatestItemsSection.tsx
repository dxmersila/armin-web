import Link from 'next/link'

import ItemCard from '@/components/items/ItemCard'
import type { Item } from '@/types/item'

interface LatestItemsSectionProps {
  items: Item[]
}

export default function LatestItemsSection({
  items,
}: LatestItemsSectionProps) {
  return (
    <section className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            Recently added
          </p>

          <h2 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
            Latest items
          </h2>
        </div>

        <Link
          href="/items"
          className="text-sm font-medium text-muted transition hover:text-foreground"
        >
          Explore more
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  )
}
