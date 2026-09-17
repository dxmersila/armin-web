import { apiClient } from './client'
import type { Payment, PaymentInitiationResponse } from '@/types/payment'

export async function createPayment(
  orderId: number,
  token: string,
): Promise<{ data: Payment }> {
  return apiClient<{ data: Payment }>(
    `/orders/${orderId}/payments`,
    {
      method: 'POST',
      token,
    },
  )
}

export async function initiatePayment(
  paymentId: number,
  token: string,
): Promise<PaymentInitiationResponse> {
  return apiClient<PaymentInitiationResponse>(
    `/payments/${paymentId}/initiate`,
    {
      method: 'POST',
      token,
    },
  )
}
