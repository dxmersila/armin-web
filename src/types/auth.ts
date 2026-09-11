export type UserRole = 'user' | 'admin'

export interface User {
  id: number
  name: string
  email: string
  role: UserRole
}

export interface AuthResponse {
  user: User
  token: string
}

export interface LogoutResponse {
  message: string
}
