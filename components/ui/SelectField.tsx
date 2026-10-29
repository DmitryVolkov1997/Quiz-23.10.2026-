import { ChevronDown } from 'lucide-react'
import { ComponentProps } from 'react'
import { cn } from './utils'

type SelectFieldProps = ComponentProps<'select'>

export const SelectField = ({
  className,
  children,
  ...rest
}: SelectFieldProps) => {
  return (
    <div className="relative">
      <select
        className={cn(
          'w-full appearance-none rounded-xl border border-white/10 bg-gray-900/60 px-4 py-3 pr-10 text-white scheme-dark',
          'transition-colors duration-300',
          'hover:border-white/20 hover:bg-white/5',
          'focus:border-violet-500/50 focus:outline-none focus:ring-3 focus:ring-violet-500/20',
          'aria-invalid:border-red-400/70 aria-invalid:focus:ring-red-400/20',
          'disabled:pointer-events-none disabled:opacity-50',
          className
        )}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-white/50" />
    </div>
  )
}
