import { ComponentProps } from 'react'
import { cn } from './utils'

type InputFieldProps = ComponentProps<'input'> & {
  className?: string
}

export const InputField = ({ className, ...rest }: InputFieldProps) => {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-white/10 bg-gray-900/60 px-4 py-3 text-white',
        'placeholder:text-white/40 transition-colors duration-300',
        'hover:border-white/20 hover:bg-white/5',
        'focus:border-violet-500/50 focus:outline-none focus:ring-3 focus:ring-violet-500/20',
        'aria-invalid:border-red-400/70 aria-invalid:focus:ring-red-400/20',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...rest}
    />
  )
}
