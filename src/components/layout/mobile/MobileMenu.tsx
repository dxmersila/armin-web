'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { useTranslations } from '@/hooks/useTranslations'
import HeaderActions from '@/components/layout/HeaderActions'
import NavigationLinks from '@/components/layout/NavigationLinks'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-xl border border-border/80 bg-surface/80 text-foreground transition hover:bg-surface-muted focus:outline-none focus:ring-2 focus:ring-foreground/20"
        aria-label={
          open
            ? t('common.closeMenu')
            : t('common.toggleMenu')
        }
        aria-expanded={open}
        aria-controls="mobile-navigation"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={t('common.closeMenu')}
            className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-[2px]"
            onClick={() => setOpen(false)}
          />

          <div
            id="mobile-navigation"
            className="absolute end-0 top-full z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border/80 bg-surface/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            <nav className="flex flex-col gap-1 [&>a]:rounded-xl [&>a]:px-3 [&>a]:py-2.5 [&>a]:transition [&>a]:hover:bg-surface-muted [&>button]:rounded-xl [&>button]:px-3 [&>button]:py-2.5 [&>button]:text-start [&>button]:transition [&>button]:hover:bg-surface-muted">
              <NavigationLinks
                onNavigate={() => setOpen(false)}
              />

              <div className="my-2 border-t border-border/70 pt-3">
                <HeaderActions />
              </div>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
