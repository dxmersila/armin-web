'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import ItemCard from '@/components/items/ItemCard'
import type { Item } from '@/types/item'
import { useTranslations } from '@/hooks/useTranslations'

interface LatestItemsSectionProps {
  items: Item[]
}

export default function LatestItemsSection({
  items,
}: LatestItemsSectionProps) {
  const t = useTranslations()

  return (
    <section className="mt-20">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
            {t('home.latestProducts')}
          </p>

          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t('home.freshFromMarketplace')}
          </h2>
        </div>

        <Link
          href="/items"
          className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition hover:text-foreground"
        >
          <span>{t('home.exploreAll')}</span>
          <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  )
}
