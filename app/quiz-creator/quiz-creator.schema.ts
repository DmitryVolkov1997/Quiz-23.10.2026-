import z from 'zod'

const correctOptionsSchema = z
  .union([z.literal(''), z.enum(['optionA', 'optionB', 'optionC', 'optionD'])])
  .refine(value => value !== '', {
    error: 'Выберите правильный ответ'
  })

export const questionSchema = z.object({
  question: z.string().trim().min(1, 'Введите вопрос'),
  optionA: z.string().trim().min(1, 'Введите ответ А'),
  optionB: z.string().trim().min(1, 'Введите ответ B'),
  optionC: z.string().trim().min(1, 'Введите ответ C'),
  optionD: z.string().trim().min(1, 'Введите ответ D'),
  correctOption: correctOptionsSchema
})

export const subjectSchema = z.object({
  subject: z.string().trim().min(1, 'Введите название предмета')
})

export const quizSchema = subjectSchema.extend({
  questions: z.array(questionSchema).min(1, 'Добавьте хотя бы один вопрос')
})

export type QuestionInput = z.input<typeof questionSchema>
export type Question = z.output<typeof questionSchema>
export type SubjectInput = z.input<typeof subjectSchema>
export type Quiz = z.infer<typeof quizSchema>
