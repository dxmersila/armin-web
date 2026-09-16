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
            label: 'common.items',
            href: '/items',
          },
          {
            label: item.title,
          },
        ]}
      />

      <div className="overflow-hidden rounded-3xl border border-border bg-surface">
        <div className="grid lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,0.8fr)]">
          <section className="min-w-0">
            <ItemGallery item={item} />
          </section>

          <aside className="min-w-0 border-t border-border lg:border-s lg:border-t-0">
            <div className="space-y-7 p-6 sm:p-8 lg:p-9">
              <ItemHeader item={item} />
              <ItemActions item={item} />
            </div>
          </aside>
        </div>

        {item.description && (
          <section className="border-t border-border px-6 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-9">
            <p className="max-w-4xl text-sm leading-7 text-muted sm:text-base">
              {item.description}
            </p>
          </section>
        )}

        {(item.categories.length > 0 || item.tags.length > 0) && (
          <section className="border-t border-border px-6 py-7 sm:px-8 sm:py-8 lg:px-9 lg:py-9">
            <ItemMeta item={item} />
          </section>
        )}
      </div>
    </main>
  )
}
