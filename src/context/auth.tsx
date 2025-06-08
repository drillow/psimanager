import React, { ReactNode, useContext, useEffect, useState } from 'react'

import JWT, { JwtPayload } from 'jsonwebtoken'
import { IAuthContext, TUserData, INITIAL_STATE } from './auth.types'
import { EPaths } from '@/types'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'
import Cookies from 'universal-cookie'

export const AuthContext = React.createContext<IAuthContext>({} as IAuthContext)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // const token = localStorage.getItem(ACCESS_TOKEN_KEY)
  const cookies = new Cookies()
  const token = cookies.get(ACCESS_TOKEN_KEY)

  const payload: TUserData = token ? (JWT.decode(token) as TUserData) : INITIAL_STATE
  const [userData, setUserData] = useState<TUserData>(payload)

  const signOut = () => {
    cookies.remove(ACCESS_TOKEN_KEY)
    setUserData(INITIAL_STATE)
    window.location.href = EPaths.LOGIN
  }

  const validateToken = () => {
    const localToken = cookies.get(ACCESS_TOKEN_KEY)

    if (!localToken) return false

    const decodedToken: JwtPayload | null = JWT.decode(localToken, {
      complete: true,
    })
    const dateNow = new Date()

    if (!decodedToken || decodedToken?.payload?.exp * 1000 < dateNow.getTime()) {
      cookies.remove(ACCESS_TOKEN_KEY)
      return false
    }
    return true
  }

  useEffect(() => {
    const token = cookies.get(ACCESS_TOKEN_KEY)
    const payload: TUserData = token ? (JWT.decode(token) as TUserData) : INITIAL_STATE
    setUserData(payload)
  }, []) // Run once on mount

  return (
    <AuthContext.Provider
      value={{
        user: userData,
        signIn: setUserData,
        signOut,
        validateToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): IAuthContext => useContext(AuthContext)
