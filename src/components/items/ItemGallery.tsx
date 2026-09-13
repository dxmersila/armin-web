import type { Item } from '@/types/item'

interface ItemGalleryProps {
  item: Item
}

export default function ItemGallery({
  item,
}: ItemGalleryProps) {
  const primaryMedia =
    item.media.find((media) => media.is_primary) ??
    item.media[0]

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      {primaryMedia ? (
        <img
          src={primaryMedia.file.url}
          alt={item.title}
          className="aspect-[16/10] h-full w-full object-cover"
        />
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center text-sm text-muted">
          No image available
        </div>
      )}
    </div>
  )
}
