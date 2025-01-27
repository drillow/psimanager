import { CustomInput } from "@/components/CustomInput"
import { LoadingSpinner } from "@/components/Spinner"
import { Button } from "@/components/ui/button"
import { Toaster } from "@/components/ui/toaster"
import { useAuth } from "@/context/auth"
import { useToast } from "@/hooks/use-toast"
import { useRecoveryPassword, useSignIn } from "@/service/auth/hooks"
import { Hexagon } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Login: React.FC = () => {
  const [recoveryPasswordForm, setRecoveryPasswordForm] = useState(false)
  const navigate = useNavigate()
  const { validateToken } = useAuth()
  const { execute, isError, isLoading } = useSignIn()
  const { toast } = useToast()

  const { execute: execureRecovery, isError: isErrorRecovery, isLoading: isLoadingRecovery } = useRecoveryPassword()

  const handleLogin = async () => {
    const data = await execute({ email: 'felip.3lima@hotmail.com', password: 'F&lipe2802' })

    if (data.code === 400) {
      toast({
        title: "Error",
        description: "dsads"
      })

      return 
    }

    localStorage.setItem('x-app-access-token', data.access_token)
    
    if (validateToken()) {
      navigate('/')
    }
  }

  const handleRecoveryPassword = async () => {
    await execureRecovery({ email: "felip.3lima@hotmail.com" }).then(() => toast({ title: 'Email enviado', description: 'Em breve você irá receber um e-mail com o passso a passo para recuperar a sua senha!' }))
  }

  const handleShowRecoveryPasswordForm = () => setRecoveryPasswordForm(prevState => !prevState)

  return (
    <>
      <Toaster />
      <div className="w-screen h-screen grid grid-cols-12">
        
        <div className="col-start-1 col-end-8 border-r border-zinc-200">

        </div>
        <div className="col-start-8 col-end-13 flex items-center justify-center">
          {recoveryPasswordForm ? (
            <div className="flex flex-col items-center justify-center gap-4 w-full px-40">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className={`w-24 h-24 bg-violet-600 rounded-md flex items-center justify-center`}>
                  <Hexagon className={`w-20 h-20 text-zinc-50`}/>
                </div>
                <p>Recuperar senha</p>
              </div>

              <CustomInput id="email" label="E-mail" className="w-full" placeholder="seuemail@email.com"/>

              <Button className="w-full" onClick={() => handleRecoveryPassword()} disabled={isLoadingRecovery}>
                {isLoadingRecovery ? (
                  <LoadingSpinner />
                ) : 'Enviar email'}
              </Button>

              <Button className="w-full" variant="secondary" onClick={handleShowRecoveryPasswordForm}>Voltar</Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 w-full px-40">
              <div className="flex flex-col items-center justify-center gap-2">
                <div className={`w-24 h-24 bg-violet-600 rounded-md flex items-center justify-center`}>
                  <Hexagon className={`w-20 h-20 text-zinc-50`}/>
                </div>
                <p>Entrar</p>
              </div>

              <CustomInput id="email" label="E-mail" className="w-full" placeholder="seuemail@email.com"/>
              <CustomInput id="password" className="w-full" label="Senha" placeholder="Senha" type="password" helperText="Esqueci minha senha" onClickHelperText={handleShowRecoveryPasswordForm}/>

              <Button className="w-full" onClick={() => handleLogin()} disabled={isLoading}>
                {isLoading ? (
                  <LoadingSpinner />
                ) : 'Entrar'}
              </Button>
              <span className="flex flex-col items-center gap-2">Ainda não tem conta?
                <button className="text-blue-500" onClick={() => navigate('/signup')}>Registre-se</button>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}