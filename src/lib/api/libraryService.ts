import { apiClient } from './client'
import type { PaginatedResponse } from '@/types/api'
import type { Item } from '@/types/item'

export async function listLibrary(
  token: string,
  page?: number,
): Promise<PaginatedResponse<Item>> {
  const query =
    page !== undefined
      ? `?page=${encodeURIComponent(String(page))}`
      : ''

  return apiClient<PaginatedResponse<Item>>(
    `/library${query}`,
    {
      token,
    },
  )
}
