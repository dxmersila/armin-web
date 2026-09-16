'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import type { Category } from '@/types/category'
import { useTranslations } from '@/hooks/useTranslations'

interface CategorySectionProps {
  categories: Category[]
}

export default function CategorySection({
  categories,
}: CategorySectionProps) {
  const t = useTranslations()

  return (
    <section id="categories" className="mt-16">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            {t('home.browse')}
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            {t('home.categories')}
          </h2>
        </div>

        <Link
          href="/items"
          className="shrink-0 text-sm font-medium text-muted transition hover:text-foreground"
        >
          {t('home.viewAll')} →
        </Link>
      </div>

      <div className="mt-6 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/items?category=${category.slug}`}
            className="group flex h-14 w-44 shrink-0 items-center justify-between rounded-xl border border-border bg-surface px-4 transition hover:border-foreground/20 hover:bg-surface-muted"
          >
            <ArrowUpRight className="size-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:rotate-[-90deg] rtl:group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5" />

            <span className="text-base font-semibold text-foreground">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
