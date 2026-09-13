import Link from 'next/link'

import { listItems } from '@/lib/api/itemService'
import ItemCard from '@/components/items/ItemCard'
import HeroSection from '@/components/home/HeroSection'

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
