import { useToast } from '@/hooks/use-toast'
import { CheckCheck, Copy } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

type CopyButtonProps = {
  copyText: string
  disabled?: boolean
}

export const CopyButton: React.FC<CopyButtonProps> = ({
  disabled,
  copyText,
}) => {
  const [isCopy, setIsCopy] = useState(false)

  const { toast } = useToast()
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(copyText)
    setIsCopy(true)
    toast({
      title: 'Link copiado com sucesso!',
      description: 'URL da sessão foi copiado para sua área de transferência.',
    })
  }

  useEffect(() => {
    if (isCopy) {
      const timer = setTimeout(() => {
        setIsCopy(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [isCopy])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={disabled ? 'cursor-default' : 'cursor-pointer'}
            onClick={() => !disabled && handleCopyToClipboard()}
          >
            {isCopy ? (
              <CheckCheck className="w-4 h-4 text-green-500" />
            ) : (
              <Copy
                className={`w-4 h-4 ${disabled ? 'text-zinc-400' : 'text-violet-400'}`}
              />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copiar link</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
