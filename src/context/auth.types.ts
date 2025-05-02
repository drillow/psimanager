import { Dispatch, SetStateAction } from 'react'

export type TUserData = {
  id: string
  name: string
  email: string
  updatedAt: Date
  profileUrl?: string
  isGoogleAccountLinked: boolean
  showOnboarding: boolean
}

export const INITIAL_STATE: TUserData = {
  id: '',
  name: '',
  email: '',
  updatedAt: new Date(),
  profileUrl: '',
  showOnboarding: true,
  isGoogleAccountLinked: false,
}

export interface IAuthContext {
  signIn: Dispatch<SetStateAction<TUserData>>
  signOut: () => void
  user: TUserData
  validateToken: () => boolean
}
