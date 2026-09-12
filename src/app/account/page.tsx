'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/auth/AuthProvider'

export default function AccountPage() {
  const router = useRouter()
  const { status, user } = useAuth()

  useEffect(() => {
    if (status === 'guest') {
      router.replace('/login')
    }
  }, [router, status])

  if (status === 'loading' || status === 'guest') {
    return null
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">حساب کاربری</h1>
      <p className="mt-2">{user?.name}</p>
      <p>{user?.email}</p>
    </main>
  )
}
