import { Hexagon } from 'lucide-react'
import { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { CustomInput } from '../CustomInput'
import { LoadingSpinner } from '../Spinner'
// import { Button } from 'react-day-picker'
import Cookies from 'universal-cookie'
import { useAuth } from '@/context/auth'
import { useSignIn } from '@/service/auth/hooks'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ACCESS_TOKEN_KEY } from '@/utils/constants'
import { TUserData } from '@/context/auth.types'
import JWT from 'jsonwebtoken'
import { z } from 'zod'
import { useToast } from '@/hooks/use-toast'
import { Button } from '../ui/button'

const formSchema = z.object({
  email: z
    .string({ message: 'E-mail obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z
    .string({ message: 'Senha obrigatória' })
    .min(4, { message: 'Mínimo 4 caracteres' }),
})

type FormProps = z.infer<typeof formSchema>

type SignInFormType = {
  onRecoveryPassword: () => void
}

export const SignInForm: React.FC<SignInFormType> = ({
  onRecoveryPassword,
}) => {
  const cookies = new Cookies()
  const { validateToken, signIn } = useAuth()
  const { execute, isLoading, isError } = useSignIn()
  const { toast } = useToast()

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
  })
  const { control, handleSubmit } = form

  const handleLogin = async (formData: FormProps) => {
    console.log(formData)
    const data = await execute({
      email: formData.email,
      password: formData.password,
    })

    if (isError) {
      toast({
        title: 'Error',
        description: 'dsads',
      })
    }

    cookies.set(ACCESS_TOKEN_KEY, data.access_token)

    signIn(JWT.decode(data.access_token) as TUserData)

    if (validateToken()) {
      window.location.href = '/'
    }
  }

  useEffect(() => {
    if (isError === true) {
      toast({
        title: 'Error',
        description: 'dsads',
      })
    }
  }, [isError, toast])

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleLogin)} className="w-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 w-[400px]">
          {/* <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-2">
              <Hexagon className={`w-10 h-10 text-violet-600`} />
              <h1 className="font-bold text-4xl text-violet-600">MindSync</h1>
            </div>

            <p className="text-lg font-semibold">Sing in to Drillow</p>
          </div> */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="w-full">
                  <CustomInput
                    id="email"
                    label="E-mail"
                    className="w-full"
                    placeholder="Digite o seu email"
                    // error={true}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CustomInput
                    id="password"
                    className="w-full"
                    label="Senha"
                    placeholder="Digite a sua senha"
                    type="password"
                    helperText="Esqueci minha senha"
                    onClickHelperText={onRecoveryPassword}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading ? <LoadingSpinner /> : 'Entrar'}
          </Button>

          {/* <span className="flex items-center gap-2 text-zinc-500 text-sm">
            Ainda não tem conta?
            <button
              type="button"
              className="text-blue-500 font-semibold"
              onClick={() => navigate('/signup')}
            >
              Registre-se
            </button>
          </span> */}
        </div>
      </form>
    </Form>
  )
}
