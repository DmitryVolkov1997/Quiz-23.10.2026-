import { Question } from '@/app/quiz-creator/quiz-creator.schema'

type AnswerOptionsProps = {
  question: Question
  selectedOption: string | null
  onClickAnswer: (answerKey: string) => void
}

const options = [
  { key: 'optionA', label: 'А' },
  { key: 'optionB', label: 'Б' },
  { key: 'optionC', label: 'В' },
  { key: 'optionD', label: 'Г' }
] as const

export const AnswerOptions = ({
  question,
  selectedOption,
  onClickAnswer
}: AnswerOptionsProps) => {
  return (
    <div className="mt-6 space-y-3">
      {options.map(({ key, label }) => {
        const isSelected = selectedOption === key
        const isCorrect = isSelected && question.correctOption === key

        return (
          <button
            key={key}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onClickAnswer(key)}
            className={`w-full rounded-xl border p-4 text-left transition ${
              isCorrect
                ? 'border-green-400 bg-green-500/15'
                : isSelected
                  ? 'border-red-400 bg-red-500/15'
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
            }`}
          >
            <span className="mr-3 text-violet-300">{label}.</span>
            {question[key]}
          </button>
        )
      })}
    </div>
  )
}
