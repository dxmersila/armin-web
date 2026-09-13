import Link from 'next/link'

interface ItemSearchProps {
  activeSearch?: string
}

export default function ItemSearch({
  activeSearch,
}: ItemSearchProps) {
  return (
    <form
      action="/items"
      className="flex flex-1 gap-2"
    >
      <input
        name="search"
        defaultValue={activeSearch}
        placeholder="Search products..."
        className="min-w-0 flex-1 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted focus:border-foreground/30"
      />

      <button
        type="submit"
        className="rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-85"
      >
        Search
      </button>

      {activeSearch && (
        <Link
          href="/items"
          className="rounded-lg border border-border px-4 py-2.5 text-sm font-medium text-muted transition hover:text-foreground"
        >
          Clear
        </Link>
      )}
    </form>
  )
}
