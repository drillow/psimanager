import { Dispatch, SetStateAction } from 'react'

export const INITIAL_STATE = {
  name: '',
  email: '',
  updatedAt: new Date(),
}

export type TUserData = {
  name: string
  email: string
  updatedAt: Date
}

export interface IAuthContext {
  signIn: Dispatch<SetStateAction<TUserData>>
  signOut: () => void
  user: TUserData
  validateToken: () => boolean
}
