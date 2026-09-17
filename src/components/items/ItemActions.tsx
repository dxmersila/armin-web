'use client'

import { ArrowRight, Check, LockOpen, ShoppingCart } from 'lucide-react'

import type { Item } from '@/types/item'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'
import { useCart } from '@/components/cart/CartProvider'

interface ItemActionsProps {
  item: Item
}

export default function ItemActions({
  item,
}: ItemActionsProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const { addItem, hasItem } = useCart()
  const isFree = item.access_type === 'free'
  const isInCart = hasItem(item.id)

  const formattedPrice = new Intl.NumberFormat(
    locale === 'fa' ? 'fa-IR' : 'en-US',
  ).format(item.price)

  return (
    <section className="border-t border-border pt-6">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-sm text-muted">
          {t('item.access')}
        </span>

        <span className="text-sm font-medium text-foreground">
          {isFree ? t('item.free') : t('item.paid')}
        </span>
      </div>

      {!isFree && (
        <div className="mb-4 text-right">
          <span className="text-xl font-semibold tabular-nums text-foreground">
            {formattedPrice}
          </span>

          <span className="ms-1 text-sm text-muted">
            {t('item.toman')}
          </span>
        </div>
      )}

      <button
        type="button"
        disabled={!isFree && isInCart}
        onClick={() => {
          if (!isFree && !isInCart) {
            addItem(item)
          }
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 disabled:cursor-default disabled:opacity-70"
      >
        {isFree ? (
          <>
            <LockOpen className="size-4" />
            {t('item.getAccess')}
          </>
        ) : isInCart ? (
          <>
            <Check className="size-4" />
            {t('item.inCart')}
          </>
        ) : (
          <>
            <ShoppingCart className="size-4" />
            {t('item.addToCart')}
          </>
        )}
      </button>
    </section>
  )
}
