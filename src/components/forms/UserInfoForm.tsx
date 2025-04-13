import { LockKeyhole, Mail } from 'lucide-react'
import { CustomInput } from '../CustomInput'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { useEffect, useState } from 'react'
import { useAuth } from '@/context/auth'
import GoogleLogo from '../../assets/Google.svg'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z
  .object({
    // firstName: z
    //   .string({ message: 'Nome obrigatório' })
    //   .min(3, { message: 'Mínimo 3 caracteres' }),
    // lastName: z
    //   .string({ message: 'Nome obrigatório' })
    //   .min(3, { message: 'Mínimo 3 caracteres' }),

    password: z
      .string({ message: 'Senha obrigatória' })

      .min(8, { message: 'Mínimo 8 caracteres' })
      .regex(/[A-Z]/, { message: 'Deve conter pelo menos uma letra maiúscula' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Deve conter pelo menos um caractere especial',
      })
      .optional(),
    confirmPassword: z
      .string({ message: 'Confirmação de senha obrigatória' })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type FormProps = z.infer<typeof formSchema>

export const UserInfoForm = () => {
  const { user } = useAuth()
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // firstName: user.name.split(' ')[0],
      // lastName: user.name.split(' ')[1],
    },
  })

  const [connectedGoogle, setConnectedGoogle] = useState(false)

  const handleSubmitForm = (data: FormProps) => console.log(data)

  useEffect(() => {
    setConnectedGoogle(user.isGoogleAccountLinked)
  }, [user])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className='w-full'>
        <div className="w-full py-4 px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-black text-lg">
                Informações da conta
              </h2>
              <p className="text-xs text-zinc-500">
                {/* Todos os seus dados e contas conectadas */}
                Gerencie dados de acesso e suas contas contectadas
              </p>
            </div>

            <Separator orientation="horizontal" />

            <div className="flex flex-col gap-4 pb-4">
              <div className="flex flex-col">
                <Label className="text-base">Acesso</Label>
                <span className="text-xs text-zinc-500">
                  Gerencie seus dados de acesso
                </span>
              </div>
              <div className="flex flex-col gap-4">
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
                    name="password"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <CustomInput
                            id="password"
                            label="Senha"
                            placeholder="Senha"
                            type="password"
                            error={!!error?.message}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field, fieldState: { error } }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <CustomInput
                            id="confirmPassword"
                            label="Confirmar senha"
                            placeholder="Confirmar senha"
                            type="password"
                            error={!!error?.message}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex flex-col gap-4 pb-4 pt-2">
              <div className="flex flex-col">
                <Label className="text-base">Contas integradas</Label>
                <span className="text-xs text-zinc-500">
                  Conecte sua conta a outros serviços.
                </span>
              </div>

              <div className="border border-zinc-300 rounded-md p-2 bg-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-12 w-12 bg-zinc-100 rounded-md">
                    <img src={GoogleLogo} alt="Google Logo" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-semibold text-black">
                      Conta Google
                    </span>
                    <span className="font-normal text-xs text-zinc-500">
                      Conecte sua conta do Google para gerar automaticamente
                      salas de video-chamadas.
                    </span>
                  </div>
                </div>
                <Button
                  type="button"
                  variant={'outline'}
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
            >
              Salvar alterações
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
