import type { Quiz } from '@/app/quiz-creator/quiz-creator.schema'
import { Button } from '@/components/ui/Button'
import { Award, Check, X } from 'lucide-react'

type QuizFinishedProps = {
  quiz: Quiz | null
  answers: Record<number, string>
  onRestart: () => void
  onGoToList: () => void
}

const options = [
  { key: 'optionA', label: 'А' },
  { key: 'optionB', label: 'Б' },
  { key: 'optionC', label: 'В' },
  { key: 'optionD', label: 'Г' }
] as const

export const QuizFinished = ({
  quiz,
  answers,
  onRestart,
  onGoToList
}: QuizFinishedProps) => {
  const questions = quiz?.questions ?? []
  const correctCount = questions.reduce(
    (total, question, index) =>
      total + Number(question.correctOption === answers[index]),
    0
  )
  const percentage = questions.length
    ? Math.round((correctCount / questions.length) * 100)
    : 0

  return (
    <section className="space-y-8">
      <header className="relative overflow-hidden rounded-3xl border border-violet-300/15 bg-white/4 p-6 sm:p-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-16 size-56 rounded-full bg-violet-500/15 blur-3xl"
        />
        <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-400/10 text-violet-200">
            <Award
              aria-hidden="true"
              className="size-8"
            />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-300/80">
              Тест завершён
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {quiz?.subject ?? 'Результат'}
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Правильных ответов: {correctCount} из {questions.length}
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-3 text-center">
            <p className="text-3xl font-semibold tabular-nums text-white">
              {percentage}%
            </p>
            <p className="mt-1 text-xs text-white/45">результат</p>
          </div>
        </div>
        <div className="relative mt-6 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-linear-to-r from-violet-500 to-blue-400 transition-[width]"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </header>

      <div>
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Разбор
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              Ваши ответы
            </h3>
          </div>
          <p className="text-sm text-white/45">{questions.length} вопросов</p>
        </div>

        <ol className="space-y-3">
          {questions.map((question, index) => {
            const selectedAnswer = answers[index]
            const isCorrect = question.correctOption === selectedAnswer
            const selectedText = options.find(
              option => option.key === selectedAnswer
            )
            const correctText = options.find(
              option => option.key === question.correctOption
            )

            return (
              <li
                key={index}
                className={`rounded-2xl border p-5 sm:p-6 ${isCorrect ? 'border-emerald-400/20 bg-emerald-400/4.5' : 'border-rose-400/20 bg-rose-400/4.5'}`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg ${isCorrect ? 'bg-emerald-400/10 text-emerald-300' : 'bg-rose-400/10 text-rose-300'}`}
                  >
                    {isCorrect ? (
                      <Check
                        aria-label="Правильно"
                        className="size-4"
                      />
                    ) : (
                      <X
                        aria-label="Неправильно"
                        className="size-4"
                      />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                      Вопрос {index + 1}
                    </p>
                    <p className="mt-2 font-medium leading-relaxed text-white/90">
                      {question.question}
                    </p>
                    <div className="mt-4 space-y-2 text-sm">
                      <p
                        className={
                          isCorrect ? 'text-emerald-200/90' : 'text-rose-200/90'
                        }
                      >
                        Ваш ответ:{' '}
                        {selectedText
                          ? `${selectedText.label}. ${question[selectedText.key]}`
                          : 'Нет ответа'}
                      </p>
                      {!isCorrect && (
                        <p className="text-emerald-200/90">
                          Правильный ответ:{' '}
                          {correctText
                            ? `${correctText.label}. ${question[correctText.key]}`
                            : '—'}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ol>

        <div className="flex items-center justify-end gap-x-3 mt-6">
          <Button onClick={onGoToList}>Перейти в список тестов</Button>
          <Button
            variant="success"
            onClick={onRestart}
          >
            Повторить
          </Button>
        </div>
      </div>
    </section>
  )
}
