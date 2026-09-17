'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { Item } from '@/types/item'
import type { CartItem } from '@/types/cart'

const CART_STORAGE_KEY = 'armin_cart'

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  total: number
  isHydrated: boolean
  addItem: (item: Item) => void
  removeItem: (itemId: number) => void
  hasItem: (itemId: number) => boolean
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(CART_STORAGE_KEY)

      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[]

        if (Array.isArray(parsed)) {
          setItems(parsed)
        }
      }
    } catch {
      window.localStorage.removeItem(CART_STORAGE_KEY)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) {
      return
    }

    window.localStorage.setItem(
      CART_STORAGE_KEY,
      JSON.stringify(items),
    )
  }, [items, isHydrated])

  const addItem = useCallback((item: Item) => {
    setItems((currentItems) => {
      if (currentItems.some((currentItem) => currentItem.id === item.id)) {
        return currentItems
      }

      const primaryMedia =
        item.media.find((media) => media.is_primary) ?? item.media[0]

      const cartItem: CartItem = {
        id: item.id,
        title: item.title,
        slug: item.slug,
        price: item.price,
        imageUrl: primaryMedia?.file.url ?? null,
      }

      return [...currentItems, cartItem]
    })
  }, [])

  const removeItem = useCallback((itemId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    )
  }, [])

  const hasItem = useCallback(
    (itemId: number) =>
      items.some((item) => item.id === itemId),
    [items],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.length,
      total: items.reduce((sum, item) => sum + item.price, 0),
      isHydrated,
      addItem,
      removeItem,
      hasItem,
      clearCart,
    }),
    [
      items,
      isHydrated,
      addItem,
      removeItem,
      hasItem,
      clearCart,
    ],
  )

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }

  return context
}
