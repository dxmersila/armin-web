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
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            Browse
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            Categories
          </h2>
        </div>

        <Link
          href="/items"
          className="text-sm font-medium text-muted transition hover:text-foreground"
        >
          View all →
        </Link>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/items?category=${category.slug}`}
            className="shrink-0 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-foreground/20 hover:bg-surface-muted hover:text-foreground"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </section>
  )
}
