import { type Quiz } from '@/app/quiz-creator/quiz-creator.schema'
import { AnswerOptions } from '../answer-options/AnswerOptions'

type QuestionCardProps = {
  quiz: Quiz
  activeQuestionIndex: number
  onClickAnswer: (answerKey: string) => void
  selectedOption: string | null
}

export const QuestionCard = ({
  quiz,
  activeQuestionIndex,
  selectedOption,
  onClickAnswer
}: QuestionCardProps) => {
  const currentQuestion = quiz.questions[activeQuestionIndex]

  if (!currentQuestion) return null

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-white/10 bg-white/4.5 p-5 shadow-lg shadow-black/10 backdrop-blur-sm transition-colors hover:border-violet-300/20 hover:bg-white/6.5 sm:p-6">
        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-violet-300/75">
          Вопрос {activeQuestionIndex + 1}
        </p>
        <h2 className="text-base font-medium leading-relaxed text-white/90 sm:text-lg">
          {currentQuestion.question}
        </h2>
      </section>

      <AnswerOptions
        question={currentQuestion}
        selectedOption={selectedOption}
        onClickAnswer={onClickAnswer}
      />
    </div>
  )
}
