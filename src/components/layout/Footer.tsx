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
                {t('footer.explore')}
              </h2>

              <nav className="mt-4 flex flex-col gap-3 text-sm">
                <Link
                  href="/items"
                  className="text-muted transition hover:text-primary"
                >
                  {t('common.items')}
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

        <div className="mt-10 rounded-2xl border border-border bg-surface px-5 py-5 sm:px-6 sm:py-6 flex items-center justify-between gap-4">
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
            className="inline-flex shrink-0 flex-col items-center rounded-xl bg-primary px-4 py-3 text-primary-foreground transition-opacity hover:opacity-85 md:px-5 md:py-3.5"
          >
            <span className="flex items-center gap-1.5 text-lg font-semibold md:gap-2 md:text-xl">
              <span>{t('home.explore')}</span>
              <ArrowRight className="size-3.5 rtl:rotate-180 md:size-4" aria-hidden="true" />
            </span>

            <span className="mt-1 text-[11px] font-medium text-white bg-white/15 border border-white/10 px-2.5 py-0.5 rounded-full">
              {t('navigation.exploreHint')}
            </span>
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
