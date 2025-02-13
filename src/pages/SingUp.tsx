import { CustomInput } from '@/components/CustomInput'
import { Button } from '@/components/ui/button'
import { useSignUp } from '@/service/auth/hooks'
import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const SignUp = () => {
  const navigate = useNavigate()
  const { execute } = useSignUp()

  const handleSignup = () => {
    execute({
      email: 'felip.3lima@hotmail.com',
      name: 'Felipe Vieira Lima',
      cellphone: '71996622771',
      crp: 'CBA-12314',
      cpf: '05269537567',
      password: 'F&lipe2802',
    })
  }

  const handleBack = () => navigate('/login')
  return (
    <div className="w-screen h-screen grid grid-cols-12">
      <div className="col-start-1 col-end-8 border-r border-zinc-200"></div>
      <div className="col-start-8 col-end-13 flex items-center justify-center relative">
        <Button
          className="absolute top-4 left-4"
          variant="link"
          onClick={() => handleBack()}
        >
          <ChevronLeft />
          Voltar
        </Button>
        <div className="flex flex-col items-center justify-center gap-16  w-full px-40">
          <p>Criar conta</p>

          <div className="flex flex-col items-center gap-4 w-full">
            <CustomInput
              id="name"
              label="Nome completo"
              placeholder="Nome completo"
              error
            />
            <CustomInput
              id="email"
              label="E-mail"
              placeholder="seuemail@email.com"
            />
            <CustomInput
              id="phomne"
              label="Celular"
              placeholder="(11) 11111-1111"
            />
            <div className="flex items-center gap-4 w-full">
              <CustomInput id="cpf" label="CPF" placeholder="CPF" />
              <CustomInput id="crp" label="CRP" placeholder="CRP" />
            </div>

            <CustomInput
              id="password"
              label="Senha"
              placeholder="Senha"
              type="password"
            />
            <CustomInput
              id="confirm-password"
              label="Confirmar senha"
              placeholder="Confirmar senha"
              type="password"
            />
          </div>

          <Button className="w-full" onClick={() => handleSignup()}>
            Registrar
          </Button>
        </div>
      </div>
    </div>
  )
}
