import { Sidebar } from '@/components/layout/app-shell/sidebar/Sidebar'
import { Backdrop } from '@/components/ui/Backdrop'
import { ReactNode } from 'react'
import { BurgerBtn } from './burger-btn/BurgerBtn'

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Sidebar />
      <BurgerBtn />
      <Backdrop />

      <main className="max-w-5xl w-full mx-auto px-4">{children}</main>
    </div>
  )
}
