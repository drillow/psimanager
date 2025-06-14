import { Crown, Sparkles } from 'lucide-react'
import { Progress } from './ui/progress'
import { useGetPatient } from '@/service/patient/hooks'
import { useAuth } from '@/context/auth'
import { Button } from './ui/button'
import { useStripe } from '@/service/plan/hooks'

export const PlanWidget = () => {
  const { user } = useAuth()
  const { data, isLoading } = useGetPatient(user.id, 1)
  const { createSubscriptionStripeCheckout, isLoading: isLoadingSub } = useStripe()

  return (
    <div className="flex flex-col border border-zinc-200 p-3 rounded-md mb-4">
      <div className="flex flex-col gap-2 mb-4">
        <h2 className="text-lg font-semibold text-zinc-700 flex items-center gap-2">
          <Crown />
          Plano Gratuito
        </h2>
        <span className="text-xs text-zinc-400">
          Seu plano <strong>gratuíto</strong> permite adicionar até <strong>5</strong> pacientes.
        </span>
      </div>
      {!isLoading && <Progress value={(data?.length * 100) / 5} />}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-zinc-400">1</span>
        <span className="text-xs text-zinc-400">5</span>
      </div>

      <Button
        disabled={isLoadingSub}
        onClick={() => createSubscriptionStripeCheckout(user.id)}
        className="mt-2 flex items-center gap-2"
      >
        <Sparkles />
        Assinar
      </Button>
    </div>
  )
}
