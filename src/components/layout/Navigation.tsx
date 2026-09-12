'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth/AuthProvider'

export default function Navigation() {
  const { status, logout } = useAuth()

  const isAuthenticated = status === 'authenticated'

  return (
    <nav className="flex gap-4">
      <Link href="/items">
        Items
      </Link>

      {isAuthenticated ? (
        <>
          <Link href="/account">
            Account
          </Link>

          <button onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        status !== 'loading' && (
          <Link href="/login">
            Login
          </Link>
        )
      )}
    </nav>
  )
}
