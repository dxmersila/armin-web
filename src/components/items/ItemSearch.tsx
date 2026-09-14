'use client'

import Link from 'next/link'

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
      className="flex flex-1 gap-2"
    >
      <input
        name="search"
        defaultValue={activeSearch}
        placeholder={t('marketplace.searchPlaceholder')}
        className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-foreground/30"
      />

      <button
        type="submit"
        className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        {t('marketplace.search')}
      </button>

      {activeSearch && (
        <Link
          href="/items"
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition hover:text-foreground"
        >
          {t('marketplace.clear')}
        </Link>
      )}
    </form>
  )
}
