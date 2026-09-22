import { apiClient } from './client'
import type { PaginatedResponse } from '@/types/api'
import type {
  Subscription,
  SubscriptionPlan,
} from '@/types/subscription'

export async function getSubscriptionPlans(): Promise<{
  data: SubscriptionPlan[]
}> {
  return apiClient<{ data: SubscriptionPlan[] }>(
    '/subscription-plans',
  )
}

export async function listSubscriptions(
  token: string,
  page?: number,
): Promise<PaginatedResponse<Subscription>> {
  const query = page !== undefined
    ? `?page=${encodeURIComponent(String(page))}`
    : ''

  return apiClient<PaginatedResponse<Subscription>>(
    `/subscriptions${query}`,
    {
      token,
    },
  )
}
