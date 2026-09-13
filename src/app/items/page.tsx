import { listCategories } from '@/lib/api/categoryService'
import { listItems } from '@/lib/api/itemService'
import ItemCard from '@/components/items/ItemCard'
import ItemFilters from '@/components/items/ItemFilters'
import ItemSearch from '@/components/items/ItemSearch'
import ItemSort from '@/components/items/ItemSort'

interface ItemsPageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    sort?: 'latest' | 'oldest' | 'title'
  }>
}

export default async function ItemsPage({
  searchParams,
}: ItemsPageProps) {
  const params = await searchParams

  const [response, categoriesResponse] = await Promise.all([
    listItems({
      category: params.category,
      search: params.search,
      sort: params.sort,
    }),
    listCategories(),
  ])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <header className="max-w-2xl">
        <p className="text-sm font-medium text-muted">
          Explore Marketplace
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Explore Products
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted sm:text-base">
          Discover digital products, templates, and resources.
        </p>
      </header>

      <section className="mt-8">
        <div className="flex flex-col gap-5">
          <ItemSearch activeSearch={params.search} />

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <ItemFilters
              categories={categoriesResponse.data}
              activeCategory={params.category}
            />

            <ItemSort activeSort={params.sort} />
          </div>
        </div>
      </section>

      {response.data.length > 0 ? (
        <section className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {response.data.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
            />
          ))}
        </section>
      ) : (
        <section className="border border-border bg-surface p-10 text-center">
          <h2 className="text-lg font-semibold text-foreground">
            No items found
          </h2>

          <p className="mt-2 text-sm text-muted">
            Try changing your search or filters.
          </p>
        </section>
      )}
    </main>
  )
}
