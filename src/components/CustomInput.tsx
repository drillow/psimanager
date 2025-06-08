import { Eye, EyeClosed, LucideIcon } from 'lucide-react'
import { Input, InputProps } from './ui/input'
import { Label } from './ui/label'
import { cx } from 'class-variance-authority'
import { useState } from 'react'
import { FormMessage } from './ui/form'

interface CustomInput extends InputProps {
  label: string
  error?: boolean
  helperText?: string
  leftIcon?: LucideIcon
  onClickHelperText?: () => void
}

export const CustomInput: React.FC<CustomInput> = ({
  id,
  label,
  error = false,
  helperText,
  onClickHelperText,
  leftIcon: LeftIcon,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <Label htmlFor={id} className="text-right text-sm leading-none">
        {label}
      </Label>
      <div className="relative w-full">
        {LeftIcon && (
          <LeftIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        )}

        <Input
          id={id}
          className={cx(
            'bg-white',
            error ? `border-red-500 bg-white` : ``,
            LeftIcon ? `pl-10` : ``,
            type === 'password' ? `pr-10` : ``,
          )}
          type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
          {...props}
        />

        {type === 'password' && (
          <>
            {showPassword ? (
              <Eye
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeClosed
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </>
        )}
      </div>

      {helperText && (
        <div className="w-full text-xs text-zinc-400 flex items-center justify-between">
          {type === 'password' && <FormMessage className="w-full" />}
          <span className="cursor-pointer w-full text-end" onClick={onClickHelperText}>
            {helperText}
          </span>
        </div>
      )}
    </div>
  )
}
