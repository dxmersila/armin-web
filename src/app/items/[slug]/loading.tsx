export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <div className="mb-6 h-5 w-32 animate-pulse rounded bg-surface-muted" />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <div className="aspect-[16/10] animate-pulse rounded-xl bg-surface-muted" />

        <aside className="space-y-8">
          <div className="space-y-4">
            <div className="h-10 w-3/4 animate-pulse rounded bg-surface-muted" />
            <div className="h-8 w-24 animate-pulse rounded-full bg-surface-muted" />
          </div>

          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-surface-muted" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-surface-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-surface-muted" />
          </div>

          <div className="h-20 animate-pulse rounded-xl bg-surface-muted" />

          <div className="h-12 animate-pulse rounded-lg bg-surface-muted" />
        </aside>
      </div>
    </main>
  )
}
