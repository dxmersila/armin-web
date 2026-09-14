'use client'
import Link from 'next/link'
import type { Category } from '@/types/category'
import { useTranslations } from '@/hooks/useTranslations'

interface ItemFiltersProps {
  categories: Category[]
  activeCategory?: string
}

export default function ItemFilters({
  categories,
  activeCategory,
}: ItemFiltersProps) {
  const t = useTranslations()

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/items"
        className={[
          'rounded-full px-4 py-2 text-sm font-medium transition',
          !activeCategory
            ? 'bg-foreground text-background'
            : 'bg-surface-muted text-muted hover:text-foreground',
        ].join(' ')}
      >
        {t('filters.all')}
      </Link>

      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/items?category=${encodeURIComponent(category.slug)}`}
          className={[
            'rounded-full px-4 py-2 text-sm font-medium transition',
            activeCategory === category.slug
              ? 'bg-foreground text-background'
              : 'bg-surface-muted text-muted hover:text-foreground',
          ].join(' ')}
        >
          {category.name}
        </Link>
      ))}
    </div>
  )
}
