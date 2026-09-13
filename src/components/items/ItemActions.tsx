import type { Item } from '@/types/item'

interface ItemActionsProps {
  item: Item
}

export default function ItemActions({
  item,
}: ItemActionsProps) {
  const isFree = item.access_type === 'free'

  return (
    <div>
      <button
        type="button"
        className="w-full rounded-lg bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        {isFree ? 'Get Access' : 'Buy Now'}
      </button>
    </div>
  )
}
