import { notFound } from 'next/navigation'
import { getItem } from '@/lib/api/itemService'
import ItemGallery from '@/components/items/ItemGallery'
import ItemHeader from '@/components/items/ItemHeader'
import ItemMeta from '@/components/items/ItemMeta'
import ItemActions from '@/components/items/ItemActions'
import Breadcrumbs from '@/components/navigation/Breadcrumbs'

interface ItemDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ItemDetailPage({
  params,
}: ItemDetailPageProps) {
  const { slug } = await params

  let item

  try {
    const response = await getItem(decodeURIComponent(slug))
    item = response.data
  } catch {
    notFound()
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:py-16">
      <Breadcrumbs
        items={[
          {
            label: 'Items',
            href: '/items',
          },
          {
            label: item.title,
          },
        ]}
      />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <section>
          <ItemGallery item={item} />
        </section>

        <aside className="space-y-8">
          <ItemHeader item={item} />

          {item.description && (
            <p className="text-sm leading-7 text-muted sm:text-base">
              {item.description}
            </p>
          )}

          <ItemMeta item={item} />

          <ItemActions item={item} />
        </aside>
      </div>
    </main>
  )
}
