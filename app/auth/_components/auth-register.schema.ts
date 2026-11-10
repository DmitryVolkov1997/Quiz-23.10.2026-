import z from 'zod'

export const registerSchema = z.object({
  email: z.string().email('Введите корректный email'),
  password: z.string().min(6, 'Пароль должен быть не короче 6 символов')
})

export type RegisterValues = z.infer<typeof registerSchema>
