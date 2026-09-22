'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { useTranslations } from '@/hooks/useTranslations'

export default function NotFound() {
  const t = useTranslations()

  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6 py-20">
      <section className="w-full max-w-xl text-center">
        <div
          className="text-8xl font-bold tracking-tighter text-foreground sm:text-9xl"
          aria-hidden="true"
        >
          404
        </div>

        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {t('notFound.title')}
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted sm:text-base">
          {t('notFound.description')}
        </p>

        <Link
          href="/items"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          {t('notFound.button')}
          <ArrowLeft className="size-4 rtl:rotate-180" />
        </Link>
      </section>
    </main>
  )
}
