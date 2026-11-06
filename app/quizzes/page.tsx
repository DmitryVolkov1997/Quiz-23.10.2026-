import type { Metadata } from 'next'
import { QuizList } from './_components/quiz-list/QuizList'

export const metadata: Metadata = {
  title: 'Список тестов',
  description: 'Список доступных тестов'
}

export default function QuizzesPage() {
  return (
    <div>
      <QuizList />
    </div>
  )
}
