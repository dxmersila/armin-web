'use client'

import { BadgeDollarSign, CircleCheck } from 'lucide-react'

import type { Item } from '@/types/item'
import { useTranslations } from '@/hooks/useTranslations'

interface ItemHeaderProps {
  item: Item
}

export default function ItemHeader({
  item,
}: ItemHeaderProps) {
  const t = useTranslations()
  const isFree = item.access_type === 'free'

  return (
    <header className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {item.title}
      </h1>

      <span
        className={[
          'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
          isFree
            ? 'bg-success/10 text-success'
            : 'bg-secondary/10 text-secondary',
        ].join(' ')}
      >
        {isFree ? (
          <>
            <CircleCheck className="size-4" />
            {t('item.freeProduct')}
          </>
        ) : (
          <>
            <BadgeDollarSign className="size-4" />
            {t('item.paidProduct')}
          </>
        )}
      </span>
    </header>
  )
}
