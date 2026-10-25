'use client'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { sidebarOpenAtom } from '@/store/sidebar/sidebar.atom'
import cn from 'clsx'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { links } from './links.data'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom)
  const pathname = usePathname()
  useEscapeKey()
  useBodyScrollLock(isOpen)

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])

  return (
    <aside
      id="app-sidebar"
      aria-label="Основная навигация"
      aria-hidden={!isOpen}
      inert={!isOpen}
      className={cn(
        'fixed left-0 top-0 z-40 h-svh w-(--sidebar-width) flex flex-col border-r border-white/10 bg-gray-900/60 p-4 backdrop-blur-xl backdrop-saturate-180 shadow-2xl shadow-black/40 transition-all duration-300',
        isOpen ? 'translate-x-0' : '-translate-x-(--sidebar-width)'
      )}
    >
      <nav>
        <ul className="flex flex-col gap-3">
          {links.map(link => {
            const isActiveLink =
              link.to === '/'
                ? pathname === '/'
                : pathname === link.to || pathname.startsWith(`${link.to}/`)

            return (
              <li key={link.to}>
                <Link
                  href={link.to}
                  aria-current={isActiveLink ? 'page' : undefined}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-white',
                    isActiveLink &&
                      `border border-violet-500/30 bg-linear-to-r from-violet-600/20 to-blue-600/20 text-white shadow-lg shadow-violet-500/10`
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
