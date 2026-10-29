import { ComponentProps } from 'react'
import { cn } from './utils'

const base = `
		rounded-xl font-semibold transition-all active:scale-[0.98]    disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-2 
`

const variants = {
  primary:
    'bg-blue-600 text-white hover:bg-blue-500 focus:ring-blue-400/50 shadow-lg shadow-blue-900/30',
  success:
    'bg-green-600 text-white hover:bg-green-500 focus:ring-green-400/50 shadow-lg shadow-green-900/30',
  dark: 'bg-gray-900/60 text-white hover:bg-gray-900/80 focus:ring-slate-500/40 border border-white/10'
} as const

const sizes = {
  md: 'px-5 py-2.5',
  lg: 'px-6 py-3'
} as const

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

export const Button = ({
  className,
  variant = 'dark',
  size = 'md',
  children,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
}
