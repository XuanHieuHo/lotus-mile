import { useMutation } from '@tanstack/react-query'
import { register, type SignupInput, type SignupResponse } from '@/api/auth.api'

export function useRegister() {
  return useMutation<SignupResponse, Error, SignupInput>({
    mutationFn: register,
  })
}
