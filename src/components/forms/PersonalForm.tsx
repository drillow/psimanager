import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Separator } from "../ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useAuth } from "@/context/auth"
import { CustomInput } from "../CustomInput"

export const PersonalForm = () => {
  const { user } = useAuth()
  const form = useForm()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => {})} >
        <div className="mx-auto w-full p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-black text-lg">
                Dados pessoais
              </h2>
              <p className="text-xs text-zinc-500">
                {/* Todos os seus dados e contas conectadas */}
                 Modifique seus dados pessoais
              </p>
            </div>

            <Separator orientation="horizontal" />

            <div className="flex flex-col gap-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-xl">
                    <AvatarImage src={user.profileUrl} />
                    <AvatarFallback className="h-16 w-16 rounded-xl">
                      {user.name.split(' ')[0].charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex flex-col gap-1">
                    <Label className="text-left text-black">Foto perfil</Label>
                    <span className="text-xs text-zinc-400">PNG, JPEG até 15mb</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button>Alterar foto de perfil</Button>
                  <Button
                    variant={'outline'}
                    className="border-red-500 text-red-500 hover:text-red-600 hover:border-red-600 hover:bg-transparent"
                  >
                    Remover
                  </Button>
                </div>
              </div>
              <div className="flex items-start gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  defaultValue={user.name.split(' ')[0]}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          label="Nome"
                          className="bg-white"
                          placeholder="Digite seu nome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  defaultValue={user.name.split(' ')[1]}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          label="Sobrenome"
                          className="bg-white"
                          placeholder="Digite seu sobrenome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex items-start gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  defaultValue={user.name.split(' ')[0]}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          label="CPF"
                          className="bg-white"
                          placeholder="Digite seu nome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  defaultValue={user.name.split(' ')[1]}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          label="CRP"
                          className="bg-white"
                          placeholder="Digite seu sobrenome"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <Separator /> */}
              <div className="flex items-start gap-4 mt-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  defaultValue={user.name.split(' ')[0]}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <CustomInput
                          label="Endereço"
                          className="bg-white"
                          placeholder="Seu endereço aqui. Ex: Rua das Flores, 123"
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