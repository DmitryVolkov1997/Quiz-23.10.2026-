import { Spinner } from '@/components/ui/Spinner'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import { QuizDetails } from '../_components/quiz-details/QuizDetails'

export const metadata: Metadata = {
  title: 'Title',
  description: 'Description'
}

async function QuizContent({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <QuizDetails id={id} />
}

export default function ActiveQuiz({
  params
}: {
  params: Promise<{ id: string }>
}) {
  return (
    <Suspense fallback={<Spinner />}>
      <QuizContent params={params} />
    </Suspense>
  )
}
