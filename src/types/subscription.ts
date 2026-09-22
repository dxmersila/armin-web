export interface SubscriptionPlan {
  id: number
  name: string
  duration_months: number
  price: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Subscription {
  id: number
  user_id: number
  subscription_plan: SubscriptionPlan
  price: number
  starts_at: string
  ends_at: string
  is_active: boolean
}
