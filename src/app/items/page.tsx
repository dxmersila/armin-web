import { listItems } from '@/lib/api/itemService'
import ItemCard from '@/components/items/ItemCard'

export default async function ItemsPage() {
  const response = await listItems()

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="text-2xl font-bold">
        Items
      </h1>

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
