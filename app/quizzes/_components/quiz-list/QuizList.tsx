'use client'
import { Spinner } from '@/components/ui/Spinner'
import { PAGES } from '@/config/routes'
import Link from 'next/link'
import { useQuizzes } from './useQuizzes'

type QuizListProps = {}

export const QuizList = ({}: QuizListProps) => {
  const { quizzes, isLoading, error } = useQuizzes()

  if (isLoading) {
    return <Spinner className="my-8 flex w-full" />
  }

  if (error) {
    return (
      <p
        role="alert"
        className="mx-auto my-8 max-w-xl rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
      >
        Не удалось загрузить тесты: {error}
      </p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {quizzes.map(quiz => (
        <Link
          key={quiz.id}
          href={PAGES.quiz(quiz.id)}
          className="
    group flex items-center justify-between gap-4
    rounded-2xl border border-white/10 bg-gray-900/60 p-5
    text-white shadow-lg shadow-black/10
    transition-all duration-200
    hover:-translate-y-0.5 hover:border-violet-400/40
    hover:bg-gray-900/80 hover:shadow-violet-950/30
    focus-visible:outline-none focus-visible:ring-2
    focus-visible:ring-violet-400/70
  "
        >
          <div>
            <h2 className="font-semibold transition-colors group-hover:text-violet-200">
              {quiz.subject}
            </h2>
            <p className="mt-1 text-sm text-white/50">
              Вопросов: {quiz.questions.length}
            </p>
          </div>

          <span
            aria-hidden="true"
            className="text-xl text-white/40 transition-all group-hover:translate-x-1 group-hover:text-violet-300"
          >
            →
          </span>
        </Link>
      ))}
    </div>
  )
}
