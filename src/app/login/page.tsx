'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, LogIn, Mail, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/components/auth/AuthProvider'
import { useTranslations } from '@/hooks/useTranslations'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import {
  getAuthSwitchUrl,
  getSafeReturnTo,
} from '@/lib/auth/redirect'

export default function LoginPage() {
  const router = useRouter()
  const { login, status } = useAuth()
  const t = useTranslations()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [registerUrl, setRegisterUrl] = useState('/register')

  useEffect(() => {
    const returnTo = getSafeReturnTo(
      new URLSearchParams(window.location.search).get('returnTo'),
    )

    setRegisterUrl(getAuthSwitchUrl('/register'))

    if (status === 'authenticated') {
      router.replace(returnTo)
    }
  }, [router, status])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login({ email, password })

      const returnTo = getSafeReturnTo(
        new URLSearchParams(window.location.search).get('returnTo'),
      )

      router.push(returnTo)
    } catch {
      setError(t('auth.loginFailed'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (status === 'loading' || status === 'authenticated') {
    return null
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 size-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_65%)]" />
      </div>

      <div className="relative w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="relative overflow-hidden rounded-[28px] border border-border bg-surface/95 shadow-[0_30px_90px_-45px_rgba(124,58,237,0.55)] backdrop-blur-sm"
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.16),transparent_70%)]" />

          <div className="relative px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col items-center text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-[0_12px_35px_-18px_rgba(124,58,237,0.75)]">
                <LogIn className="size-6 rtl:rotate-180" />
              </div>

              <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                {t('auth.login')}
              </h1>

              <p className="mt-2 max-w-xs text-sm leading-6 text-muted">
                {t('auth.loginDescription')}
              </p>
            </div>

            <div className="mt-8 space-y-5">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">
                  {t('auth.email')}
                </span>

                <div className="relative">
                  <Mail className="pointer-events-none absolute inset-y-0 start-3.5 my-auto size-4 text-muted" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-border bg-surface-muted px-3.5 ps-10 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
                  />
                </div>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-foreground">
                  {t('auth.password')}
                </span>

                <div className="relative">
                  <Lock className="pointer-events-none absolute inset-y-0 start-3.5 my-auto size-4 text-muted" />

                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="h-12 w-full rounded-xl border border-border bg-surface-muted px-3.5 ps-10 pe-11 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-primary focus:bg-surface focus:ring-4 focus:ring-primary/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={t('auth.togglePassword')}
                    className="absolute inset-y-0 end-2 flex size-8 my-auto cursor-pointer items-center justify-center rounded-lg text-muted transition hover:bg-surface hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </label>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-500/20 bg-red-500/10 px-3.5 py-3 text-sm leading-6 text-red-500"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_14px_30px_-16px_rgba(124,58,237,0.9)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-16px_rgba(124,58,237,0.95)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-50 disabled:shadow-none"
              >
                {isSubmitting ? (
                  <LoadingSpinner className="size-5" />
                ) : (
                  t('auth.login')
                )}
              </button>

              <p className="text-center text-sm text-muted">
                {t('auth.noAccount')}{' '}
                <Link
                  href={registerUrl}
                  className="font-medium text-primary transition hover:opacity-80"
                >
                  <UserPlus className="me-1 inline size-4 align-[-2px]" />
                  {t('auth.createAccount')}
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
