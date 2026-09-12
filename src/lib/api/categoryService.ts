import { apiClient } from './client'
import type { Category } from '@/types/category'
import type { PaginatedResponse } from '@/types/api'

export async function listCategories(
  page?: number,
): Promise<PaginatedResponse<Category>> {
  const query = page !== undefined ? `?page=${page}` : ''

  return apiClient<PaginatedResponse<Category>>(`/categories${query}`)
}

export async function getCategory(
  slug: string,
): Promise<{ data: Category }> {
  return apiClient<{ data: Category }>(
    `/categories/${encodeURIComponent(slug)}`,
  )
}
