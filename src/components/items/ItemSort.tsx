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
    <div className="flex gap-2">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`/items?sort=${option.value}`}
          className={[
            'rounded-lg border px-3 py-2 text-sm font-medium transition',
            activeSort === option.value
              ? 'border-foreground bg-foreground text-background'
              : 'border-border bg-surface text-muted hover:text-foreground',
          ].join(' ')}
        >
          {option.label}
        </Link>
      ))}
    </div>
  )
}
