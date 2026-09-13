import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-border">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} Armin. All rights reserved.
        </p>

        <nav className="flex items-center gap-5">
          <Link
            href="/items"
            className="transition hover:text-foreground"
          >
            Marketplace
          </Link>
        </nav>
      </div>
    </footer>
  )
}
