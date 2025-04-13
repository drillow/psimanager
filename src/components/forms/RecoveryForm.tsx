import { useRecoveryPassword } from '@/service/auth/hooks'
import { Hexagon } from 'lucide-react'
import { CustomInput } from '../CustomInput'
import { Button } from '../ui/button'
import { LoadingSpinner } from '../Spinner'
import { useToast } from '@/hooks/use-toast'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'

const formSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

type FormProps = z.infer<typeof formSchema>

type RecoveryFormType = {
  onBackToLogin: () => void
}

export const RecoveryForm: React.FC<RecoveryFormType> = ({ onBackToLogin }) => {
  const { toast } = useToast()
  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
    },
  })

  const { handleSubmit, control } = form

  const { execute, isLoading, isError } = useRecoveryPassword()

  const handleRecoveryPassword = async (formData: FormProps) => {
    await execute({ email: formData.email }).then(() =>
      toast({
        title: 'Email enviado',
        description:
          'Em breve você irá receber um e-mail com o passso a passo para recuperar a sua senha!',
      }),
    )
  }

  useEffect(() => {
    if (isError) {
      toast({
        title: 'Error',
        description:
          'Em breve você irá receber um e-mail com o passso a passo para recuperar a sua senha!',
      })
    }
  }, [isError, toast])
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleRecoveryPassword)} className="">
        <div className="flex flex-col items-center justify-center gap-4 w-full">

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
                    placeholder="seuemail@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? <LoadingSpinner /> : 'Recuperar conta'}
          </Button>

          <Button
            className="w-full"
            variant="secondary"
            type="button"
            onClick={onBackToLogin}
          >
            Voltar
          </Button>
        </div>
      </form>
    </Form>
  )
}
