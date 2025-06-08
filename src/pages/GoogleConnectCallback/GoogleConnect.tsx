import { useAuth } from '@/context/auth'
import { api } from '@/service/api'
import { Loader2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const GoogleConnect = () => {
  const [isLoading] = useState(true)
  const { user } = useAuth()

  const [searchParams] = useSearchParams()

  const handleSaveTokens = useCallback(async () => {
    const response = await api.post(`/api/google/save-token/${user.id}`, {
      access_token: searchParams.get('access_token'),
      refresh_token: searchParams.get('refresh_token'),
      expiry_date: searchParams.get('expiry_date'),
    })

    window.opener.postMessage('authorization_complete', '*')

    return response.status === 200 ? window.close() : null
  }, [searchParams, user.id])

  useEffect(() => {
    handleSaveTokens()
  }, [handleSaveTokens])

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-2">
      {isLoading ? (
        <>
          <Loader2 className="animate-spin text-purple-700" />
          <span>Aguarde</span>
        </>
      ) : (
        <div>
          <span>Você ja pode fechar a página</span>
        </div>
      )}
    </div>
  )
}
