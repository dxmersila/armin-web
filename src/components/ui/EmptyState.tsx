import type { ComponentType, ReactNode } from 'react'

interface EmptyStateProps {
  icon: ComponentType<{ className?: string }>
  title: string
  description: string
  action: ReactNode
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-4xl items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
      <section className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-surface px-6 py-12 text-center shadow-[0_20px_70px_-45px_rgba(124,58,237,0.45)] sm:px-10">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(124,58,237,0.12),transparent_40%)]" />

        <div className="relative">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
            <Icon className="size-7" />
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted">
            {description}
          </p>

          {action}
        </div>
      </section>
    </main>
  )
}
