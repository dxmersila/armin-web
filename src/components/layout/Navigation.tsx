import Link from 'next/link'

export default function Navigation() {
  return (
    <nav className="flex gap-4">
      <Link href="/items">
        Items
      </Link>

      <Link href="/login">
        Login
      </Link>

      <Link href="/account">
        Account
      </Link>
    </nav>
  )
}
