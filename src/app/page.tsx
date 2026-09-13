import Link from 'next/link'

import { listCategories } from '@/lib/api/categoryService'
import { listItems } from '@/lib/api/itemService'
import ItemCard from '@/components/items/ItemCard'

export default async function Home() {
  const [itemsResponse, categoriesResponse] = await Promise.all([
    listItems({
      sort: 'latest',
      page: 1,
    }),
    listCategories(),
  ])

  const latestItems = itemsResponse.data
  const categories = categoriesResponse.data.slice(0, 6)

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
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
      </section>

      {latestItems.length > 0 && (
        <section className="mt-16">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm text-muted">
                Recently added
              </p>

              <h2 className="mt-1 text-lg font-semibold text-foreground sm:text-xl">
                Latest items
              </h2>
            </div>

            <Link
              href="/items"
              className="text-sm font-medium text-muted transition hover:text-foreground"
            >
              Explore more
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {latestItems.map((item) => (
              <ItemCard
                key={item.id}
                item={item}
              />
            ))}
          </div>
        </section>
      )}
    </main>
  )
}
