import { useMutation } from '@tanstack/react-query'
import { recovery, signIn, signUp } from './service'

export const useSignIn = () => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: signIn,
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError,
  }
}

export const useSignUp = () => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: signUp,
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
