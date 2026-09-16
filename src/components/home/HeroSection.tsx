'use client'

import Link from 'next/link'

import type { Item } from '@/types/item'
import { useTranslations } from '@/hooks/useTranslations'

interface HeroSectionProps {
  items: Item[]
}

export default function HeroSection({
  items,
}: HeroSectionProps) {
  const t = useTranslations()
  const showcaseItems = items.slice(0, 3)

  return (
    <section className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_20px_70px_-45px_rgba(124,58,237,0.55)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(124,58,237,0.16),transparent_34%),radial-gradient(circle_at_20%_90%,rgba(168,85,247,0.07),transparent_28%)]" />

      <div className="relative grid gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-14 lg:py-20">
        <div className="max-w-xl">
          <span className="inline-flex items-center rounded-full border border-secondary/20 bg-secondary/10 px-3.5 py-1.5 text-xs font-medium text-secondary">
            {t('home.badge')}
          </span>

          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            {t('home.title')}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
            {t('home.description')}
          </p>

          <div className="mt-8">
            <Link
              href="/items"
              className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
            >
              {t('home.exploreMarketplace')}
            </Link>
          </div>
        </div>

        {showcaseItems.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            {showcaseItems.map((item, index) => {
              const primaryMedia =
                item.media.find((media) => media.is_primary) ??
                item.media[0]

              const isLarge = index === 0

              return (
                <Link
                  key={item.id}
                  href={`/items/${item.slug}`}
                  className={[
                    'group relative overflow-hidden rounded-2xl border border-border bg-surface-muted',
                    isLarge
                      ? 'col-span-2 aspect-[16/9]'
                      : 'aspect-[4/3]',
                  ].join(' ')}
                >
                  {primaryMedia ? (
                    <img
                      src={primaryMedia.file.url}
                      alt={item.title}
                      className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted">
                      {t('home.noImage')}
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4">
                    <p className="line-clamp-1 text-sm font-medium text-white">
                      {item.title}
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
