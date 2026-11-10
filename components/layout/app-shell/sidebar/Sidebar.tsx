'use client'
import { auth } from '@/config/firebase.config'
import { PAGES } from '@/config/routes'
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock'
import { useEscapeKey } from '@/hooks/useEscapeKey'
import { useUser } from '@/hooks/useUser'
import { sidebarOpenAtom } from '@/store/sidebar/sidebar.atom'
import cn from 'clsx'
import { signOut } from 'firebase/auth'
import { useAtom } from 'jotai'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { links } from './links.data'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom)
  const pathname = usePathname()
  useEscapeKey()
  useBodyScrollLock(isOpen)
  const { isLoading, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname, setIsOpen])

  const handleSignOut = async () => {
    await signOut(auth)
    router.replace(PAGES.HOME)
  }

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
      {!isLoading && user && (
        <div className="mb-6 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-full border border-violet-300/30 bg-linear-to-br from-violet-500/30 to-blue-500/20 font-semibold text-violet-100">
            {user.email?.[0]?.toUpperCase() ?? '?'}
          </div>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">
              {user.displayName || 'Пользователь'}
            </p>
            <p
              className="truncate text-xs text-white/50"
              title={user.email ?? ''}
            >
              {user.email}
            </p>
          </div>

          <button
            type="button"
            className="rounded-lg px-2 py-1.5 text-xs text-white/50 transition hover:bg-white/10 hover:text-white"
            onClick={handleSignOut}
          >
            Выйти
          </button>
        </div>
      )}
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
