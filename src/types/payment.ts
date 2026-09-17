export type PaymentStatus = 'pending' | 'paid' | 'failed'

export interface Payment {
  id: number
  order_id: number
  amount: number
  status: PaymentStatus
  created_at: string
}

export interface PaymentInitiationResponse {
  data: {
    payment_id: number
    redirect_url: string
    reference: string
  }
}
