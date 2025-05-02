import {  Mail } from 'lucide-react'
import { CustomInput } from '../CustomInput'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth'
import GoogleLogo from '../../assets/Google.svg'
import { Form, FormControl, FormField, FormItem } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordRequirements } from './SingUpForm'
import { api } from '@/service/api'
import { useChangePassword } from '@/service/auth/hooks'
import { LoadingSpinner } from '../Spinner'
import { useToast } from '@/hooks/use-toast'

const formSchema = z
  .object({
    oldPassword: z.string().min(8, { message: 'Mínimo 8 caracteres' }),
    newPassword: z
    .string({ message: 'Senha obrigatória' })
    .min(8, { message: 'Mínimo 8 caracteres' }) 
    .regex(/[A-Z]/, { message: 'Deve conter pelo menos uma letra maiúscula' })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: 'Deve conter pelo menos um caractere especial',
    })
  })

type FormProps = z.infer<typeof formSchema>

export const UserInfoForm = () => {
  const [connectedGoogle, setConnectedGoogle] = useState(false)

  const { toast } = useToast()
  const { user } = useAuth()
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
  })
  
  const { execute, isLoading } = useChangePassword(user.id, () => {
    toast({
      title: 'Error ao alterar a senha',
      description: 'Ocorreu um error ao alterar a senha, tente novamente em alguns minutos.',
    })
  })


  const handleSubmitForm = async (data: FormProps) => await execute(data)

  const handleGoogleLogin = async () => {
    const response = await api.get('/api/google/api/google-auth-url')

    const theTop = (screen.height / 2 - 600 / 2) / 2
    const theLeft = screen.width / 2 - 800 / 2
    const features =
      'height=600,width=800,top=' +
      theTop +
      ',left=' +
      theLeft +
      ',toolbar=1,Location=0,Directories=0,Status=0,menubar=1,Scrollbars=1,Resizable=1'

    window.open(response.data.data.authUrl, '_blank', features)

    window.addEventListener('message', (event) => {
      if (event.data === 'authorization_complete') {
        console.log('Popup signaled authorization complete.')
        handleRefreshLink()
      }
    })
  }

  const handleRefreshLink = () => {
    setConnectedGoogle(true)
  }

  useEffect(() => {
    setConnectedGoogle(user.isGoogleAccountLinked)
  }, [user])

  useEffect(() => {}, [])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className='w-full'>
        <div className="w-full p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-black text-lg">
                Dados da conta
              </h2>
              <p className="text-xs text-zinc-500">
                Gerencie dados de acesso e suas contas contectadas
              </p>
            </div>

            {/* <Separator orientation="horizontal" /> */}
            <div className='border border-b border-dashed border-b-zinc-200' />

            <div className="flex flex-col gap-4 pb-4">
              <div className="flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                  <CustomInput
                    leftIcon={Mail}
                    label="Email"
                    disabled
                    value={user.email}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="oldPassword"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <CustomInput
                            id="password"
                            label="Senha atual"
                            placeholder="Sua senha atual"
                            type="password"
                            error={!!error?.message}
                            {...field}
                          />
                        </FormControl>
                        
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <CustomInput
                            id="confirmPassword"
                            label="Nova senha"
                            placeholder="Sua nova senha"
                            type="password"
                            error={!!error?.message}
                            {...field}
                          />
                        </FormControl>
                        <div className='pt-1'>
                          <PasswordRequirements password={field.value || ''}/>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* <Separator className='border-dashed'/> */}
            <div className='border border-b border-dashed border-b-zinc-200' />

            <div className="flex flex-col gap-4 pb-4 pt-2">
              <div className="flex flex-col">
                <Label className="text-base">Contas integradas</Label>
                <span className="text-xs text-zinc-500">
                  Conecte sua conta a outros serviços.
                </span>
              </div>

              <div className="border border-zinc-300 rounded-md p-2 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-12 min-w-12 bg-zinc-100 rounded-md">
                    <img src={GoogleLogo} alt="Google Logo" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-black">
                      Conta Google
                    </span>
                    <span className="font-normal text-xs text-zinc-500">
                      Conecte sua conta para gerar automaticamente
                      salas de video-chamadas.
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant={'outline'}
                  onClick={connectedGoogle ? () => null : () => handleGoogleLogin()}
                  className="border-green-500 text-green-500 hover:text-green-500 hover:bg-transparent hover:cursor-default"
                >
                  {connectedGoogle ? 'Conectado' : 'Conectar'}
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="bg-white text-black border border-zinc-300 hover:bg-zinc-50"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Salvando...
                </>
              ) : (
                'Salvar alterações'
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
