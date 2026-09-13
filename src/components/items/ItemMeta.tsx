import type { Item } from '@/types/item'

interface ItemMetaProps {
  item: Item
}

export default function ItemMeta({
  item,
}: ItemMetaProps) {
  return (
    <section className="space-y-5">
      {item.categories.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Categories
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-surface-muted px-3 py-1.5 text-sm text-muted"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {item.tags.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            Tags
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted"
              >
                {tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
