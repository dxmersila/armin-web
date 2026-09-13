import Link from 'next/link'

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
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted"
    >
      {items.map((item, index) => (
        <div
          key={`${item.label}-${index}`}
          className="flex items-center gap-2"
        >
          {item.href ? (
            <Link
              href={item.href}
              className="transition hover:text-foreground"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <span>/</span>
          )}
        </div>
      ))}
    </nav>
  )
}
