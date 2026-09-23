'use client'

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'

import { useCart } from '@/components/cart/CartProvider'
import { useTranslations } from '@/hooks/useTranslations'

export default function CartButton() {
  const t = useTranslations()
  const { itemCount, isHydrated } = useCart()

  return (
    <Link
      href="/cart"
      aria-label={t('cart.title')}
      className="relative flex size-9 shrink-0 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-primary"
    >
      <ShoppingCart className="size-4.5" />

      {isHydrated && itemCount > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-4.5 h-4.5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold leading-none text-primary-foreground shadow-sm rtl:-left-0.5 rtl:right-auto">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </Link>
  )
}
