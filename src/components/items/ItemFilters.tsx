'use client'

import Link from 'next/link'
import { SlidersHorizontal } from 'lucide-react'
import { useRouter } from 'next/navigation'

import Dropdown from '@/components/ui/Dropdown'
import type { Category } from '@/types/category'
import { useTranslations } from '@/hooks/useTranslations'

interface ItemFiltersProps {
  categories: Category[]
  activeCategory?: string
}

const DESKTOP_VISIBLE_CATEGORY_COUNT = 4

export default function ItemFilters({
  categories,
  activeCategory,
}: ItemFiltersProps) {
  const router = useRouter()
  const t = useTranslations()

  const visibleCategories = categories.slice(
    0,
    DESKTOP_VISIBLE_CATEGORY_COUNT,
  )

  const moreCategories = categories.slice(
    DESKTOP_VISIBLE_CATEGORY_COUNT,
  )

  const categoryOptions = categories.map((category) => ({
    value: category.slug,
    label: category.name,
  }))

  const navigateToCategory = (value: string) => {
    router.push(
      value
        ? `/items?category=${encodeURIComponent(value)}`
        : '/items',
    )
  }

  return (
    <>
      <div className="lg:hidden">
        <Dropdown
          value={activeCategory ?? ''}
          placeholder={t('filters.category')}
          icon={<SlidersHorizontal className="size-4" />}
          options={[
            {
              value: '',
              label: t('filters.all'),
            },
            ...categoryOptions,
          ]}
          onChange={navigateToCategory}
          className="w-full sm:w-[13rem]"
        />
      </div>

      <div className="hidden items-center gap-2 lg:flex">
        <Link
          href="/items"
          className={[
            'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition',
            !activeCategory
              ? 'border-primary bg-primary text-primary-foreground'
              : 'border-border bg-surface text-muted hover:border-foreground/20 hover:text-foreground',
          ].join(' ')}
        >
          {t('filters.all')}
        </Link>

        {visibleCategories.map((category) => (
          <Link
            key={category.id}
            href={`/items?category=${encodeURIComponent(category.slug)}`}
            className={[
              'shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition',
              activeCategory === category.slug
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-surface text-muted hover:border-foreground/20 hover:text-foreground',
            ].join(' ')}
          >
            {category.name}
          </Link>
        ))}

        {moreCategories.length > 0 && (
          <Dropdown
            value={
              moreCategories.some(
                (category) => category.slug === activeCategory,
              )
                ? activeCategory ?? ''
                : ''
            }
            placeholder={t('filters.moreCategories')}
            options={[
              ...moreCategories.map((category) => ({
                value: category.slug,
                label: category.name,
              })),
            ]}
            onChange={navigateToCategory}
            className="w-40"
          />
        )}
      </div>
    </>
  )
}
