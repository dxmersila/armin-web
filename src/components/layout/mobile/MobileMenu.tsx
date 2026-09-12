'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { useTranslations } from '@/hooks/useTranslations'
import NavigationLinks from '@/components/layout/NavigationLinks'
import UserMenu from '@/components/layout/UserMenu'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  const closeMenu = () => setOpen(false)

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-9 items-center justify-center rounded-md text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
        aria-label={
          open
            ? t('common.closeMenu')
            : t('common.toggleMenu')
        }
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        {open ? (
          <X className="size-5" />
        ) : (
          <Menu className="size-5" />
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={t('common.closeMenu')}
            className="fixed inset-0 z-40 bg-black/40"
            onClick={closeMenu}
          />

          <div
            id="mobile-navigation"
            className="absolute inset-s-0 top-full z-50 mt-2 w-80 max-w-[calc(100vw-1.5rem)] border border-border bg-surface p-3 shadow-xl"
          >
            <nav className="flex flex-col">
              <div className="flex flex-col gap-1">
                <NavigationLinks onNavigate={closeMenu} />
              </div>

              <div className="my-3 border-t border-border" />

              <UserMenu onNavigate={closeMenu} />
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
