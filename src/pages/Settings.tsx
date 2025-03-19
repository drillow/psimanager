import { PageHeader } from '@/components/PageHeader'
import { useAuth } from '@/context/auth'
import { api } from '@/service/api'
import { useEffect, useState } from 'react'
import GoogleLogo from '../assets/Google.svg'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { CustomInput } from '@/components/CustomInput'
import {
  CreditCard,
  Crown,
  Download,
  EyeClosed,
  Key,
  LockKeyhole,
  Mail,
  Pen,
  SettingsIcon,
  Sparkle,
  User,
  X,
} from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { Link } from 'react-router-dom'
import { cx } from 'class-variance-authority'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from './ui/dialog'

export enum MenuItens {
  USER,
  FINANCE,
}

type SettingsProps = { 
  children: React.ReactNode
  openScreen?: MenuItens
}

export const Settings = ({ children, openScreen = MenuItens.USER }: SettingsProps) => {
  const { user } = useAuth()

  const [connectedGoogle, setConnectedGoogle] = useState(false)
  const [selectedMenu, setSelectedMenu] = useState(openScreen)

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
    // console.log('REFRESH PORRA')
    setConnectedGoogle(true)
  }

  useEffect(() => {
    setConnectedGoogle(user.isGoogleAccountLinked)
  }, [user])

  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>

      <DialogContent className="min-w-[1024px] flex p-0">
        <div className="flex flex-col w-[300px] border-r border-zinc-300 p-4">
          <h1 className="font-bold text-xl pb-4">Configurações</h1>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <div className="flex items-center gap-2 py-2 cursor-pointer" onClick={() => setSelectedMenu(MenuItens.USER)}>
                <User className={cx(`w-4 h-4`, selectedMenu === MenuItens.USER && 'text-violet-500')} />
                <span className={cx("text-sm", selectedMenu === MenuItens.USER && 'text-violet-500')}>Informações da conta</span>
              </div>
              <div className="flex items-center gap-2 py-2 cursor-pointer" onClick={() => setSelectedMenu(MenuItens.FINANCE)}>
                <CreditCard className={cx(`w-4 h-4`, selectedMenu === MenuItens.FINANCE && 'text-violet-500')} />
                <span className={cx("text-sm", selectedMenu === MenuItens.FINANCE && 'text-violet-500')}>Financeiro</span>
              </div>
            </div>
            <Button variant={'secondary'} className='bg-red-100 text-red-500 hover:bg-red-200'>
              <X className={cx(`w-4 h-4`)} />
              Deletar conta
            </Button>
         
          </div>
        </div>
        {selectedMenu === MenuItens.USER && (
          <div className="mx-auto w-full p-4 mr-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="font-bold text-black text-lg">Informações da conta</h2>
                <p className="text-xs text-zinc-500">
                   Todos os seus dados e contas conectadas
                </p>
              </div>

              <Separator orientation="horizontal" />

              <div className="flex flex-col gap-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className='h-16 w-16 rounded-xl'>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {/* <div className="h-16 w-16 bg-purple-500 rounded-xl"></div> */}
                    <div className="flex flex-col gap-1">
                      <Label className="text-left text-black">
                        Foto perfil
                      </Label>
                      <span className="text-xs">PNG, JPEG até 15mb</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button>Alterar foto de perfil</Button>
                    <Button variant={'outline'} className='border-red-500 text-red-500 hover:text-red-600 hover:border-red-600 hover:bg-transparent'>Remover</Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <CustomInput
                    label="Primeiro nome"
                    className="bg-white"
                    value={'Felipe'}
                  />
                  <CustomInput
                    label="Segundo nome"
                    className="bg-white"
                    value={'Lima'}
                  />
                </div>
              </div>

              <Separator />

              <div className="flex flex-col gap-4 pb-4 pt-2">
                <div className="flex flex-col">
                  <Label className="text-base">Acesso</Label>
                  <span className="text-xs text-zinc-500">
                    Gerencie seus dados de login
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                      leftIcon={Mail}
                      label="Email"
                      value={'felip.3lima@hotmail.com'}
                      disabled
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <CustomInput
                      leftIcon={LockKeyhole}
                      label="Senha atual"
                      type="password"
                      // className=''
                    />
                    <CustomInput
                      leftIcon={LockKeyhole}
                      label="Nova senha"
                      type="password"
                    />
                  </div>
                </div>
              </div>

              <Separator/>

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
                        Conecte sua conta do Google para gerar automaticamente salas de video-chamadas.
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={'outline'}
                    className="border-green-500 text-green-500 hover:text-green-500 hover:bg-transparent hover:cursor-default"
                  >
                    {connectedGoogle ? 'Conectado' : 'Conectar'}
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <Button className="bg-white text-black border border-zinc-300 hover:bg-zinc-50">
                Salvar alterações
              </Button>
            </div>
          </div>
        )}

        {selectedMenu === MenuItens.FINANCE && (
          <div className="mx-auto w-full p-4 mr-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="font-bold text-black text-lg">Financeiro</h2>
                <p className="text-xs text-zinc-500">
                  Informações sobre seu plano, formas de pagamento e faturas pagas.
                </p>
              </div>

              <Separator orientation="horizontal" />

              <div className='flex flex-col gap-4'>
                <div className="flex flex-col">
                  <Label className="text-base">Seu plano</Label>
                  <span className="text-xs text-zinc-500">
                    Gerencie seu plano atual ou atualize para um plano premium.
                  </span>
                </div>
                <div className='grid grid-cols-2 gap-4 py-2'>
                  <div className="flex flex-col border border-zinc-200 p-2 rounded-md w-full">
                    <div className="flex flex-col gap-2 mb-4">
                      <div className='flex items-center justify-between'>
                        <h2 className="text-lg font-semibold text-zinc-700 flex items-center gap-2">
                          <Crown />
                          Plano Gratuito
                        </h2>
                        <Badge className='bg-green-500 hover:bg-green-600'>Seu plano atual</Badge>
                      </div>
                      <span className="text-xs text-zinc-400">
                        Seu plano <strong>gratuíto</strong> permite adicionar até{' '}
                        <strong>5</strong> pacientes.
                      </span>
                    </div>

                    <ul className='list-disc list-inside text-sm text-zinc-500 font-normal mb-8 flex-1'>
                      <li>Adicione até 5 pacientes</li>
                      <li>Numero ilimitado de consultas</li>
                      <li className='line-through'>Notificações de consultas</li>
                    </ul>
                  </div>

                  <div className="flex flex-col border border-zinc-200 p-2 rounded-md w-full">
                    <div className="flex flex-col gap-2 mb-4">
                      <div className='flex items-start justify-between'>
                        <h2 className="text-lg font-semibold text-zinc-700 flex items-center gap-2">
                          <Crown className='text-yellow-400'/>
                          Plano Premium
                        </h2>
                        <span className='text-sm text-zinc-500 mb-4'>
                          R$ <strong className='font-bold text-base text-zinc-600'>49.99</strong>/mês
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400">
                        No plano <strong>premium</strong> você pode adicionar até {' '}
                        <strong>20</strong> pacientes.
                      </span>
                    </div>

                    <ul className='list-disc list-inside text-sm text-zinc-500 font-normal mb-8 flex-1'>
                      <li>Adicione até 5 pacientes</li>
                      <li>Numero ilimitado de consultas</li>
                      <li className='font-bold'>Notificações de consultas</li>
                    </ul>

                    <Button variant={'default'}>
                      <Sparkle className='w-4 h-4'/>
                      Atualizar plano
                    </Button>
                  </div>
                </div>
              </div>

              <Separator orientation="horizontal" />

              {/* <div className='flex flex-col gap-4'>
                <div className="flex flex-col">
                  <Label className="text-base">Informação de pagamento</Label>
                  <span className="text-xs text-zinc-500">
                    Mude seu cartão de pagamento e verifique suas faturas passadas
                  </span>
                </div>

                <div className="border border-zinc-300 rounded-md p-2 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center h-12 w-12 bg-zinc-100 rounded-md">
                      <p>V</p>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-semibold text-black">
                        Visa terminado em 1234
                      </span>
                      <span className="font-normal text-xs text-zinc-500">
                        Vence em 06/2031
                      </span>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant={'outline'}
                        className='p-4'
                      >
                        <Pen className='w-4 h-4'/>
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <p>Atualizar Cartão</p>
                    </DialogContent>
                  </Dialog>
                </div>
              </div> */}

              {/* <Separator orientation='horizontal'/> */}
              <div className='flex flex-col gap-2'>
                <div className="flex flex-col">
                  <Label className="text-base">Histórico de pagamento</Label>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Mês</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">03/2025</TableCell>
                      <TableCell>Pendente</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">R$ 49.99</TableCell>
                      <TableCell className="text-right flex items-end justify-end gap-4">
                        <CreditCard className='h-4 w-4 text-violet-500 cursor-pointer'/>
                        <Download className='h-4 w-4 text-violet-500 cursor-pointer'/>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">02/2025</TableCell>
                      <TableCell>Pago</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">R$ 49.99</TableCell>
                      <TableCell className="text-right flex items-end justify-end">
                        <Download className='h-4 w-4 text-violet-500 cursor-pointer'/>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">01/2025</TableCell>
                      <TableCell>Pago</TableCell>
                      <TableCell>Credit Card</TableCell>
                      <TableCell className="text-right">R$ 49.99</TableCell>
                      <TableCell className="text-right flex items-end justify-end">
                        <Download className='h-4 w-4 text-violet-500 cursor-pointer'/>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

          
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
