import Link from 'next/link'
import type { Category } from '@/types/category'

interface ItemFiltersProps {
  categories: Category[]
  activeCategory?: string
}

export default function ItemFilters({
  categories,
  activeCategory,
}: ItemFiltersProps) {
  return (
    <div className="mt-4 flex flex-wrap gap-2">
      <Link
        href="/items"
        className={!activeCategory ? 'font-bold' : ''}
      >
        All
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/items?category=${encodeURIComponent(category.slug)}`}
          className={
            activeCategory === category.slug
              ? 'font-bold'
              : ''
          }
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
