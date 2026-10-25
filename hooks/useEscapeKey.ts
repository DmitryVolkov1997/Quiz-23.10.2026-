import { sidebarOpenAtom } from '@/store/sidebar/sidebar.atom'
import { useAtom } from 'jotai'
import { useEffect } from 'react'

export const useEscapeKey = () => {
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom)

  useEffect(() => {
    if (!isOpen) return

    const onClose = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', onClose)

    return () => document.removeEventListener('keydown', onClose)
  }, [isOpen, setIsOpen])
}
