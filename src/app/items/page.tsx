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
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">
        Items
      </h1>

      <ItemFilters
        categories={categoriesResponse.data}
        activeCategory={params.category}
      />

      <ItemSearch
        activeSearch={params.search}
      />

      <ItemSort
        activeSort={params.sort}
      />

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {response.data.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </main>
  )
}
