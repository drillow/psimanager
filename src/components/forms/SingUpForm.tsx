import { CustomInput } from '@/components/CustomInput'
import { LoadingSpinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { AuthTabs } from '@/pages/Login'
import { useSignUp } from '@/service/auth/hooks'
import { formatCellphone, formatCPF, formatCRP } from '@/utils/masks/phone_mask'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, ArrowRight, Check, Dot, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

type PasswordRequirement = {
  text: string
  validator: (password: string) => boolean
}

const passwordRequirements: PasswordRequirement[] = [
  {
    text: 'Mínimo 8 caracteres',
    validator: (password) => password.length >= 8,
  },
  {
    text: 'Pelo menos uma letra maiúscula',
    validator: (password) => /[A-Z]/.test(password),
  },
  {
    text: 'Pelo menos um caractere especial',
    validator: (password) => /[!@#$%^&*(),.?":{}|<>]/.test(password),
  },
]

const RequirementItem = ({
  text,
  isValid,
  showValidation,
}: {
  text: string
  isValid: boolean
  showValidation: boolean
}) => {
  if (!showValidation) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <Dot className="w-4 h-4 text-zinc-500" />
        <span className="text-zinc-500">{text}</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      {isValid ? (
        <Check className="w-4 h-4 text-green-500" />
      ) : (
        <X className="w-4 h-4 text-red-500" />
      )}
      <span className={isValid ? 'text-green-500' : 'text-red-500'}>
        {text}
      </span>
    </div>
  )
}

export const PasswordRequirements = ({ password }: { password: string }) => {
  const showValidation = password.length > 0

  return (
    <div className="mt-2 space-y-1">
      {passwordRequirements.map((requirement, index) => (
        <RequirementItem
          key={index}
          text={requirement.text}
          isValid={requirement.validator(password)}
          showValidation={showValidation}
        />
      ))}
    </div>
  )
}

const formSchema = z
  .object({
    name: z
      .string({ message: 'Nome obrigatório' })
      .min(3, { message: 'Minímo 3 caractéres' }),
    email: z
      .string({ message: 'E-mail obrigatório' })
      .email({ message: 'E-mail inválido' }),
    cellphone: z
      .string({ message: 'Telefone obrigatório' })
      .min(11, 'Telefone inválido'),
    crp: z.string({ message: 'CRP obrigatório' }),
    cpf: z.string({ message: 'CPF obrigatório' }).min(11, 'CPF inválido'),
    password: z
      .string({ message: 'Senha obrigatória' })
      .min(8, { message: 'Mínimo 8 caracteres' })
      .regex(/[A-Z]/, { message: 'Deve conter pelo menos uma letra maiúscula' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'Deve conter pelo menos um caractere especial',
      }),
    confirmPassword: z.string({ message: 'Confirmação de senha obrigatória' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

type FormProps = z.infer<typeof formSchema>

enum FormSteps {
  PERSONAL_INFO = "PERSONAL_INFO",
  ACCOUNT_INFO = "ACCOUNT_INFO"
}

type SingUpFormType = {
  setTab: (tab: AuthTabs) => void
}

export const SingUpForm: React.FC<SingUpFormType> = ({ setTab }) => {
  const [currentPage, setCurrentPage] = useState(FormSteps.PERSONAL_INFO)
  const { toast } = useToast()
  const { execute, isLoading, isError } = useSignUp(() => {
    toast({
      title: 'Sucesso',
      description: 'Conta criada com sucesso! Você já pode fazer login.',
    })
    setTab(AuthTabs.SINGIN)
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
  })

  const handleSignup = (formPayload: FormProps) => {
    execute({
      email: formPayload.email,
      firstName: formPayload.name.split(' ')[0],
      lastName: formPayload.name.split(' ')[1],
      phoneNumber: formPayload.cellphone,
      crp: formPayload.crp,
      cpf: formPayload.cpf,
      password: formPayload.password,
    })
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error',
        description:
          'Não foi possível criar a sua conta! Por favor tente novamente mais tarde.',
      })
    }
  }, [isError])

  return (
    <Form {...form}>
      <form
          className="flex flex-col items-center justify-center gap-8"
          onSubmit={form.handleSubmit(handleSignup)}
        >
          {currentPage === FormSteps.PERSONAL_INFO && (
             <div className="flex flex-col items-center gap-4 w-full">
               <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput
                        id="name"
                        label="Nome completo"
                        placeholder="Nome completo"
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
                name="cellphone"
                render={({ field, fieldState: { error } }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <CustomInput
                        id="cellphone"
                        label="Celular"
                        type="tel"
                        placeholder="(11) 11111-1111"
                        error={!!error?.message}
                        {...field}
                        onChange={(e) => {
                          const formattedValue = formatCellphone(e.target.value)
                          field.onChange(formattedValue)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center gap-4 w-full">
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          id="cpf"
                          label="CPF"
                          placeholder="CPF"
                          error={!!error?.message}
                          {...field}
                          onChange={(e) => {
                            const formattedValue = formatCPF(e.target.value)
                            field.onChange(formattedValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="crp"
                  render={({ field, fieldState: { error } }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          id="crp"
                          label="CRP"
                          placeholder="CRP"
                          error={!!error?.message}
                          {...field}
                          onChange={(e) => {
                            const formattedValue = formatCRP(e.target.value)
                            field.onChange(formattedValue)
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {currentPage === FormSteps.ACCOUNT_INFO && (
          <div className="flex flex-col items-center gap-4 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <CustomInput
                      id="email"
                      label="E-mail"
                      placeholder="seuemail@email.com"
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
                  <PasswordRequirements password={field.value || ''} />
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
          )}

          <div className="flex flex-col gap-4 w-full">
            {currentPage === FormSteps.PERSONAL_INFO && (
              <Button
                // className="text-violet-600"
                variant={'secondary'}
                type="button"
                onClick={() => setCurrentPage(FormSteps.ACCOUNT_INFO)}
                disabled={!form.watch('name') || !form.watch('cellphone') || !form.watch('cpf') || !form.watch('crp')}
              >
                Próximo
                <ArrowRight className="w-4 h-4 text-violet-600" />
              </Button>
            )}
            {currentPage === FormSteps.ACCOUNT_INFO && (
              <div className='flex items-center gap-4 w-full'>
                <Button
                  className="w-full"
                  type="button"
                  variant={'secondary'}
                  onClick={() => setCurrentPage(FormSteps.PERSONAL_INFO)}
                  >
                    <ArrowLeft className='w-4 h-4 text-violet-600'/>
                  Voltar
                </Button>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner /> : 'Registrar'}
                </Button>
              </div>
            )}
          </div>
      </form>
    </Form>
  )
}