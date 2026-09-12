import Link from 'next/link'
import type { Item } from '@/types/item'

interface ItemCardProps {
  item: Item
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="rounded border p-4">
      <Link href={`/items/${item.slug}`}>
        <h2 className="text-lg font-semibold hover:underline">
          {item.title}
        </h2>
      </Link>

      {item.description && (
        <p className="mt-2 text-sm text-gray-600">
          {item.description}
        </p>
      )}

      <div className="mt-3 text-sm">
        Access: {item.access_type}
      </div>
    </article>
  )
}
