import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  CreditCard,
  KeyRound,
  Sparkles,
  User,
} from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { cx } from 'class-variance-authority'
import { UserInfoForm } from '@/components/forms/UserInfoForm'
import { PersonalForm } from '@/components/forms/PersonalForm'
import { SubscriptionStatus, useSubscriptionStatus } from '@/context/subscriptionStatus'
import { useStripe } from '@/service/plan/hooks'
import { useAuth } from '@/context/auth'

export enum MenuItens {
  ACCOUNT,
  PERSONAL,
  FINANCE,
}

type SettingsProps = { 
  children: React.ReactNode
  openScreen?: MenuItens
}

export const Settings = ({ children, openScreen = MenuItens.PERSONAL }: SettingsProps) => {
  const { user } = useAuth()
  const [selectedMenu, setSelectedMenu] = useState(openScreen)
  const { status } = useSubscriptionStatus()
  const { handleCreateStripePortal, createSubscriptionStripeCheckout, isLoading } = useStripe()

  return (
    <Dialog>
      <DialogTrigger>
        {children}
      </DialogTrigger>

      <DialogContent className="min-w-[896px] grid grid-cols-12 p-0 gap-0">
        <div className="col-start-1 col-end-4 flex flex-col border-r border-zinc-300 p-4">
          <h1 className="font-bold text-xl pb-4">Configurações</h1>
          <div className='flex flex-col justify-between h-full'>
            <div className='flex flex-col'>
              <div className="flex items-center gap-2 py-2 cursor-pointer" onClick={() => setSelectedMenu(MenuItens.PERSONAL)}>
                <User className={cx(`w-4 h-4`, selectedMenu === MenuItens.PERSONAL && 'text-violet-500')} />
                <span className={cx("text-sm", selectedMenu === MenuItens.PERSONAL && 'text-violet-500')}>Dados pessoais</span>
              </div>
              <div className="flex items-center gap-2 py-2 cursor-pointer" onClick={() => setSelectedMenu(MenuItens.ACCOUNT)}>
                <KeyRound className={cx(`w-4 h-4`, selectedMenu === MenuItens.ACCOUNT && 'text-violet-500')} />
                <span className={cx("text-sm", selectedMenu === MenuItens.ACCOUNT && 'text-violet-500')}>Dados da conta</span>
              </div>
              <div className="flex items-center gap-2 py-2 cursor-pointer" onClick={() => setSelectedMenu(MenuItens.FINANCE)}>
                <CreditCard className={cx(`w-4 h-4`, selectedMenu === MenuItens.FINANCE && 'text-violet-500')} />
                <span className={cx("text-sm", selectedMenu === MenuItens.FINANCE && 'text-violet-500')}>Financeiro</span>
              </div>
            </div>
          </div>
        </div>
        <div className='col-start-4 col-end-13 flex flex-col'>
        {selectedMenu === MenuItens.PERSONAL && (
          <PersonalForm />
        )}

        {selectedMenu === MenuItens.ACCOUNT && (
          <UserInfoForm />
        )}


        {selectedMenu === MenuItens.FINANCE && (
          <div className="w-full py-4 px-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col">
                <h2 className="font-bold text-black text-lg">Financeiro</h2>
                <p className="text-xs text-zinc-500">
                  Informações sobre seu plano, formas de pagamento e faturas pagas.
                </p>
              </div>
              <div className='border-dashed border-b border-zinc-300'/>
              <div className='flex flex-col gap-4 border border-zinc-300 rounded-lg p-4'>
                <div className='flex items-center justify-between'>
                  <div className="flex flex-col gap-2">
                    <Label className="text-lg font-bold">Seu plano atual</Label>
                    <span className="text-sm text-zinc-500">
                      {status === SubscriptionStatus.ACTIVE ?  'Plano Premium' : 'Plano Gratuito'}
                    </span>
                    <span className='text-base font-semibold'>{status === SubscriptionStatus.ACTIVE ? 'R$ 29.99/mês' : 'R$ 0.00/mês'}</span>
                  </div>
                  <div className='flex items-center gap-4'>
                    {status === SubscriptionStatus.ACTIVE ? (
                      <Button variant={'link'} onClick={() => handleCreateStripePortal(user.id)} disabled={isLoading}>
                        Gerenciar assinatura
                      </Button>
                    ) : (
                      <Button className='flex items-center gap-2' onClick={() => createSubscriptionStripeCheckout(user.id)} disabled={isLoading}>
                        <Sparkles />
                        Fazer upgrade
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
