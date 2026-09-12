import type { Item } from '@/types/item'

interface ItemCardProps {
  item: Item
}

export default function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="rounded border p-4">
      <h2 className="text-lg font-semibold">
        {item.title}
      </h2>

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
