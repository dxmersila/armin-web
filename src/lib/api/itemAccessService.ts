import { apiClient } from './client'

export interface ItemAccessResponse {
  message: string
}

export async function getItemAccess(
  slug: string,
  token: string,
): Promise<ItemAccessResponse> {
  return apiClient<ItemAccessResponse>(
    `/items/${encodeURIComponent(slug)}/access`,
    {
      token,
    },
  )
}
