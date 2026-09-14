import Link from 'next/link'

import UserMenu from '@/components/layout/UserMenu'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          <div className="max-w-sm">
            <Link
              href="/"
              className="text-lg font-semibold tracking-tight text-foreground"
            >
              Armin
            </Link>

            <p className="mt-3 text-sm leading-6 text-muted">
              Digital products for creators, developers,
              and modern teams.
            </p>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Marketplace
            </h2>

            <nav className="mt-4 flex flex-col gap-3 text-sm">
              <Link
                href="/items"
                className="text-muted transition hover:text-foreground"
              >
                Items
              </Link>

              <Link
                href="/#categories"
                className="text-muted transition hover:text-foreground"
              >
                Categories
              </Link>
            </nav>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              Account
            </h2>

            <div className="mt-4">
              <UserMenu />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-surface px-5 py-5 sm:px-6 sm:py-6 md:mt-10 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-base font-semibold text-foreground">
              Discover something worth building.
            </p>

            <p className="mt-1 text-sm text-muted">
              Explore digital products from the marketplace.
            </p>
          </div>

          <Link
            href="/items"
            className="mt-4 inline-flex shrink-0 items-center justify-center rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85 md:mt-0"
          >
            Explore marketplace →
          </Link>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Armin. All rights reserved.
          </p>

          <p>
            Built for creators.
          </p>
        </div>
      </div>
    </footer>
  )
}
