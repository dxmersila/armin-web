'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

import UserMenu from '@/components/layout/UserMenu'
import { useTranslations } from '@/hooks/useTranslations'

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="mt-12 border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-8">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              {t('common.appName')}
            </Link>

            <p className="mt-3 text-sm leading-6 text-muted">
              {t('footer.description')}
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:contents">
            <div className="md:order-2 lg:order-none">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-foreground/40"
                />
                {t('footer.marketplace')}
              </h2>

              <nav className="mt-4 flex flex-col gap-3 text-sm">
                <Link
                  href="/items"
                  className="text-muted transition hover:text-foreground"
                >
                  {t('common.items')}
                </Link>

                <Link
                  href="/#categories"
                  className="text-muted transition hover:text-foreground"
                >
                  {t('home.categories')}
                </Link>
              </nav>
            </div>

            <div className="md:order-1 lg:order-none">
              <h2 className="inline-flex items-center gap-2 text-sm font-semibold text-foreground">
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-foreground/40"
                />
                {t('footer.account')}
              </h2>

              <div className="mt-4">
                <UserMenu />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface px-5 py-5 sm:px-6 sm:py-6 md:mt-10 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-base font-semibold text-foreground">
              {t('footer.ctaTitle')}
            </p>

            <p className="mt-1 text-sm text-muted">
              {t('footer.ctaDescription')}
            </p>
          </div>

          <Link
            href="/items"
            className="mt-4 inline-flex shrink-0 items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-85 md:mt-0"
          >
            {t('footer.ctaButton')}
            <ArrowRight className="ms-2 size-4 rtl:rotate-180" />
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {t('common.appName')}.{' '}
            {t('footer.allRightsReserved')}
          </p>

          <p>
            {t('footer.builtForCreators')}
          </p>
        </div>
      </div>
    </footer>
  )
}
