'use client'
import { sidebarOpenAtom } from '@/store/sidebar/sidebar.atom'
import cn from 'clsx'
import { useAtom } from 'jotai'

const inlineStyles = {
  background: `
          radial-gradient(circle at top left, rgba(168, 85, 247, 0.15), transparent 50%),
          radial-gradient(circle at bottom right, rgba(59, 130, 246, 0.15), transparent 50%),
          #374151
        `
}

export const BurgerBtn = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom)

  return (
    <button
      onClick={() => setIsOpen(prev => !prev)}
      style={inlineStyles}
      className={cn(
        'relative z-40 top-5 flex h-11 w-11 flex-col items-center justify-center rounded-xl focus:outline-none transition-all duration-300',
        'backdrop-blur-md border border-gray-500/50 shadow-md shadow-black/5',
        'hover:border-gray-400 hover:scale-105 active:scale-95',

        isOpen
          ? 'translate-x-[calc(var(--sidebar-width)+10px)]'
          : 'translate-x-5'
      )}
      aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
      aria-controls="app-sidebar"
      aria-expanded={isOpen}
    >
      <div className="flex w-5 flex-col gap-1">
        <span
          className={`h-0.5 w-full bg-white rounded-full transition-transform duration-300 ease-in-out ${
            isOpen ? 'translate-y-1.5 rotate-45' : ''
          }`}
        />
        <span
          className={`h-0.5 w-full bg-white rounded-full transition-opacity duration-300 ease-in-out ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`h-0.5 w-full bg-white rounded-full transition-transform duration-300 ease-in-out ${
            isOpen ? '-translate-y-1.5 -rotate-45' : ''
          }`}
        />
      </div>
    </button>
  )
}
