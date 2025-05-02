import { useMutation } from '@tanstack/react-query'
import { changePassword, recovery, signIn, signUp } from './service'
import { AxiosError } from 'axios'
import { AuthErrorMesssage } from '@/utils/errorMessages'
import { useToast } from '@/hooks/use-toast'

export const useSignIn = () => {
  const { toast } = useToast()
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: signIn,
    retry: 0,
    onError: (error: AxiosError<{ message: AuthErrorMesssage }>) => {
      switch(error?.response?.data.message) {
        case AuthErrorMesssage.INVALID_PASSWORD:
          toast({
            title: 'Senha incorreta',
            description: 'Senha inválida ou incorreta, verifique e tente novamente.'
          })
          break;
        case AuthErrorMesssage.USER_NOT_FOUND:
          toast({
            title: 'Usuário inválido',
            description: 'Usuário inválido ou não existe. Verifique e tente novamente'
          })
          break
        default:
          break
      }
    }
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
    error
  }
}

export const useSignUp = (onSuccess: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: signUp,
    onSuccess,
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
  }
}

export const useRecoveryPassword = () => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: recovery,
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
  }
}


export const useChangePassword = (userId: string, onError: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async ({ newPassword, oldPassword }: { newPassword: string, oldPassword: string }) => await changePassword({ userId, newPassword, oldPassword }),
    onError
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError
  }
}