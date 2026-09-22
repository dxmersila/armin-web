import { listCategories } from '@/lib/api/categoryService'
import { listItems } from '@/lib/api/itemService'
import ItemFilters from '@/components/items/ItemFilters'
import ItemSearch from '@/components/items/ItemSearch'
import ItemSort from '@/components/items/ItemSort'
import ItemsHeader from '@/components/items/ItemsHeader'
import ItemGrid from '@/components/items/ItemGrid'
import Pagination from '@/components/ui/Pagination'
import SubscriptionPromoSection from '@/components/home/SubscriptionPromoSection'
import ItemsEmptyState from '@/components/items/ItemsEmptyState'

interface ItemsPageProps {
  searchParams: Promise<{
    category?: string
    search?: string
    sort?: 'latest' | 'oldest'
    page?: string
  }>
}

export default async function ItemsPage({
  searchParams,
}: ItemsPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1

  const [response, categoriesResponse] = await Promise.all([
    listItems({
      category: params.category,
      search: params.search,
      sort: params.sort,
      page: currentPage,
    }),
    listCategories(),
  ])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-1 pt-10 sm:px-6 lg:pb-2 lg:pt-14">
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
        <>
          <ItemGrid items={response.data} />

          <Pagination
            currentPage={response.meta.current_page}
            lastPage={response.meta.last_page}
            category={params.category}
            search={params.search}
            sort={params.sort}
          />
        </>
      ) : (
        <ItemsEmptyState />
      )}

      <SubscriptionPromoSection />
    </main>
  )
}
