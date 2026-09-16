import type { Item } from '@/types/item'

interface ItemGalleryProps {
  item: Item
  noImageText?: string
}

export default function ItemGallery({
  item,
  noImageText = 'No image available',
}: ItemGalleryProps) {
  const primaryMedia =
    item.media.find((media) => media.is_primary) ??
    item.media[0]

  return (
    <div className="overflow-hidden">
      {primaryMedia ? (
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={primaryMedia.file.url}
            alt={item.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] items-center justify-center bg-surface-muted text-sm text-muted">
          {noImageText}
        </div>
      )}
    </div>
  )
}
