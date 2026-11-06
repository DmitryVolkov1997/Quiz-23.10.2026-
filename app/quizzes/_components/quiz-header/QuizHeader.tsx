import { Quiz } from '@/app/quiz-creator/quiz-creator.schema'

type QuizHeaderProps = {
  quiz: Quiz | null
}

export const QuizHeader = ({ quiz }: QuizHeaderProps) => {
  return (
    <header className="mb-8 border-b border-white/10 pb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-violet-300/80">
        Проверим знания
      </p>
      <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {quiz?.subject ?? 'Тест'}
      </h1>
      <p className="mt-2 text-sm text-white/50">
        Вопросов: {quiz?.questions.length ?? 0}
      </p>
    </header>
  )
}
