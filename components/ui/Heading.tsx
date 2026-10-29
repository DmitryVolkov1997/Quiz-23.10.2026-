import { ReactNode } from 'react'
import { cn } from './utils'

type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  children: ReactNode
}

const headingStyles = {
  h1: 'text-4xl font-bold',
  h2: 'text-3xl font-semibold',
  h3: 'text-2xl font-medium',
  h4: 'text-xl font-medium',
  h5: 'text-lg font-medium',
  h6: 'text-base font-medium'
}

export const Heading = ({ as = 'h2', className, children }: HeadingProps) => {
  const Tag = as

  return <Tag className={cn(headingStyles[Tag], className)}>{children}</Tag>
}
