import { Button } from '@/components/ui/Button'
import { Heading } from '@/components/ui/Heading'
import { InputField } from '@/components/ui/InputField'
import { auth } from '@/config/firebase.config'
import { zodResolver } from '@hookform/resolvers/zod'
import { FirebaseError } from 'firebase/app'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import type { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { registerSchema, type RegisterValues } from './auth-register.schema'
import { AuthCard } from './AuthCard'

type AuthRegisterProps = {
  setAuthMode: Dispatch<SetStateAction<'login' | 'register'>>
}

export const AuthRegister = ({ setAuthMode }: AuthRegisterProps) => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { isSubmitting, errors },
    reset
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async ({ email, password }: RegisterValues) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      console.log(res)
      reset()
    } catch (e) {
      console.error('Не удалось создать аккаунт', e)
      if (
        e instanceof FirebaseError &&
        e.code === 'auth/email-already-in-use'
      ) {
        setError('email', {
          type: 'server',
          message: 'Этот email уже зарегистрирован. Войдите в аккаунт.'
        })

        return
      }
      setError('root', {
        message: 'Не удалось создать аккаунт. Проверьте email и пароль.'
      })
    }
  }

  return (
    <AuthCard>
      <div className="mb-7">
        <Heading as="h2">Создайте аккаунт</Heading>
        <div className="self-stretch justify-start text-slate-300 text-xs">
          Начните пользоваться NOVA прямо сейчас
        </div>
      </div>

      <form
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4 mb-5">
          <label className="text-slate-300 text-xs font-medium">
            Email
            <InputField
              className="mt-1"
              type="email"
              placeholder="you@example.com"
              aria-invalid={Boolean(errors['email'])}
              {...register('email')}
            />
            {errors['email'] && (
              <span className="text-sm text-red-300">
                {errors['email'].message}
              </span>
            )}
          </label>

          <label className="text-slate-300 text-xs font-medium">
            Пароль
            <InputField
              className="mt-1"
              type="password"
              placeholder="••••••••"
              aria-invalid={Boolean(errors['password'])}
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
          {isSubmitting ? 'Создаём аккаунт…' : 'Создать аккаунт'}
        </Button>

        <div className="text-slate-400 text-xs font-normal">
          Уже есть аккаунт?
          <button
            type="button"
            className="text-violet-400 text-xs font-semibold hover:text-violet-500 transition-colors"
            onClick={() => setAuthMode('login')}
          >
            Войти
          </button>
        </div>
      </form>
    </AuthCard>
  )
}
