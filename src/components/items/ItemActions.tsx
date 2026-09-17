'use client'

import { useEffect, useState } from 'react'
import { Check, LockOpen, ShoppingCart } from 'lucide-react'

import type { Item } from '@/types/item'
import { useAuth } from '@/components/auth/AuthProvider'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'
import { useCart } from '@/components/cart/CartProvider'
import { getItemAccess } from '@/lib/api/itemAccessService'
import { getToken } from '@/lib/api/token'

interface ItemActionsProps {
  item: Item
}

export default function ItemActions({ item }: ItemActionsProps) {
  const t = useTranslations()
  const { locale } = useLocale()
  const { status } = useAuth()
  const { addItem, hasItem } = useCart()

  const isFree = item.access_type === 'free'
  const isInCart = hasItem(item.id)

  const [hasAccess, setHasAccess] = useState(false)
  const [isCheckingAccess, setIsCheckingAccess] = useState(false)

  useEffect(() => {
    if (status !== 'authenticated') {
      setHasAccess(false)
      setIsCheckingAccess(false)
      return
    }

    if (isFree) {
      setHasAccess(true)
      setIsCheckingAccess(false)
      return
    }

    const token = getToken()

    if (!token) {
      setHasAccess(false)
      setIsCheckingAccess(false)
      return
    }

    let isCurrent = true

    setIsCheckingAccess(true)

    getItemAccess(item.slug, token)
      .then(() => {
        if (isCurrent) {
          setHasAccess(true)
        }
      })
      .catch(() => {
        if (isCurrent) {
          setHasAccess(false)
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsCheckingAccess(false)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [isFree, item.slug, status])

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
        disabled={
          isCheckingAccess ||
          hasAccess ||
          (!isFree && isInCart)
        }
        onClick={() => {
          if (!hasAccess && !isFree && !isInCart) {
            addItem(item)
          }
        }}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 disabled:cursor-default disabled:opacity-70"
      >
        {hasAccess ? (
          <>
            <Check className="size-4" />
            {t('item.access')}
          </>
        ) : isFree ? (
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
