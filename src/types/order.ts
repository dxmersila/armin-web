import type { Item } from '@/types/item'
import type { Payment } from '@/types/payment'
import type { SubscriptionPlan } from '@/types/subscription'

export type OrderType = 'item' | 'subscription'
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'cancelled'

export interface OrderItem {
  id: number
  item_id: number
  price: number
  item: Item
}

export interface Order {
  id: number
  user_id: number
  type: OrderType
  status: OrderStatus
  total_price: number
  items: OrderItem[]
  subscription_plan?: SubscriptionPlan
  payments?: Payment[]
  created_at: string
}
