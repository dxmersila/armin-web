'use client'

import SubscriptionPlans from '@/components/subscription/SubscriptionPlans'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'
import { useTranslations } from '@/hooks/useTranslations'

export default function SubscriptionPage() {
  const t = useTranslations()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          {
            label: t('subscription.title'),
        },
      ]}
      />

      <header className="mb-10 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {t('subscription.title')}
        </h1>

        <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
          {t('subscription.description')}
        </p>
      </header>

      <section>
        <h2 className="mb-5 text-lg font-semibold text-foreground">
          {t('subscription.plans')}
        </h2>

        <SubscriptionPlans />
      </section>
    </main>
  )
}
