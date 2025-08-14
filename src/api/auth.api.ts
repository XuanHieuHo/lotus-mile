import { http } from '@/services/http'

export type LoginInput = { email: string; password: string }
export type User = { id: string; name: string; email: string }
export type LoginResponse = { user: User; token: string }
export type SignupInput = { username: string; password: string; email: string; birthday: string }
export type SignupResponse = { userId: string }
export interface ForgotPasswordInput { email: string }
export interface ForgotPasswordResponse { message: string }

export async function loginApi(data: LoginInput): Promise<LoginResponse> {
  const res = await http.post('/auth/login', data)
  return res.data
}

export const register = async (data: SignupInput) => {
  const res = await http.post<SignupResponse>('/auth/register', data)
  return res.data
}

export const requestPasswordReset = async (data: ForgotPasswordInput) => {
  const res = await http.post<ForgotPasswordResponse>('/auth/forgot-password', data)
  return res.data
}
