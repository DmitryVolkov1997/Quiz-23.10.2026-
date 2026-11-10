import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { InputField } from '@/components/ui/InputField'
import { auth } from '@/config/firebase.config'
import { PAGES } from '@/config/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInWithEmailAndPassword } from 'firebase/auth'
import type { SetStateAction } from 'jotai'
import { useRouter } from 'next/navigation'
import type { Dispatch } from 'react'
import { useForm } from 'react-hook-form'
import { AuthCard } from './AuthCard'
import { loginSchema, type LoginValues } from './auth-login.schema'

type AuthLoginProps = {
  setAuthMode: Dispatch<SetStateAction<'login' | 'register'>>
}

export const AuthLogin = ({ setAuthMode }: AuthLoginProps) => {
  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitting, errors },
    setError
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })
  const router = useRouter()

  const onSubmit = async ({ email, password }: LoginValues) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password)
      console.log(res)
      reset()
      router.push(PAGES.HOME)
    } catch (e) {
      setError('root', {
        message: 'Не удалось войти в аккаунт. Проверьте email и пароль.'
      })
      console.error('Не удалось войти в аккаунт', e)
    }
  }

  return (
    <AuthCard>
      <div className="mb-7">
        <Heading as="h2">С возвращением</Heading>
        <div className="self-stretch justify-start text-slate-300 text-xs">
          Войдите, чтобы продолжить работу
        </div>
      </div>

      <form
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 mb-5">
          <label className="justify-start text-slate-300 text-xs font-medium">
            Email
            <InputField
              className="mt-1"
              type="email"
              placeholder="you@example.com"
              {...register('email')}
            />
            {errors['email'] && (
              <span className="text-sm text-red-300">
                {errors['email'].message}
              </span>
            )}
          </label>

          <label className="justify-start text-slate-300 text-xs font-medium">
            Пароль
            <InputField
              className="mt-1"
              type="password"
              placeholder="••••••••"
              {...register('password')}
            />
            {errors['password'] && (
              <span className="text-sm text-red-300">
                {errors['password'].message}
              </span>
            )}
          </label>
        </div>

        {errors.root?.message && (
          <span className="text-sm text-red-300">{errors.root.message}</span>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full mb-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Входим…' : 'Войти'}
        </Button>

        <div className="text-slate-400 text-xs font-normal">
          Нет аккаунта?
          <button
            type="button"
            className="text-violet-400 text-xs font-semibold hover:text-violet-500 transition-colors"
            onClick={() => setAuthMode('register')}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </AuthCard>
  )
}
