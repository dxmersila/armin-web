'use client'

import Link from 'next/link'
import { ArrowRight, CreditCard } from 'lucide-react'

import { useTranslations } from '@/hooks/useTranslations'

export default function SubscriptionPromoSection() {
  const t = useTranslations()

  return (
    <section className="mt-20">
      <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-surface p-6 sm:p-8 lg:p-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(124,58,237,0.14),transparent_35%)]" />

        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
              <CreditCard className="size-5" />
            </div>

            <div className="max-w-2xl">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {t('home.subscriptionPromoTitle')}
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted sm:text-base">
                {t('home.subscriptionPromoDescription')}
              </p>
            </div>
          </div>

          <Link
            href="/subscription"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85"
          >
            <span>{t('home.subscriptionPromoButton')}</span>
            <ArrowRight className="size-4 rtl:rotate-180" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
