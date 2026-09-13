import ItemCard from '@/components/items/ItemCard'
import type { Item } from '@/types/item'

interface ItemGridProps {
  items: Item[]
}

export default function ItemGrid({
  items,
}: ItemGridProps) {
  return (
    <section className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          item={item}
        />
      ))}
    </section>
  )
}
