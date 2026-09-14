'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

import { useTranslations } from '@/hooks/useTranslations'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({
  items,
}: BreadcrumbsProps) {
  const t = useTranslations()

  return (
    <nav
      aria-label={t('marketplace.breadcrumb')}
      className="mb-8"
    >
      <ol className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 text-sm text-muted">
        {items.map((item, index) => (
          <li
            key={`${
  item.label.startsWith('common.')
    ? t(item.label)
    : item.label
}-${index}`}
            className="flex items-center gap-2"
          >
            {item.href ? (
              <Link
                href={item.href}
                className="transition hover:text-foreground"
              >
                {item.label.startsWith('common.')
                  ? t(item.label)
                  : item.label}
              </Link>
            ) : (
              <span className="max-w-[240px] truncate font-medium text-foreground">
                {
  item.label.startsWith('common.')
    ? t(item.label)
    : item.label
}
              </span>
            )}

            {index < items.length - 1 && (
              <ChevronRight className="size-4 shrink-0 text-muted rtl:rotate-180" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
