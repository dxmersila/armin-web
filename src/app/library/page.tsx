'use client'

import { useEffect, useState } from 'react'
import { Library } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/components/auth/AuthProvider'
import PurchasedItemCard from '@/components/account/PurchasedItemCard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useTranslations } from '@/hooks/useTranslations'
import { listLibrary } from '@/lib/api/libraryService'
import { getToken } from '@/lib/api/token'
import type { Item } from '@/types/item'

export default function LibraryPage() {
  const router = useRouter()
  const { status } = useAuth()
  const [items, setItems] = useState<Item[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const t = useTranslations()

  useEffect(() => {
    if (status === 'guest') {
      router.replace('/login')
      return
    }

    if (status !== 'authenticated') {
      return
    }

    const token = getToken()

    if (!token) {
      router.replace('/login')
      return
    }

    let isCurrent = true

    setIsLoading(true)
    setHasError(false)

    listLibrary(token)
      .then(({ data }) => {
        if (isCurrent) {
          setItems(data)
        }
      })
      .catch(() => {
        if (isCurrent) {
          setHasError(true)
        }
      })
      .finally(() => {
        if (isCurrent) {
          setIsLoading(false)
        }
      })

    return () => {
      isCurrent = false
    }
  }, [router, status])

  if (status === 'loading' || status === 'guest') {
    return null
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 sm:mb-10">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
            <Library className="size-5" />
          </div>

          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {t('library.title')}
            </h1>

            <p className="mt-1 text-sm leading-6 text-muted">
              {t('library.description')}
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex min-h-40 items-center justify-center text-sm text-muted">
          <LoadingSpinner className="size-5" />
        </div>
      ) : hasError ? (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-4 text-sm leading-6 text-red-500">
          {t('library.loadError')}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-border bg-surface px-5 py-12 text-center sm:px-8">
          <Library className="mx-auto size-8 text-muted" />

          <p className="mt-4 text-sm text-muted">
            {t('library.empty')}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <PurchasedItemCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      )}
    </main>
  )
}
