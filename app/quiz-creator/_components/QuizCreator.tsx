'use client'

import { Button } from '@/components/ui/Button'
import { InputField } from '@/components/ui/InputField'
import { SelectField } from '@/components/ui/SelectField'
import { quizzesAtom } from '@/store/quiz/quiz.atom'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAtom } from 'jotai'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { answerOptions } from '../answer-options'
import {
  Question,
  QuestionInput,
  questionSchema,
  quizSchema,
  SubjectInput,
  subjectSchema
} from '../quiz-creator.schema'
import { createEmptyQuestion, questionFields } from './quiz-creator.fields'

export const QuizCreator = () => {
  const [_, setQuizzes] = useAtom(quizzesAtom)
  const [questions, setQuestions] = useState<QuestionInput[]>([])

  const questionForm = useForm<QuestionInput, unknown, Question>({
    resolver: zodResolver(questionSchema),
    defaultValues: createEmptyQuestion()
  })

  const quizForm = useForm<SubjectInput>({
    resolver: zodResolver(subjectSchema),
    defaultValues: {
      subject: ''
    },
    mode: 'onChange'
  })

  const isQuizReadyForCreation =
    quizForm.formState.isValid && questions.length > 0

  const createQuestion = questionForm.handleSubmit(question => {
    setQuestions(oldQuestions => [...oldQuestions, question])
    questionForm.reset(createEmptyQuestion())
  })

  const createQuiz = quizForm.handleSubmit(({ subject }) => {
    const result = quizSchema.safeParse({ subject, questions })

    if (!result.success) return

    setQuizzes(oldQuizzes => [...oldQuizzes, result.data])
    setQuestions([])
    quizForm.reset({ subject: '' })
    questionForm.reset(createEmptyQuestion())
  })

  return (
    <section className="max-w-2xl w-full mx-auto px-10 pt-9 pb-7 bg-gray-900/80 rounded-3xl outline-1 -outline-offset-1 outline-white/20 flex flex-col gap-5">
      <h1 className="text-2xl font-semibold text-white">Создание теста</h1>

      <div
        className="text-sm text-white/70"
        aria-live="polite"
      >
        <p>Добавлено вопросов: {questions.length}</p>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={createQuiz}
      >
        <label className="flex flex-col gap-2 text-sm text-white/80">
          Название предмета
          <InputField
            {...quizForm.register('subject')}
            aria-invalid={Boolean(quizForm.formState.errors['subject'])}
          />
          {quizForm.formState.errors['subject'] && (
            <span className="text-sm text-red-300">
              {quizForm.formState.errors['subject']?.message}
            </span>
          )}
        </label>

        {questionFields.map(({ name, label }) => (
          <label
            key={name}
            className="flex flex-col gap-2 text-sm text-white/80"
          >
            {label}
            <InputField
              {...questionForm.register(name)}
              placeholder={label}
              aria-invalid={Boolean(questionForm.formState.errors[name])}
            />
            {questionForm.formState.errors[name] && (
              <span className="text-sm text-red-300">
                {questionForm.formState.errors[name]?.message}
              </span>
            )}
          </label>
        ))}

        <label className="flex flex-col gap-2 text-sm text-white/80">
          Правильный ответ
          <SelectField
            {...questionForm.register('correctOption')}
            aria-invalid={Boolean(
              questionForm.formState.errors['correctOption']
            )}
          >
            {answerOptions.map(({ value, label }) => (
              <option
                key={value}
                value={value}
              >
                {label}
              </option>
            ))}
          </SelectField>
          {questionForm.formState.errors.correctOption && (
            <span className="text-sm text-red-300">
              {questionForm.formState.errors.correctOption.message}
            </span>
          )}
        </label>

        <div className="flex items-center gap-x-4">
          <Button
            type="button"
            onClick={createQuestion}
            variant={questionForm.formState.isValid ? 'success' : 'dark'}
          >
            Добавить вопрос
          </Button>

          <Button
            type="submit"
            disabled={questions.length === 0 || quizForm.formState.isSubmitting}
            variant={
              isQuizReadyForCreation && !quizForm.formState.isSubmitting
                ? 'primary'
                : 'dark'
            }
          >
            Создать тест
          </Button>
        </div>
      </form>
    </section>
  )
}
