import { useMutation, useQuery } from "@tanstack/react-query"
import { getPersonData, getProfileImage, Personal, removeProfilePhoto, saveProfileImage, updatePersonData, updateProfileImage } from "./service"
import { QueryKeys } from "@/utils/queryKeys"

export const useGetPersonData = (userId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.USER.PERSON,
    queryFn: async () => await getPersonData(userId),
  })
  return {
    data: data?.data,
    isLoading,
    isError,
  }
}

export const useUpdatePersonData = (userId: string, onSuccess: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (data: Partial<Personal>) => updatePersonData(userId, data),
    onSuccess
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError
  }
}

export const useRemoveProfilePhoto = (userId: string, onSuccess: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: (fileName: string) => removeProfilePhoto(fileName, userId),
    onSuccess
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError
  }
}

export const useGetProfileImage = (userId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: QueryKeys.USER.PROFILE_IMAGE,
    queryFn: async () => await getProfileImage(userId)
  })

  return {
    data, 
    isLoading,
    isError
  }
}

export const useUploadImage = (userId: string, onSuccess?: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (file: File) => await saveProfileImage(userId, file),
    onSuccess
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError
  }
}

export const useUpdateImage = (userId: string, onSuccess?: () => void) => {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (file: File) => await updateProfileImage(userId, file),
    onSuccess
  })

  return {
    execute: mutateAsync,
    isLoading: isPending,
    isError
  }
}