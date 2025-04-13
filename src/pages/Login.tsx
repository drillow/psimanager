import { RecoveryForm } from '@/components/forms/RecoveryForm'
import { SignInForm } from '@/components/forms/SignInForm'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Toaster } from '@/components/ui/toaster'

import { useState } from 'react'
import { Hexagon } from 'lucide-react'
import { SingUpForm } from '@/components/forms/SingUpForm'

enum AuthTabs {
  SINGIN = 'singin',
  SINGUP = 'singup',
}

export const Login: React.FC = () => {
  const [tab, setTab] = useState(AuthTabs.SINGIN)
  const [recoveryPasswordForm, setRecoveryPasswordForm] = useState(false)

  const handleShowRecoveryPasswordForm = () =>
    setRecoveryPasswordForm((prevState) => !prevState)

  return (
    <>
      <Toaster />
      <div className="w-screen h-screen  p-2 bg-[url(/src/assets/Helix.jpg)] bg-no-repeat bg-cover">
        {/* <div className="col-start-1 col-end-8"></div> */}
        <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl shadow-2xl bg-white gap-8">
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <Hexagon className={`w-10 h-10 text-violet-600`} />
              <h1 className="font-bold text-4xl text-violet-600">MindSync</h1>
            </div>

            {/* <p className="text-lg font-semibold">{tab === AuthTabs.SINGIN ? 'Singin' : 'Singup'} to Drillow</p> */}
          </div>
          <Tabs defaultValue={AuthTabs.SINGIN} className='w-[400px] flex flex-col gap-4' onValueChange={(value) => setTab(value as AuthTabs)} value={tab} >
            <TabsList className='grid w-full grid-cols-2'>
              <TabsTrigger value={AuthTabs.SINGIN}>Entrar</TabsTrigger>
              <TabsTrigger value={AuthTabs.SINGUP}>Criar conta</TabsTrigger>
            </TabsList>
            <TabsContent value={AuthTabs.SINGIN}>
              {recoveryPasswordForm ? (
                <RecoveryForm onBackToLogin={handleShowRecoveryPasswordForm} />
              ) : (
                <SignInForm onRecoveryPassword={handleShowRecoveryPasswordForm} />
              )}
            </TabsContent>
            <TabsContent value={AuthTabs.SINGUP}>
              <SingUpForm onBackToSingIn={() => setTab(AuthTabs.SINGIN)}/>
            </TabsContent>
          </Tabs>

         
        </div>
      </div>
    </>
  )
}
