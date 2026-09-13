import { getItem } from '@/lib/api/itemService'
import ItemGallery from '@/components/items/ItemGallery'
import ItemHeader from '@/components/items/ItemHeader'
import ItemMeta from '@/components/items/ItemMeta'
import ItemActions from '@/components/items/ItemActions'

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

      <div className="mt-8">
        <ItemMeta item={item} />
      </div>

      <div className="mt-8">
        <ItemActions item={item} />
      </div>
    </main>
  )
}
