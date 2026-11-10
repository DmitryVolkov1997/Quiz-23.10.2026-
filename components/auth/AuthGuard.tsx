'use client'
import { auth } from '@/config/firebase.config'
import { PAGES } from '@/config/routes'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState, type ReactNode } from 'react'
import { Spinner } from '../ui/Spinner'

type AuthGuardProps = {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const [status, setStatus] = useState<'loading' | 'denied' | 'allowed'>(
    'loading'
  )
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      if (user) {
        setStatus('allowed')
      } else {
        setStatus('denied')
        router.replace(PAGES.HOME)
      }
    })
  }, [router])

  if (status === 'loading') return <Spinner className="my-8 flex w-full" />
  if (status === 'denied') return null

  return children
}
