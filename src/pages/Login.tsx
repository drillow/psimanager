import { CustomInput } from '@/components/CustomInput'
import { LoadingSpinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { Toaster } from '@/components/ui/toaster'
import { useAuth } from '@/context/auth'
import { TUserData } from '@/context/auth.types'
import { useToast } from '@/hooks/use-toast'
import { useRecoveryPassword, useSignIn } from '@/service/auth/hooks'
import { Hexagon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import JWT from 'jsonwebtoken'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'

import Cookies from 'universal-cookie'

export const Login: React.FC = () => {
  const cookies = new Cookies()
  const [recoveryPasswordForm, setRecoveryPasswordForm] = useState(false)
  const navigate = useNavigate()
  const { validateToken, signIn } = useAuth()
  const { execute, isLoading } = useSignIn()
  const { toast } = useToast()

  const { execute: execureRecovery, isLoading: isLoadingRecovery } =
    useRecoveryPassword()

  const handleLogin = async () => {
    const data = await execute({
      email: 'felip.3lima@hotmail.com',
      password: 'F&lipe2802',
    })

    if (data.code === 400) {
      toast({
        title: 'Error',
        description: 'dsads',
      })
    }

    cookies.set(ACCESS_TOKEN_KEY, data.access_token)
    // document.cookie = `x-app-access-token=${data.access_token};

    signIn(JWT.decode(data.access_token) as TUserData)

    if (validateToken()) {
      navigate('/')
    }
  }

  const handleRecoveryPassword = async () => {
    await execureRecovery({ email: 'felip.3lima@hotmail.com' }).then(() =>
      toast({
        title: 'Email enviado',
        description:
          'Em breve você irá receber um e-mail com o passso a passo para recuperar a sua senha!',
      }),
    )
  }

  const handleShowRecoveryPasswordForm = () =>
    setRecoveryPasswordForm((prevState) => !prevState)

  return (
    <>
      <Toaster />
      <div className="w-screen h-screen grid grid-cols-12 p-4  bg-[url(/src/assets/Helix.jpg)] bg-no-repeat bg-cover">
        <div className="col-start-1 col-end-8"></div>
        <div className="col-start-8 col-end-13 flex items-center justify-center rounded-3xl shadow-2xl bg-white">
          {recoveryPasswordForm ? (
            <div className="flex flex-col items-center justify-center gap-4 w-full px-40">
              <div className="flex flex-col items-center justify-center gap-2">
                <div
                  className={`w-24 h-24 bg-violet-600 rounded-md flex items-center justify-center`}
                >
                  <Hexagon className={`w-20 h-20 text-zinc-50`} />
                </div>
                <p>Recuperar senha</p>
              </div>

              <CustomInput
                id="email"
                label="E-mail"
                className="w-full"
                placeholder="seuemail@email.com"
              />

              <Button
                className="w-full"
                onClick={() => handleRecoveryPassword()}
                disabled={isLoadingRecovery}
              >
                {isLoadingRecovery ? <LoadingSpinner /> : 'Enviar email'}
              </Button>

              <Button
                className="w-full"
                variant="secondary"
                onClick={handleShowRecoveryPasswordForm}
              >
                Voltar
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 w-full px-40">
              <div className="flex flex-col items-center justify-center gap-2">
                <div
                  className={`w-24 h-24 bg-violet-600 rounded-md flex items-center justify-center`}
                >
                  <Hexagon className={`w-20 h-20 text-zinc-50`} />
                </div>
                <p>Entrar</p>
              </div>

              <CustomInput
                id="email"
                label="E-mail"
                className="w-full"
                placeholder="seuemail@email.com"
              />
              <CustomInput
                id="password"
                className="w-full"
                label="Senha"
                placeholder="Senha"
                type="password"
                helperText="Esqueci minha senha"
                onClickHelperText={handleShowRecoveryPasswordForm}
              />

              <Button
                className="w-full"
                onClick={() => handleLogin()}
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : 'Entrar'}
              </Button>
              {/* <SignIn
              fallbackRedirectUrl="/"
              signUpUrl="/signup"
              component="div"
              appearance={{
                elements: {
                  cardBox: { border: 0, boxShadow: 'none' },
                  card: { border: 0, boxShadow: 'none' },
                  footer: { background: 'none' },
                  formButtonPrimary: 'bg-violet-600 hover:bg-violet-700',
                },
              }}
            /> */}
              <span className="flex flex-col items-center gap-2">
                Ainda não tem conta?
                <button
                  className="text-blue-500"
                  onClick={() => navigate('/signup')}
                >
                  Registre-se
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
