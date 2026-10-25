'use client'
import { sidebarOpenAtom } from '@/store/sidebar/sidebar.atom'
import cn from 'clsx'
import { useAtom } from 'jotai'

export const Backdrop = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom)

  return (
    <div
      className={cn(
        'fixed inset-0 z-30 bg-black/80 transition-opacity duration-300',
        isOpen
          ? 'pointer-events-auto opacity-100'
          : 'pointer-events-none opacity-0'
      )}
      aria-hidden="true"
      onClick={() => setIsOpen(false)}
    />
  )
}
