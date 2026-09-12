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
      className="mt-4 flex gap-2"
    >
      <input
        name="search"
        defaultValue={activeSearch}
        placeholder="Search items..."
        className="rounded border px-3 py-2"
      />

      <button
        type="submit"
        className="rounded border px-4 py-2"
      >
        Search
      </button>

      {activeSearch && (
        <Link
          href="/items"
          className="rounded border px-4 py-2"
        >
          Clear
        </Link>
      )}
    </form>
  )
}
