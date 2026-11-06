import { Sidebar } from '@/components/layout/app-shell/sidebar/Sidebar'
import { Backdrop } from '@/components/ui/Backdrop'
import { Spinner } from '@/components/ui/Spinner'
import { ReactNode, Suspense } from 'react'
import { BurgerBtn } from './burger-btn/BurgerBtn'

export const AppShell = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<Spinner />}>
        <Sidebar />
      </Suspense>
      <BurgerBtn />
      <Backdrop />

      <main className="max-w-5xl w-full mx-auto px-4">{children}</main>
    </div>
  )
}
