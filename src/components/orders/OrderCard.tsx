'use client'

import { CalendarDays, CreditCard, Package, X } from 'lucide-react'

import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'
import type { Order } from '@/types/order'

interface OrderCardProps {
  order: Order
  isCancelling?: boolean
  onCancel?: (orderId: number) => void
}

export default function OrderCard({
  order,
  isCancelling = false,
  onCancel,
}: OrderCardProps) {
  const t = useTranslations()
  const { locale } = useLocale()

  const formattedTotal = new Intl.NumberFormat(
    locale === 'fa' ? 'fa-IR' : 'en-US',
  ).format(order.total_price)

  const formattedDate = new Intl.DateTimeFormat(
    locale === 'fa' ? 'fa-IR' : 'en-US',
    {
      dateStyle: 'medium',
    },
  ).format(new Date(order.created_at))

  const statusClassName = {
    pending:
      'border-amber-500/20 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    paid:
      'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    failed:
      'border-red-500/20 bg-red-500/10 text-red-500',
    cancelled:
      'border-border bg-surface-muted text-muted',
  }[order.status]

  const orderTitle =
    order.type === 'subscription'
      ? t('orders.subscriptionOrder')
      : t('orders.itemOrder')

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            {order.type === 'subscription' ? (
              <CreditCard className="size-4.5" />
            ) : (
              <Package className="size-4.5" />
            )}
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium text-muted">
              {orderTitle}
            </p>

            <h2 className="mt-1 text-sm font-semibold text-foreground">
              {t('orders.order')} #{order.id}
            </h2>
          </div>
        </div>

        <span
          className={`inline-flex w-fit shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusClassName}`}
        >
          {t(`orders.${order.status}`)}
        </span>
      </div>

      {order.items.length > 0 && (
        <div className="border-t border-border px-5 py-4 sm:px-6">
          <p className="mb-3 text-xs font-medium text-muted">
            {t('orders.products')}
          </p>

          <div className="space-y-2">
            {order.items.map((orderItem) => (
              <div
                key={orderItem.id}
                className="flex min-w-0 items-center justify-between gap-4"
              >
                <span className="min-w-0 truncate text-sm text-foreground">
                  {orderItem.item.title}
                </span>

                <span className="shrink-0 text-xs text-muted">
                  {new Intl.NumberFormat(
                    locale === 'fa' ? 'fa-IR' : 'en-US',
                  ).format(orderItem.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-border bg-surface-muted/30 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5" />
            {formattedDate}
          </span>

          {order.items.length > 0 && (
            <span>
              {order.items.length}{' '}
              {order.items.length === 1
                ? t('orders.product')
                : t('orders.productsCount')}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {order.status === 'pending' && onCancel && (
            <button
              type="button"
              onClick={() => onCancel(order.id)}
              disabled={isCancelling}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-500/20 px-3 py-2 text-xs font-medium text-red-500 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X className="size-3.5" />
              {isCancelling
                ? t('orders.cancelling')
                : t('orders.cancel')}
            </button>
          )}

          <div className="text-sm">
            <span className="text-muted">
              {t('orders.total')}:{' '}
            </span>

            <span className="font-semibold tabular-nums text-foreground">
              {formattedTotal}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
