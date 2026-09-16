'use client'

import Link from 'next/link'
import { Search, X } from 'lucide-react'

import { useTranslations } from '@/hooks/useTranslations'

interface ItemSearchProps {
  activeSearch?: string
}

export default function ItemSearch({
  activeSearch,
}: ItemSearchProps) {
  const t = useTranslations()

  return (
    <form
      action="/items"
      className="flex flex-col gap-2 sm:flex-row"
    >
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted" />

        <input
          name="search"
          defaultValue={activeSearch}
          placeholder={t('marketplace.searchPlaceholder')}
          className="h-12 w-full rounded-xl border border-border bg-background ps-11 pe-4 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:ring-4 focus:ring-primary/15"
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 sm:flex-none"
        >
          {t('marketplace.search')}
        </button>

        {activeSearch && (
          <Link
            href="/items"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-medium text-muted transition hover:border-foreground/20 hover:text-foreground"
          >
            <X className="size-4" />
            {t('marketplace.clear')}
          </Link>
        )}
      </div>
    </form>
  )
}
