import { useRef } from "react"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { useAuth } from "@/context/auth"
import { CustomInput } from "../CustomInput"
import { useGetPersonData, useGetProfileImage, useRemoveProfilePhoto, useUpdateImage, useUpdatePersonData, useUploadImage } from "@/service/person/hooks"
import { useQueryClient } from "@tanstack/react-query"
import { QueryKeys } from "@/utils/queryKeys"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoadingSpinner } from "../Spinner"
import { formatCPF, formatCRP } from "@/utils/masks/phone_mask"

const formSchema = z.object({
  firstName: z.string({ message: 'Nome obrigatório' }).min(3, { message: 'Minímo 3 caractéres' }),
  lastName: z.string({ message: 'Nome obrigatório' }).min(3, { message: 'Minímo 3 caractéres' }),
  cpf: z.string({ message: 'CRP obrigatório' }),
  crp: z.string({ message: 'CPF obrigatório' }).min(11, 'CPF inválido'),
  phoneNumber:  z.string({ message: 'Telefone obrigatório' }).min(11, 'Telefone inválido'),
})

type FormProps = z.infer<typeof formSchema>

export const PersonalForm: React.FC = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);
  const { user } = useAuth()
  const { data: personData } = useGetPersonData(user.id)
  const { data: profileImage, isLoading: isLoadingProfileImage } = useGetProfileImage(user.id)
  
  const queryClient = useQueryClient()

  const form = useForm<FormProps>({
    resolver: zodResolver(formSchema),
  })

  const { execute: updatePersonData, isLoading: isLoadingPersonData } = useUpdatePersonData(user.id, () => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.USER.PERSON
    })
  })

  const { execute, isLoading: isLoadingRemoveImage } = useRemoveProfilePhoto(user.id, () => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.USER.PROFILE_IMAGE
    })
  })

  const { execute: executeProfileImage, isLoading: isLoadingSaveImage } = useUploadImage(user.id, () => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.USER.PROFILE_IMAGE
    })
  })

  const { execute: executeUpdateProfileImage, isLoading: isLoadingUpdateImage } = useUpdateImage(user.id, () => {
    queryClient.invalidateQueries({
      queryKey: QueryKeys.USER.PROFILE_IMAGE
    })
  })

  const handleRemovePhoto = async () => await execute(profileImage?.profileUrl!)

  const handleClickButton = () => inputFileRef?.current?.click()

  const handleSubmitForm = async (data: FormProps) => await updatePersonData(data)

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} >
        <div className="mx-auto w-full p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <h2 className="font-bold text-black text-lg">
                Dados pessoais
              </h2>
              <p className="text-xs text-zinc-500">
                 Modifique seus dados pessoais
              </p>
            </div>

            <div className='border border-b border-dashed border-b-zinc-200' />

            <div className="flex flex-col gap-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 rounded-xl">
                    {!isLoadingProfileImage && profileImage?.profileUrl ? (
                      <AvatarImage src={profileImage?.profileUrl} />
                    ) : (
                      <AvatarFallback className="h-16 w-16 rounded-xl">
                        {user.name.split(' ')[0].charAt(0)}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  
                  <div className="flex flex-col gap-1">
                    <Label className="text-left text-black">Foto perfil</Label>
                    <span className="text-xs text-zinc-400">PNG, JPEG até 1.5mb</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button onClick={handleClickButton} disabled={isLoadingSaveImage || isLoadingUpdateImage || isLoadingRemoveImage }>Alterar foto de perfil</Button>
                  <input
                    type="file"
                    multiple={false}
                    ref={inputFileRef}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        profileImage?.profileUrl ? executeUpdateProfileImage(e.target.files[0]) : 
                        executeProfileImage(e.target.files[0]);
                      }
                    }}
                    className="hidden"
                    onChangeCapture={console.log}
                  />
                  <Button
                    variant={'outline'}
                    disabled={!profileImage?.profileUrl}
                    onClick={handleRemovePhoto}
                    className="border-red-500 text-red-500 hover:text-red-600 hover:border-red-600 hover:bg-transparent"
                  >
                    Remover
                  </Button>
                </div>
              </div>
              {!isLoadingPersonData && personData? (
                <>
                  <div className="flex items-start gap-4 mt-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      defaultValue={personData?.first_name}
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
                      defaultValue={personData?.last_name}
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
                      name="cpf"
                      defaultValue={personData?.cpf}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <CustomInput
                              label="CPF"
                              className="bg-white"
                              placeholder="Digite seu CPF"
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
                      defaultValue={personData?.crp}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <CustomInput
                              label="CRP"
                              className="bg-white"
                              placeholder="Digite seu CRP"
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
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      defaultValue={personData?.phone_number}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <CustomInput
                              label="Telefone"
                              className="bg-white"
                              placeholder="Digite seu telefone"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center min-h-[240px]">
                  <LoadingSpinner />
                </div>
              )}
            </div>
          </div>
          <div className='border border-b border-dashed border-b-zinc-200' />
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="bg-white text-black border border-zinc-300 hover:bg-zinc-50"
              type="submit"
              disabled={isLoadingPersonData}
            >
              {isLoadingPersonData ? (
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