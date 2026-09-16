'use client'
import { useTranslations } from '@/hooks/useTranslations'
import type { Item } from '@/types/item'

interface ItemMetaProps {
  item: Item
}

export default function ItemMeta({
  item,
}: ItemMetaProps) {
  const t = useTranslations()

  return (
    <section className="rounded-2xl border border-border bg-surface p-5">
      {item.categories.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-foreground">
            {t('item.category')}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.categories.map((category) => (
              <span
                key={category.id}
                className="rounded-full bg-secondary/10 px-3 py-1.5 text-sm font-medium text-secondary"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {item.tags.length > 0 && (
        <div className={item.categories.length > 0 ? 'mt-6' : ''}>
          <h2 className="text-sm font-semibold text-foreground">
            {t('item.tags')}
          </h2>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag.id}
                className="rounded-full border border-border px-3 py-1.5 text-sm text-muted transition hover:text-foreground"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
