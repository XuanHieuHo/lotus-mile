import { useMutation } from '@tanstack/react-query'
import { requestPasswordReset, type ForgotPasswordInput, type ForgotPasswordResponse } from '@/api/auth.api'

export function useForgotPassword() {
  return useMutation<ForgotPasswordResponse, Error, ForgotPasswordInput>({
    mutationFn: requestPasswordReset,
  })
}
