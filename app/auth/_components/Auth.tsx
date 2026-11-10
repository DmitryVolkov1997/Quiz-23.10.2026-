'use client'
import { useState } from 'react'
import { AuthLogin } from './AuthLogin'
import { AuthRegister } from './AuthRegister'

export const Auth = () => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register')

  return (
    <div className="flex justify-center">
      {authMode === 'login' ? (
        <AuthLogin setAuthMode={setAuthMode} />
      ) : (
        <AuthRegister setAuthMode={setAuthMode} />
      )}
    </div>
  )
}
