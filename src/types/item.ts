export type ItemAccessType = 'free' | 'paid'

export interface ItemCategory {
  id: number
  name: string
  slug: string
}

export interface ItemTag {
  id: number
  name: string
  slug: string
}

export interface ItemFile {
  id: number
  name: string
  path: string
  url: string
  mime_type: string
  size: number
}

export interface ItemMedia {
  id: number
  is_primary: boolean
  sort_order: number
  file: ItemFile
}

export interface Item {
  id: number
  title: string
  slug: string
  description: string | null
  is_visible: boolean
  access_type: ItemAccessType
  categories: ItemCategory[]
  tags: ItemTag[]
  media: ItemMedia[]
}
