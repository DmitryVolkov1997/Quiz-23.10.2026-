import type { Metadata } from 'next'
import { QuizCreator } from './_components/QuizCreator'

export const metadata: Metadata = {
  title: 'Создать тест',
  description: 'Форма создания тестов'
}

export default function QuizCreatorPage() {
  return <QuizCreator />
}
