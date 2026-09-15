import { listCategories } from '@/lib/api/categoryService'
import { listItems } from '@/lib/api/itemService'
import ItemFilters from '@/components/items/ItemFilters'
import ItemSearch from '@/components/items/ItemSearch'
import ItemSort from '@/components/items/ItemSort'
import ItemsHeader from '@/components/items/ItemsHeader'
import ItemGrid from '@/components/items/ItemGrid'

interface ItemsPageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    sort?: 'latest' | 'oldest'
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
      <ItemsHeader />

      <section className="mt-8 rounded-2xl border border-border bg-surface/70 p-4 shadow-sm sm:p-5">
        <ItemSearch activeSearch={params.search} />

        <div className="mt-5 border-t border-border pt-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="min-w-0">
              <ItemFilters
                categories={categoriesResponse.data}
                activeCategory={params.category}
              />
            </div>

            <div className="min-w-0">
              <ItemSort activeSort={params.sort} />
            </div>
          </div>
        </div>
      </section>

      {response.data.length > 0 ? (
        <ItemGrid items={response.data} />
      ) : (
        <section className="mt-8 rounded-2xl border border-border bg-surface px-6 py-14 text-center sm:px-10">
          <h2 className="text-lg font-semibold text-foreground">
            No products found
          </h2>

          <p className="mt-2 text-sm text-muted">
            Try changing your search or filters.
          </p>
        </section>
      )}
    </main>
  )
}
