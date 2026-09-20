'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShoppingBag,
  XCircle,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/components/auth/AuthProvider'
import { useCart } from '@/components/cart/CartProvider'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { getOrder } from '@/lib/api/orderService'
import { getToken } from '@/lib/api/token'
import type { Order } from '@/types/order'
import { useTranslations } from '@/hooks/useTranslations'
import { getLoginUrl } from '@/lib/auth/redirect'

type ResultState = 'loading' | 'paid' | 'failed' | 'pending' | 'error'

export default function PaymentResultPage() {
  const router = useRouter()
  const t = useTranslations()
  const { status } = useAuth()
  const { clearCart } = useCart()

  const [resultState, setResultState] =
    useState<ResultState>('loading')
  const [orderId, setOrderId] = useState<number | null>(null)
  const [paymentId, setPaymentId] = useState<number | null>(null)

  useEffect(() => {
    if (status === 'guest') {
      router.replace(getLoginUrl())
      return
    }

    if (status !== 'authenticated') {
      return
    }

    const params = new URLSearchParams(window.location.search)
    const parsedOrderId = Number(params.get('order_id'))
    const parsedPaymentId = Number(params.get('payment_id'))

    if (
      !Number.isInteger(parsedOrderId) ||
      parsedOrderId <= 0 ||
      !Number.isInteger(parsedPaymentId) ||
      parsedPaymentId <= 0
    ) {
      setResultState('error')
      return
    }

    setOrderId(parsedOrderId)
    setPaymentId(parsedPaymentId)

    const token = getToken()

    if (!token) {
      router.replace(getLoginUrl())
      return
    }

    getOrder(parsedOrderId, token)
      .then(({ data }: { data: Order }) => {
        const payment = data.payments?.find(
          (item) => item.id === parsedPaymentId,
        )

        if (!payment) {
          setResultState('error')
          return
        }

        if (payment.status === 'paid') {
          clearCart()
          setResultState('paid')
          return
        }

        if (payment.status === 'failed') {
          setResultState('failed')
          return
        }

        setResultState('pending')
      })
      .catch(() => {
        setResultState('error')
      })
  }, [clearCart, router, status])

  if (
    status === 'loading' ||
    (status === 'guest' && resultState === 'loading')
  ) {
    return null
  }

  const content = {
    loading: {
      icon: <LoadingSpinner className="size-7" />,
      title: t('paymentResult.loading'),
      description: t('paymentResult.loadingDescription'),
    },
    paid: {
      icon: <CheckCircle2 className="size-7" />,
      title: t('paymentResult.successTitle'),
      description: t('paymentResult.successDescription'),
    },
    failed: {
      icon: <XCircle className="size-7" />,
      title: t('paymentResult.failedTitle'),
      description: t('paymentResult.failedDescription'),
    },
    pending: {
      icon: <Clock3 className="size-7" />,
      title: t('paymentResult.pendingTitle'),
      description: t('paymentResult.pendingDescription'),
    },
    error: {
      icon: <XCircle className="size-7" />,
      title: t('paymentResult.errorTitle'),
      description: t('paymentResult.errorDescription'),
    },
  }[resultState]

  const isSuccess = resultState === 'paid'

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface px-6 py-10 text-center shadow-[0_20px_70px_-45px_rgba(124,58,237,0.45)] sm:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_40%)]" />

        <div className="relative">
          <div
            className={[
              'mx-auto flex size-16 items-center justify-center rounded-2xl border',
              isSuccess
                ? 'border-success/25 bg-success/10 text-success'
                : resultState === 'loading'
                  ? 'border-primary/20 bg-primary/10 text-primary'
                  : 'border-red-500/20 bg-red-500/10 text-red-500',
            ].join(' ')}
          >
            {content.icon}
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {content.title}
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            {content.description}
          </p>

          {orderId && (
            <div className="mx-auto mt-6 flex w-full max-w-sm items-center justify-between rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm">
              <span className="text-muted">
                {t('paymentResult.orderNumber')}
              </span>

              <span className="font-semibold tabular-nums text-foreground">
                #{orderId}
              </span>
            </div>
          )}

          {paymentId && (
            <div className="mx-auto mt-2 flex w-full max-w-sm items-center justify-between rounded-xl border border-border bg-surface-muted px-4 py-3 text-sm">
              <span className="text-muted">
                {t('paymentResult.paymentNumber')}
              </span>

              <span className="font-semibold tabular-nums text-foreground">
                #{paymentId}
              </span>
            </div>
          )}

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/items"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:-translate-y-0.5 hover:opacity-90"
            >
              <ShoppingBag className="size-4" />
              {t('paymentResult.browseItems')}
            </Link>

            <Link
              href="/orders"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-border px-5 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground"
            >
              {t('paymentResult.orders')}
              <ArrowRight className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
