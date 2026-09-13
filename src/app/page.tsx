import { listItems } from '@/lib/api/itemService'
import HeroSection from '@/components/home/HeroSection'
import LatestItemsSection from '@/components/home/LatestItemsSection'

export default async function Home() {
  const itemsResponse = await listItems({
    sort: 'latest',
    page: 1,
  })

  const latestItems = itemsResponse.data

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <HeroSection />


      {latestItems.length > 0 && (
        <LatestItemsSection items={latestItems} />
      )}
    </main>
  )
}
