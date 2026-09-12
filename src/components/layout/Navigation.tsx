'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'

export default function Navigation() {
  const { user, logout } = useAuth()

  return (
    <nav className="flex gap-4">
      <Link href="/items">
        Items
      </Link>

      {user ? (
        <>
          <Link href="/account">
            Account
          </Link>

          <button
            onClick={logout}
          >
            Logout
          </button>
        </>
      ) : (
        <Link href="/login">
          Login
        </Link>
      )}
    </nav>
  )
}
