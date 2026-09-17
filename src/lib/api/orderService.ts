import { apiClient } from './client'
import type { Order } from '@/types/order'

interface CreateItemOrderData {
  type: 'item'
  item_ids: number[]
}

export async function createItemOrder(
  itemIds: number[],
  token: string,
): Promise<{ data: Order }> {
  const data: CreateItemOrderData = {
    type: 'item',
    item_ids: itemIds,
  }

  return apiClient<{ data: Order }>('/orders', {
    method: 'POST',
    body: JSON.stringify(data),
    token,
  })
}

export async function getOrder(
  orderId: number,
  token: string,
): Promise<{ data: Order }> {
  return apiClient<{ data: Order }>(`/orders/${orderId}`, {
    token,
  })
}
