import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-foreground"
        >
          Armin
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-muted md:flex">
          <Link
            href="/items"
            className="transition hover:text-foreground"
          >
            Marketplace
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-sm">
          <Link
            href="/login"
            className="text-muted transition hover:text-foreground"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  )
}
