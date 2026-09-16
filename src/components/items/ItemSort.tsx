'use client'

import Link from 'next/link'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useTranslations } from '@/hooks/useTranslations'

interface ItemSortProps {
  activeSort?: 'latest' | 'oldest'
}

const options = [
  { key: 'latest', value: 'latest', icon: ArrowDown },
  { key: 'oldest', value: 'oldest', icon: ArrowUp },
] as const

export default function ItemSort({
  activeSort,
}: ItemSortProps) {
  const t = useTranslations()

  return (
    <div className="flex w-full min-w-0 items-center rounded-xl border border-border bg-surface p-1 sm:w-fit">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`/items?sort=${option.value}`}
          className={[
            'min-w-0 flex-1 shrink rounded-lg px-3 py-1.5 text-sm font-medium text-center transition whitespace-nowrap',
            activeSort === option.value
              ? 'bg-primary text-primary-foreground'
              : 'text-muted hover:bg-surface-muted hover:text-foreground',
          ].join(' ')}
        >
          <div className="flex items-center justify-center gap-1">
            <option.icon className="size-3.5" />
            <span>{t(`filters.${option.key}`)}</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
