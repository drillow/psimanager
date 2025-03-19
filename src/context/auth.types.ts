import { Dispatch, SetStateAction } from 'react'

export type TUserData = {
  id: string
  name: string
  email: string
  updatedAt: Date
  isGoogleAccountLinked: boolean
}

export const INITIAL_STATE: TUserData = {
  id: '',
  name: '',
  email: '',
  updatedAt: new Date(),
  isGoogleAccountLinked: false,
}

export interface IAuthContext {
  signIn: Dispatch<SetStateAction<TUserData>>
  signOut: () => void
  user: TUserData
  validateToken: () => boolean
}
