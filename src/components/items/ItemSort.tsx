'use client'

import Link from 'next/link'

import { useTranslations } from '@/hooks/useTranslations'

interface ItemSortProps {
  activeSort?: 'latest' | 'oldest' | 'title'
}

const options = [
  { key: 'latest', value: 'latest' },
  { key: 'oldest', value: 'oldest' },
  { key: 'title', value: 'title' },
] as const

export default function ItemSort({
  activeSort,
}: ItemSortProps) {
  const t = useTranslations()

  return (
    <div className="flex gap-2">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`/items?sort=${option.value}`}
          className={[
            'rounded-lg border px-3 py-2 text-sm font-medium transition',
            activeSort === option.value
              ? 'border-foreground bg-foreground text-background'
              : 'border-border bg-surface text-muted hover:text-foreground',
          ].join(' ')}
        >
          {t(`filters.${option.key}`)}
        </Link>
      ))}
    </div>
  )
}
