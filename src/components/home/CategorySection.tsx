import Link from 'next/link'

import type { Category } from '@/types/category'

interface CategorySectionProps {
  categories: Category[]
}

export default function CategorySection({
  categories,
}: CategorySectionProps) {
  return (
    <section className="mt-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-sm text-muted">
            Browse by category
          </p>

          <h2 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
            Categories
          </h2>
        </div>

        <Link
          href="/items"
          className="text-sm font-medium text-muted transition hover:text-foreground"
        >
          View all
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/items?category=${category.slug}`}
            className="rounded-xl border border-border bg-surface p-4 text-sm font-medium text-foreground transition hover:bg-surface-muted"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
