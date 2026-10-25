'use client'
import { useEffect } from 'react'

export const useBodyScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll')
    }

    return () => document.body.classList.remove('no-scroll')
  }, [isOpen])
}
