import { listCategories } from '@/lib/api/categoryService'
import { listItems } from '@/lib/api/itemService'
import CategorySection from '@/components/home/CategorySection'
import HeroSection from '@/components/home/HeroSection'
import LatestItemsSection from '@/components/home/LatestItemsSection'
import SubscriptionPromoSection from '@/components/home/SubscriptionPromoSection'

export default async function Home() {
  const [itemsResponse, categoriesResponse] = await Promise.all([
    listItems({
      sort: 'latest',
      page: 1,
    }),
    listCategories(),
  ])

  const latestItems = itemsResponse.data
  const categories = categoriesResponse.data

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-1 pt-10 sm:px-6 lg:pb-2 lg:pt-16">
      <HeroSection items={latestItems.slice(0, 3)} />

      {categories.length > 0 && (
        <CategorySection categories={categories} />
      )}

      {latestItems.length > 0 && (
        <LatestItemsSection items={latestItems} />
      )}

      <SubscriptionPromoSection />
    </main>
  )
}
