'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from '@/hooks/useTranslations'

import NavigationLinks from '@/components/layout/NavigationLinks'
import HeaderActions from '@/components/layout/HeaderActions'

export default function MobileMenu() {
  const [open, setOpen] = useState(false)
  const t = useTranslations()

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-lg border p-2"
        aria-label={open ? t('common.closeMenu') : t('common.toggleMenu')}
      >
        {open ? (
          <X size={20} />
        ) : (
          <Menu size={20} />
        )}
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-full border-b bg-background p-4">
          <nav className="flex flex-col gap-4">
            <NavigationLinks onNavigate={() => setOpen(false)} />
            <HeaderActions />
          </nav>
        </div>
      )}
    </div>
  )
}
