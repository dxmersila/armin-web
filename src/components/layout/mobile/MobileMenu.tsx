'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

import { useTranslations } from '@/hooks/useTranslations'
import NavigationLinks from '@/components/layout/NavigationLinks'
import UserMenu from '@/components/layout/UserMenu'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const t = useTranslations()

  const closeMenu = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (!open) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target

      if (!(target instanceof Node)) {
        return
      }

      if (menuRef.current?.contains(target)) {
        return
      }

      if (buttonRef.current?.contains(target)) {
        return
      }

      closeMenu()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-muted hover:text-foreground"
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
          <div
            className="fixed inset-0 z-40 bg-black/40"
            aria-hidden="true"
          />

          <div
            ref={menuRef}
            id="mobile-navigation"
            className="fixed inset-s-0 top-14 z-50 w-80 max-w-[calc(100vw-1rem)] rounded-e-2xl border border-border bg-surface p-4 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)]"
          >
            <nav className="flex flex-col text-start">
              <div className="flex flex-col gap-1">
                <NavigationLinks onNavigate={closeMenu} mobile />
              </div>

              <div className="my-4 border-t border-border" />

              <UserMenu onNavigate={closeMenu} />
            </nav>
          </div>
        </>
      )}
    </>
  )
}
