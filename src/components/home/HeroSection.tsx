import Link from 'next/link'

export default function HeroSection() {
  return (
    <section>
      <p className="text-sm font-medium text-muted">
        Explore Marketplace
      </p>

      <h1 className="mt-2 max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Discover digital products
        built for creators and teams.
      </h1>

      <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
        Explore templates, assets, and digital resources
        designed to help you build faster.
      </p>

      <form
        action="/items"
        className="mt-8 flex max-w-2xl gap-2"
      >
        <input
          name="search"
          placeholder="Search products..."
          className="min-w-0 flex-1 rounded-md border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-foreground/30"
        />

        <button
          type="submit"
          className="rounded-md bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-85"
        >
          Search
        </button>
      </form>

      <div className="mt-6">
        <Link
          href="/items"
          className="text-sm font-medium text-muted transition hover:text-foreground"
        >
          Browse all products →
        </Link>
      </div>
    </section>
  )
}
