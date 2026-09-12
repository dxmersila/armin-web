import Link from 'next/link'

interface ItemSortProps {
  activeSort?: 'latest' | 'oldest' | 'title'
}

const options = [
  { label: 'Latest', value: 'latest' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Title', value: 'title' },
] as const

export default function ItemSort({
  activeSort,
}: ItemSortProps) {
  return (
    <div className="mt-4 flex gap-2">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`/items?sort=${option.value}`}
          className="rounded border px-3 py-2"
        >
          {option.label}
          {activeSort === option.value && ' ✓'}
        </Link>
      ))}
    </div>
  )
}
