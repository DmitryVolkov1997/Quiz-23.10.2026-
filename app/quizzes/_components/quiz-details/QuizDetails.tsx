'use client'
import { Spinner } from '@/components/ui/Spinner'
import { QuestionCard } from '../question-card/QuestionCard'
import { QuizFinished } from '../quiz-finished/QuizFinished'
import { QuizHeader } from '../quiz-header/QuizHeader'
import { useDetails } from './useDetails'
import { useQuizSession } from './useQuizSession'

type QuizDetailsProps = {
  id: string
}

export const QuizDetails = ({ id }: QuizDetailsProps) => {
  const { quiz, isLoading, error } = useDetails(id)
  const {
    onClickRestart,
    onClickToList,
    onClickAnswer,
    answers,
    activeQuestionIndex,
    isFinished
  } = useQuizSession(id, quiz)

  if (isLoading) {
    return <Spinner className="my-8 flex w-full" />
  }

  if (error || !quiz) {
    return (
      <p
        role="alert"
        className="mx-auto my-8 max-w-xl rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200"
      >
        Не удалось загрузить тесты: {error || ''}
      </p>
    )
  }

  return (
    <main className="relative isolate mx-auto my-8 max-w-4xl overflow-hidden rounded-4xl border border-white/10 bg-[#0b0b16] px-5 py-8 text-white shadow-2xl shadow-violet-950/30 sm:px-9 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,rgba(124,58,237,0.25),transparent_45%),radial-gradient(ellipse_at_90%_75%,rgba(37,99,235,0.17),transparent_42%),linear-gradient(145deg,#111020_0%,#0b0b16_58%,#0b1020_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.12] bg-[linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] bg-size-[36px_36px] mask-[linear-gradient(to_bottom,black,transparent_80%)]"
      />

      {isFinished ? (
        <QuizFinished
          quiz={quiz}
          answers={answers}
          onRestart={onClickRestart}
          onGoToList={onClickToList}
        />
      ) : (
        <>
          <QuizHeader quiz={quiz} />
          <QuestionCard
            quiz={quiz}
            activeQuestionIndex={activeQuestionIndex}
            onClickAnswer={onClickAnswer}
            selectedOption={answers[activeQuestionIndex] || null}
          />
        </>
      )}
    </main>
  )
}
