import { listCategories } from '@/lib/api/categoryService'
import { listItems } from '@/lib/api/itemService'
import CategorySection from '@/components/home/CategorySection'
import HeroSection from '@/components/home/HeroSection'
import LatestItemsSection from '@/components/home/LatestItemsSection'

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
      <HeroSection items={latestItems.slice(0, 3)} />

      {categories.length > 0 && (
        <CategorySection categories={categories} />
      )}

      {latestItems.length > 0 && (
        <LatestItemsSection items={latestItems} />
      )}
    </main>
  )
}
