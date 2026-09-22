'use client'

import { useEffect, useState } from 'react'
import { Check, CreditCard } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/components/auth/AuthProvider'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'
import {
  getSubscriptionPlans,
  listSubscriptions,
} from '@/lib/api/subscriptionService'
import {
  createSubscriptionOrder,
} from '@/lib/api/orderService'
import {
  createPayment,
  initiatePayment,
} from '@/lib/api/paymentService'
import { getToken } from '@/lib/api/token'
import { getLoginUrl } from '@/lib/auth/redirect'
import type {
  Subscription,
  SubscriptionPlan,
} from '@/types/subscription'

export default function SubscriptionPlans() {
  const router = useRouter()
  const t = useTranslations()
  const { locale } = useLocale()
  const { status } = useAuth()

  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [subscribingPlanId, setSubscribingPlanId] = useState<number | null>(null)
  const [subscribeError, setSubscribeError] = useState(false)

  useEffect(() => {
    let isCurrent = true

    setIsLoading(true)
    setHasError(false)

    const loadPlans = async () => {
      try {
        const response = await getSubscriptionPlans()

        if (isCurrent) {
          setPlans(response.data)
        }

        if (status !== 'authenticated') {
          return
        }

        const token = getToken()

        if (!token) {
          return
        }

        const subscriptionsResponse = await listSubscriptions(token)

        const activeSubscription = subscriptionsResponse.data.find(
          (item) => item.is_active,
        )

        if (isCurrent) {
          setSubscription(activeSubscription ?? null)
        }
      } catch {
        if (isCurrent) {
          setHasError(true)
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    loadPlans()

    return () => {
      isCurrent = false
    }
  }, [status])

  async function handleSubscribe(planId: number) {
    if (subscribingPlanId !== null) {
      return
    }

    if (status !== 'authenticated') {
      router.replace(getLoginUrl())
      return
    }

    const token = getToken()

    if (!token) {
      router.replace(getLoginUrl())
      return
    }

    setSubscribingPlanId(planId)
    setSubscribeError(false)

    try {
      const orderResponse = await createSubscriptionOrder(
        planId,
        token,
      )

      const paymentResponse = await createPayment(
        orderResponse.data.id,
        token,
      )

      const initiationResponse = await initiatePayment(
        paymentResponse.data.id,
        token,
      )

      if (!initiationResponse.data.redirect_url) {
        throw new Error('Missing payment redirect URL')
      }

      window.location.assign(initiationResponse.data.redirect_url)
    } catch {
      setSubscribeError(true)
      setSubscribingPlanId(null)
    }
  }

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(
      locale === 'fa' ? 'fa-IR' : 'en-US',
    ).format(price)

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(
      locale === 'fa' ? 'fa-IR' : 'en-US',
      {
        dateStyle: 'medium',
      },
    ).format(new Date(date))

  const getPlanName = (plan: SubscriptionPlan) => {
    if (plan.duration_months === 1) {
      return t('subscription.monthly')
    }

    if (plan.duration_months === 3) {
      return t('subscription.quarterly')
    }

    if (plan.duration_months === 12) {
      return t('subscription.yearly')
    }

    return plan.name
  }

  if (isLoading) {
    return (
      <div className="flex min-h-40 items-center justify-center text-sm text-muted">
        <LoadingSpinner className="size-5" />
      </div>
    )
  }

  if (hasError) {
    return (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm leading-6 text-red-500">
        {t('subscription.loadError')}
      </div>
    )
  }

  if (subscription) {
    return (
      <section className="relative overflow-hidden rounded-3xl border border-primary/20 bg-surface p-6 shadow-[0_20px_70px_-45px_rgba(124,58,237,0.45)] sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(124,58,237,0.12),transparent_30%)]" />

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <Check className="size-5" />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {t('subscription.active')}
              </h2>

              <p className="mt-1 text-sm leading-6 text-muted">
                {t('subscription.activeDescription')}
              </p>
            </div>
          </div>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium text-muted">
                {t('subscription.startsAt')}
              </p>

              <p className="mt-1 text-sm font-medium text-foreground">
                {formatDate(subscription.starts_at)}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium text-muted">
                {t('subscription.endsAt')}
              </p>

              <p className="mt-1 text-sm font-medium text-foreground">
                {formatDate(subscription.ends_at)}
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (plans.length === 0) {
    return (
      <div className="rounded-3xl border border-border bg-surface px-5 py-12 text-center sm:px-8">
        <CreditCard className="mx-auto size-8 text-muted" />

        <p className="mt-4 text-sm text-muted">
          {t('subscription.noPlans')}
        </p>
      </div>
    )
  }

  return (
    <>
      {subscribeError && (
        <div className="mb-4 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-6 text-red-500">
          {t('subscription.subscribeError')}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.id}
            className="flex flex-col rounded-3xl border border-border bg-surface p-6"
          >
            <h2 className="text-lg font-semibold text-foreground">
              {getPlanName(plan)}
            </h2>

            <div className="mt-5">
              <span className="text-2xl font-semibold tabular-nums text-foreground">
                {formatPrice(plan.price)}
              </span>

              <span className="ms-1 text-sm text-muted">
                {t('item.toman')}
              </span>
            </div>

            <p className="mt-2 text-sm text-muted">
              {plan.duration_months} {plan.duration_months === 1
                ? t('subscription.month')
                : t('subscription.months')}
            </p>

            <button
              type="button"
              disabled={subscribingPlanId !== null}
              onClick={() => handleSubscribe(plan.id)}
              className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {subscribingPlanId === plan.id ? (
                <>
                  <LoadingSpinner className="size-4" />
                  {t('subscription.subscribing')}
                </>
              ) : (
                <>
                  <CreditCard className="size-4" />
                  {status === 'authenticated'
                    ? t('subscription.subscribe')
                    : t('subscription.subscribe')}
                </>
              )}
            </button>
          </article>
        ))}
      </div>
    </>
  )
}
