import { auth } from '@/config/firebase.config'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    return onAuthStateChanged(auth, user => {
      setUser(user)
      setIsLoading(false)
    })
  }, [])

  return {
    isLoading,
    user
  }
}
