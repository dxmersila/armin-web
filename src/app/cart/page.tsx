'use client'

import Link from 'next/link'
import { ArrowRight, ShoppingCart, Trash2 } from 'lucide-react'

import { useCart } from '@/components/cart/CartProvider'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'

export default function CartPage() {
  const t = useTranslations()
  const { locale } = useLocale()
  const {
    items,
    itemCount,
    total,
    isHydrated,
    removeItem,
    clearCart,
  } = useCart()

  const formattedTotal = new Intl.NumberFormat(
    locale === 'fa' ? 'fa-IR' : 'en-US',
  ).format(total)

  if (!isHydrated) {
    return null
  }

  if (items.length === 0) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <section className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface px-6 py-12 text-center shadow-[0_20px_70px_-45px_rgba(124,58,237,0.45)] sm:px-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_40%)]" />

          <div className="relative">
            <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
              <ShoppingCart className="size-7" />
            </div>

            <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {t('cart.emptyTitle')}
            </h1>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
              {t('cart.emptyDescription')}
            </p>

            <Link
              href="/items"
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:opacity-90"
            >
              {t('cart.browseItems')}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t('cart.title')}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          {itemCount} {t('cart.itemsCount')}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <section className="overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
            <h2 className="text-sm font-semibold text-foreground">
              {t('cart.products')}
            </h2>

            <button
              type="button"
              onClick={clearCart}
              className="cursor-pointer text-xs font-medium text-muted transition hover:text-foreground"
            >
              {t('cart.clear')}
            </button>
          </div>

          <div className="divide-y divide-border">
            {items.map((item) => {
              const formattedPrice = new Intl.NumberFormat(
                locale === 'fa' ? 'fa-IR' : 'en-US',
              ).format(item.price)

              return (
                <article
                  key={item.id}
                  className="flex gap-4 px-5 py-5 sm:px-6"
                >
                  <Link
                    href={`/items/${item.slug}`}
                    className="size-20 shrink-0 overflow-hidden rounded-xl border border-border bg-surface-muted"
                  >
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-muted">
                        <ShoppingCart className="size-5" />
                      </div>
                    )}
                  </Link>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <Link
                        href={`/items/${item.slug}`}
                        className="min-w-0"
                      >
                        <h3 className="truncate text-sm font-semibold text-foreground transition hover:text-primary">
                          {item.title}
                        </h3>
                      </Link>

                      <span className="shrink-0 text-sm font-semibold tabular-nums text-foreground">
                        {formattedPrice}
                        <span className="ms-1 text-xs font-normal text-muted">
                          {t('item.toman')}
                        </span>
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <span className="text-xs text-muted">
                        {t('cart.oneTime')}
                      </span>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`${t('cart.remove')} ${item.title}`}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-muted transition hover:bg-red-500/10 hover:text-red-500"
                      >
                        <Trash2 className="size-3.5" />
                        {t('cart.remove')}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <aside className="h-fit overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="px-5 py-5 sm:px-6">
            <h2 className="text-sm font-semibold text-foreground">
              {t('cart.summary')}
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="text-muted">{t('cart.subtotal')}</span>
                <span className="font-medium tabular-nums text-foreground">
                  {formattedTotal}
                  <span className="ms-1 text-xs font-normal text-muted">
                    {t('item.toman')}
                  </span>
                </span>
              </div>

              <div className="h-px bg-border" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-semibold text-foreground">
                  {t('cart.total')}
                </span>

                <span className="text-lg font-semibold tabular-nums text-foreground">
                  {formattedTotal}
                  <span className="ms-1 text-xs font-normal text-muted">
                    {t('item.toman')}
                  </span>
                </span>
              </div>
            </div>

            <button
              type="button"
              disabled
              className="mt-6 flex h-12 w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground opacity-50"
            >
              {t('cart.checkout')}
            </button>

            <p className="mt-3 text-center text-xs leading-5 text-muted">
              {t('cart.checkoutComingSoon')}
            </p>
          </div>
        </aside>
      </div>
    </main>
  )
}
