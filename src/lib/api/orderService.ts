import { apiClient } from './client'
import type { PaginatedResponse } from '@/types/api'
import type { Order } from '@/types/order'

interface CreateItemOrderData {
  type: 'item'
  item_ids: number[]
}

interface CreateSubscriptionOrderData {
  type: 'subscription'
  subscription_plan_id: number
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

export async function createSubscriptionOrder(
  subscriptionPlanId: number,
  token: string,
): Promise<{ data: Order }> {
  const data: CreateSubscriptionOrderData = {
    type: 'subscription',
    subscription_plan_id: subscriptionPlanId,
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

export async function listOrders(
  token: string,
  page?: number,
): Promise<PaginatedResponse<Order>> {
  const query = page !== undefined
    ? `?page=${encodeURIComponent(String(page))}`
    : ''

  return apiClient<PaginatedResponse<Order>>(
    `/orders${query}`,
    {
      token,
    },
  )
}

export async function cancelOrder(
  orderId: number,
  token: string,
): Promise<void> {
  await apiClient<void>(`/orders/${orderId}`, {
    method: 'DELETE',
    token,
  })
}
