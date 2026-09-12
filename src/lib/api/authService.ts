import { apiClient } from './client'
import type {
  AuthResponse,
  LogoutResponse,
  User,
} from '@/types/auth'

interface RegisterData {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface LoginData {
  email: string
  password: string
}

export async function register(
  data: RegisterData,
): Promise<AuthResponse> {
  return apiClient<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function login(
  data: LoginData,
): Promise<AuthResponse> {
  return apiClient<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function logout(token: string): Promise<LogoutResponse> {
  return apiClient<LogoutResponse>('/auth/logout', {
    method: 'POST',
    token,
  })
}

export async function me(token: string): Promise<{ data: User }> {
  return apiClient<{ data: User }>('/auth/me', {
    token,
  })
}
