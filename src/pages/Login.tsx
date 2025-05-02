import { RecoveryForm } from '@/components/forms/RecoveryForm'
import { SignInForm } from '@/components/forms/SignInForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Toaster } from '@/components/ui/toaster'

import { useState } from 'react'
import { Hexagon } from 'lucide-react'
import { SingUpForm } from '@/components/forms/SingUpForm'

export enum AuthTabs {
  SINGIN = 'singin',
  SINGUP = 'singup',
}

export const Login: React.FC = () => {
  const [tab, setTab] = useState(AuthTabs.SINGIN)
  const [recoveryPasswordForm, setRecoveryPasswordForm] = useState(false)

  const handleShowRecoveryPasswordForm = () =>
    setRecoveryPasswordForm((prevState) => !prevState)
  // bg-[url(/src/assets/Helix.jpg)]
  return (
    <>
      <Toaster />
      <div className="w-screen h-screen  p-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-no-repeat bg-cover">
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl shadow-2xl bg-white gap-8 relative">
          <div className={`flex flex-col items-center justify-center gap-2`}>
            <div className="flex items-center gap-2">
              <Hexagon className={`w-10 h-10 text-violet-600`} />
              <h1 className="font-bold text-3xl text-violet-600">Drillow</h1>
            </div>
          </div>
          <Tabs
            defaultValue={AuthTabs.SINGIN}
            className="w-[400px] flex flex-col gap-4"
            onValueChange={(value) => setTab(value as AuthTabs)}
            value={tab}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value={AuthTabs.SINGIN}>Entrar</TabsTrigger>
              <TabsTrigger value={AuthTabs.SINGUP}>Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value={AuthTabs.SINGIN}>
              {recoveryPasswordForm ? (
                <RecoveryForm onBackToLogin={handleShowRecoveryPasswordForm} />
              ) : (
                <SignInForm
                  onRecoveryPassword={handleShowRecoveryPasswordForm}
                />
              )}
            </TabsContent>
            <TabsContent value={AuthTabs.SINGUP}>
              <SingUpForm setTab={setTab} />
            </TabsContent>
          </Tabs>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center z-50">
            <p className="text-sm text-zinc-500">©2025 Drillow, Inc.</p>
          </div>
        </div>
      </div>
    </>
  )
}
