'use client'

import { useEffect, useState } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  ClipboardList,
} from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/components/auth/AuthProvider'
import ConfirmModal from '@/components/ui/ConfirmModal'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import OrderCard from '@/components/orders/OrderCard'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'
import {
  cancelOrder,
  getOrder,
  listOrders,
} from '@/lib/api/orderService'
import {
  createPayment,
  initiatePayment,
} from '@/lib/api/paymentService'
import { getToken } from '@/lib/api/token'
import type { Order } from '@/types/order'

export default function OrdersPage() {
  const router = useRouter()
  const t = useTranslations()
  const { locale } = useLocale()
  const { status } = useAuth()

  const [orders, setOrders] = useState<Order[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(null)
  const [payingOrderId, setPayingOrderId] = useState<number | null>(null)
  const [cancelError, setCancelError] = useState(false)
  const [paymentError, setPaymentError] = useState(false)
  const [orderToCancel, setOrderToCancel] = useState<number | null>(null)

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

    setIsLoading(true)
    setHasError(false)

    listOrders(token, currentPage)
      .then((response) => {
        if (!isCurrent) {
          return
        }

        setOrders(response.data)
        setCurrentPage(response.meta.current_page)
        setLastPage(response.meta.last_page)
      })
      .catch(() => {
        if (isCurrent) {
          setHasError(true)
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [currentPage, router, status])

  function goToPage(page: number) {
    if (page < 1 || page > lastPage || page === currentPage) {
      return
    }

    setCurrentPage(page)
  }

  function handleCancel(orderId: number) {
    if (cancellingOrderId !== null || payingOrderId !== null) {
      return
    }

    setCancelError(false)
    setOrderToCancel(orderId)
  }

  async function confirmCancel() {
    if (orderToCancel === null) {
      return
    }

    const token = getToken()

    if (!token) {
      router.replace('/login')
      return
    }

    const orderId = orderToCancel

    setCancellingOrderId(orderId)
    setCancelError(false)

    try {
      await cancelOrder(orderId, token)

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order.id === orderId
            ? { ...order, status: 'cancelled' }
            : order,
        ),
      )

      setOrderToCancel(null)
    } catch {
      setCancelError(true)
    } finally {
      setCancellingOrderId(null)
    }
  }

  async function handleContinuePayment(orderId: number) {
    if (payingOrderId !== null || cancellingOrderId !== null) {
      return
    }

    const token = getToken()

    if (!token) {
      router.replace('/login')
      return
    }

    setPayingOrderId(orderId)
    setPaymentError(false)

    try {
      const orderResponse = await getOrder(orderId, token)

      const pendingPayment = orderResponse.data.payments?.find(
        (payment) => payment.status === 'pending',
      )

      let paymentId = pendingPayment?.id

      if (!paymentId) {
        const paymentResponse = await createPayment(orderId, token)
        paymentId = paymentResponse.data.id
      }

      const initiationResponse = await initiatePayment(
        paymentId,
        token,
      )

      if (!initiationResponse.data.redirect_url) {
        throw new Error('Missing payment redirect URL')
      }

      window.location.assign(initiationResponse.data.redirect_url)
    } catch {
      setPaymentError(true)
      setPayingOrderId(null)
    }
  }

  if (status === 'loading' || status === 'guest') {
    return null
  }

  return (
    <>
      <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <ClipboardList className="size-5" />
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t('orders.title')}
              </h1>

              <p className="mt-1 text-sm leading-6 text-muted">
                {t('orders.description')}
              </p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex min-h-40 items-center justify-center text-sm text-muted">
            <LoadingSpinner className="size-5" />
          </div>
        ) : hasError ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm leading-6 text-red-500">
            {t('orders.loadError')}
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-border bg-surface px-5 py-12 text-center sm:px-8">
            <ClipboardList className="mx-auto size-8 text-muted" />

            <p className="mt-4 text-sm text-muted">
              {t('orders.empty')}
            </p>
          </div>
        ) : (
          <>
            {(cancelError || paymentError) && (
              <div className="mb-4 space-y-2">
                {cancelError && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-500">
                    {t('orders.cancelError')}
                  </div>
                )}

                {paymentError && (
                  <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-500">
                    {t('orders.paymentFailed')}
                  </div>
                )}
              </div>
            )}

            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  isCancelling={cancellingOrderId === order.id}
                  isPaying={payingOrderId === order.id}
                  onCancel={handleCancel}
                  onContinuePayment={handleContinuePayment}
                />
              ))}
            </div>

            {lastPage > 1 && (
              <nav
                className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-surface px-4 py-3"
                aria-label={t('orders.title')}
              >
                <button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {locale === 'fa' ? (
                    <ChevronRight className="size-4" />
                  ) : (
                    <ChevronLeft className="size-4" />
                  )}

                  {t('orders.previous')}
                </button>

                <span className="text-xs font-medium tabular-nums text-muted">
                  {currentPage} / {lastPage}
                </span>

                <button
                  type="button"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === lastPage}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition hover:bg-surface-muted hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {t('orders.next')}

                  {locale === 'fa' ? (
                    <ChevronLeft className="size-4" />
                  ) : (
                    <ChevronRight className="size-4" />
                  )}
                </button>
              </nav>
            )}
          </>
        )}
      </main>

      <ConfirmModal
        open={orderToCancel !== null}
        title={t('orders.cancelConfirmTitle')}
        description={t('orders.cancelConfirm')}
        confirmLabel={t('orders.cancel')}
        isConfirming={cancellingOrderId !== null}
        onConfirm={confirmCancel}
        onCancel={() => {
          if (cancellingOrderId === null) {
            setOrderToCancel(null)
          }
        }}
      />
    </>
  )
}
