import { getItem } from '@/lib/api/itemService'
import ItemGallery from '@/components/items/ItemGallery'
import ItemHeader from '@/components/items/ItemHeader'

interface ItemDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ItemDetailPage({
  params,
}: ItemDetailPageProps) {
  const { slug } = await params

  const response = await getItem(slug)
  const item = response.data

  return (
    <main className="mx-auto max-w-5xl p-6">
      <ItemGallery item={item} />

      <ItemHeader item={item} />

      {item.description && (
        <p className="mt-4 text-gray-600">
          {item.description}
        </p>
      )}

      <div className="mt-6">
        <h2 className="font-semibold">
          Categories
        </h2>

        <ul className="mt-2">
          {item.categories.map((category) => (
            <li key={category.id}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
