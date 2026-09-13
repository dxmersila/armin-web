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

  const decodedSlug = decodeURIComponent(slug)

  const response = await getItem(decodedSlug)
  const item = response.data

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <ItemGallery item={item} />

        <div>
          <ItemHeader item={item} />

          {item.description && (
            <p className="mt-6 text-sm leading-7 text-muted sm:text-base">
              {item.description}
            </p>
          )}

          <div className="mt-8">
            <ItemMeta item={item} />
          </div>

          <div className="mt-8">
            <ItemActions item={item} />
          </div>
        </div>
      </div>
    </main>
  )
}
