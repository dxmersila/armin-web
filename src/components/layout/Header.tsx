'use client'

import Link from 'next/link'
import { Languages, Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

import UserMenu from '@/components/layout/UserMenu'
import { useLocale } from '@/hooks/useLocale'
import { useTranslations } from '@/hooks/useTranslations'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  const { theme, setTheme } = useTheme()
  const { locale, setLocale } = useLocale()
  const t = useTranslations()

  useEffect(() => {
    setMounted(true)
  }, [])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  const toggleLocale = () => {
    setLocale(locale === 'fa' ? 'en' : 'fa')
  }

  const themeLabel =
    theme === 'dark'
      ? t('common.switchToLight')
      : t('common.switchToDark')

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <Link
            href="/"
            onClick={closeMenu}
            className="shrink-0 text-lg font-semibold tracking-tight text-foreground"
          >
            Armin
          </Link>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="/items"
              className="text-muted transition hover:text-foreground"
            >
              {t('common.items')}
            </Link>

            <Link
              href="/#categories"
              className="text-muted transition hover:text-foreground"
            >
              Categories
            </Link>

            <Link
              href="/items"
              aria-label="Search marketplace"
              className="flex size-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground"
            >
              <Search className="size-4" />
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-2 md:flex">

          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={mounted ? themeLabel : undefined}
            title={mounted ? themeLabel : undefined}
            className="flex size-9 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground disabled:opacity-50"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t('common.changeLanguage')}
            title={t('common.changeLanguage')}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-muted transition hover:bg-surface-muted hover:text-foreground"
          >
            <Languages className="size-4" />
            {locale === 'fa' ? 'EN' : 'FA'}
          </button>

          <UserMenu />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            disabled={!mounted}
            aria-label={mounted ? themeLabel : undefined}
            title={mounted ? themeLabel : undefined}
            className="flex size-10 items-center justify-center rounded-lg text-muted transition hover:bg-surface-muted hover:text-foreground disabled:opacity-50"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="size-4" />
            ) : (
              <Moon className="size-4" />
            )}
          </button>

          <button
            type="button"
            onClick={toggleLocale}
            aria-label={t('common.changeLanguage')}
            title={t('common.changeLanguage')}
            className="flex h-10 min-w-11 items-center justify-center rounded-lg px-2 text-xs font-semibold text-muted transition hover:bg-surface-muted hover:text-foreground"
          >
            {locale === 'fa' ? 'EN' : 'FA'}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={
              isMenuOpen
                ? t('common.closeMenu')
                : t('common.toggleMenu')
            }
            aria-expanded={isMenuOpen}
            className="flex size-10 items-center justify-center rounded-lg border border-border text-muted transition hover:bg-surface-muted hover:text-foreground"
          >
            {isMenuOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-border md:hidden">
          <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6">
            <nav className="flex flex-col gap-1">
              <Link
                href="/items"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition hover:bg-surface-muted"
              >
                {t('common.items')}
              </Link>

              <Link
                href="/#categories"
                onClick={closeMenu}
                className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition hover:bg-surface-muted"
              >
                Categories
              </Link>
            </nav>

            <div className="mt-4 border-t border-border pt-4">
              <UserMenu onNavigate={closeMenu} />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
