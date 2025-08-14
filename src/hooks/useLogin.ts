import { useMutation } from '@tanstack/react-query'
import { loginApi } from '@/api/auth.api'

export function useLogin(){ 
    return useMutation({ mutationFn: loginApi }) 
}
