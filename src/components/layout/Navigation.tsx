import Link from 'next/link'
import { Search } from 'lucide-react'

import NavigationLinks from './NavigationLinks'

export default function Navigation() {
  return (
    <nav className="flex items-center gap-5 text-sm">
      <NavigationLinks />

      <Link
        href="/items"
        aria-label="Search marketplace"
        className="flex size-8 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground"
      >
        <Search className="size-4" />
      </Link>
    </nav>
  )
}
