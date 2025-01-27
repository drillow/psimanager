import { Input, InputProps } from "./ui/input"
import { Label } from "./ui/label"

interface CustomInput extends InputProps {
  label: string
  error?: boolean
  helperText?: string
  onClickHelperText?: () => void
}

export const CustomInput: React.FC<CustomInput> = ({ id, label, error = false, helperText, onClickHelperText, ...props}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input id={id} className={error ? 'border-red-500' : ''} {...props} />
      {helperText && (
        <div className="w-full text-end text-xs text-zinc-400">
          <span className="cursor-pointer" onClick={onClickHelperText}>{helperText}</span>
        </div>
      )}
    </div>
  )
}