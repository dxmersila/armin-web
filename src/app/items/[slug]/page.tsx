import { getItem } from '@/lib/api/itemService'

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
      <h1 className="text-3xl font-bold">
        {item.title}
      </h1>

      {item.description && (
        <p className="mt-4 text-gray-600">
          {item.description}
        </p>
      )}

      <div className="mt-4">
        Access: {item.access_type}
      </div>

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
