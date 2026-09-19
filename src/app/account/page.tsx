'use client'

import { useEffect, useState } from 'react'
import { LogOut, ShoppingBag, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/components/auth/AuthProvider'
import PurchasedItemCard from '@/components/account/PurchasedItemCard'
import { useTranslations } from '@/hooks/useTranslations'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { listOrders } from '@/lib/api/orderService'
import { getToken } from '@/lib/api/token'
import type { OrderItem } from '@/types/order'

export default function AccountPage() {
  const router = useRouter()
  const { status, user, logout } = useAuth()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [purchasedItems, setPurchasedItems] = useState<OrderItem[]>([])
  const [isLoadingPurchases, setIsLoadingPurchases] = useState(true)
  const [purchasesError, setPurchasesError] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    if (status === 'guest') {
      router.replace('/login')
      return
    }

    if (status !== 'authenticated') {
      return
    }

    const token = getToken()

    if (!token) {
      router.replace('/login')
      return
    }

    let isCurrent = true

    setIsLoadingPurchases(true)
    setPurchasesError(false)

    listOrders(token)
      .then(({ data: orders }) => {
        if (!isCurrent) {
          return
        }

        const seenItemIds = new Set<number>()

        const items = orders
          .filter(
            (order) =>
              order.type === 'item' &&
              order.status === 'paid',
          )
          .flatMap((order) => order.items)
          .filter((orderItem) => {
            if (seenItemIds.has(orderItem.item_id)) {
              return false
            }

            seenItemIds.add(orderItem.item_id)
            return true
          })

        setPurchasedItems(items)
      })
      .catch(() => {
        if (isCurrent) {
          setPurchasesError(true)
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoadingPurchases(false)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [router, status])

  if (status === 'loading' || status === 'guest') {
    return null
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 sm:mb-10">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t('account.title')}
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted">
          {t('account.description')}
        </p>
      </div>

      <div className="space-y-6">
        <section className="relative overflow-hidden rounded-3xl border border-border bg-surface shadow-[0_20px_70px_-45px_rgba(124,58,237,0.45)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(124,58,237,0.12),transparent_30%)]" />

          <div className="relative px-5 py-6 sm:px-8 sm:py-8">
            <div className="mb-6 border-b border-border pb-4">
              <h2 className="text-sm font-semibold text-foreground">
                {t('account.profile')}
              </h2>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-surface-muted text-muted">
                <User className="size-6" />
              </div>

              <div className="min-w-0">
                <h2 className="truncate text-lg font-semibold tracking-tight text-foreground">
                  {user?.name}
                </h2>

                <p className="mt-1 truncate text-sm text-muted">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="my-7 h-px bg-border" />

            <div className="space-y-5">
              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="text-xs font-medium text-muted">
                  {t('account.name')}
                </span>

                <span className="truncate text-sm font-medium text-foreground">
                  {user?.name}
                </span>
              </div>

              <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <span className="text-xs font-medium text-muted">
                  {t('account.email')}
                </span>

                <span className="truncate text-sm font-medium text-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
          </div>

          <div className="relative border-t border-border bg-surface-muted/40 px-5 py-4 sm:px-8">
            <button
              type="button"
              disabled={isLoggingOut}
              onClick={async () => {
                setIsLoggingOut(true)
                await logout()
                router.replace('/')
              }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoggingOut ? (
                <LoadingSpinner />
              ) : (
                <LogOut className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5" />
              )}
              <span>{t('account.logout')}</span>
            </button>
          </div>
        </section>

        <section className="overflow-hidden rounded-3xl border border-border bg-surface">
          <div className="border-b border-border px-5 py-5 sm:px-8">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <ShoppingBag className="size-5" />
              </div>

              <div>
                <h2 className="text-sm font-semibold text-foreground">
                  {t('account.purchasedProducts')}
                </h2>

                <p className="mt-1 text-xs text-muted">
                  {t('account.purchasedDescription')}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            {isLoadingPurchases ? (
              <div className="flex min-h-32 items-center justify-center text-sm text-muted">
                <LoadingSpinner className="size-5" />
              </div>
            ) : purchasesError ? (
              <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm leading-6 text-red-500">
                {t('account.purchasesLoadError')}
              </div>
            ) : purchasedItems.length === 0 ? (
              <div className="rounded-2xl border border-border bg-surface-muted px-4 py-8 text-center">
                <p className="text-sm text-muted">
                  {t('account.noPurchases')}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {purchasedItems.map((orderItem) => (
                  <PurchasedItemCard
                    key={orderItem.item_id}
                    orderItem={orderItem}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}
