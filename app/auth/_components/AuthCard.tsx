import type { ReactNode } from 'react'

type AuthCardProps = {
  children: ReactNode
}

export const AuthCard = ({ children }: AuthCardProps) => {
  return (
    <div className="max-w-125 w-full px-10 pt-9 pb-7 bg-gray-900/80 rounded-3xl outline-1 -outline-offset-1 outline-white/20 inline-flex flex-col justify-start items-start overflow-hidden">
      <div className="w-96 h-7 inline-flex justify-start items-center gap-2 overflow-hidden mb-10">
        <div className="size-5 relative bg-violet-600 rounded-md" />
        <div className="justify-start text-white text-xs font-bold">NOVA</div>
      </div>

      {children}
    </div>
  )
}
