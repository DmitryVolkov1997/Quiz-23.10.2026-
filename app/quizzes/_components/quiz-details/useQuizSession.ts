import type { Quiz } from '@/app/quiz-creator/quiz-creator.schema'
import { PAGES } from '@/config/routes'
import { activeQuestionIndexAtom } from '@/store/quiz/quiz.atom'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export const useQuizSession = (id: string, quiz: Quiz | null) => {
  const [activeQuestionIndex, setActiveQuestionIndex] = useAtom(
    activeQuestionIndexAtom
  )
  const [isFinished, setIsFinished] = useState(false)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const router = useRouter()
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)

    setActiveQuestionIndex(0)
    setAnswers({})
    setIsFinished(false)
  }, [id, setActiveQuestionIndex])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const onClickRestart = () => {
    setAnswers({})
    setIsFinished(false)
    setActiveQuestionIndex(0)
  }

  const onClickToList = () => {
    router.push(PAGES.QUIZZES)
  }

  const onClickAnswer = (answerKey: string) => {
    if (!quiz) return

    if (answers[activeQuestionIndex] === answerKey) return

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setAnswers(prevState => ({
      ...prevState,
      [activeQuestionIndex]: answerKey
    }))

    timerRef.current = setTimeout(() => {
      if (activeQuestionIndex < quiz.questions.length - 1) {
        setActiveQuestionIndex(index => index + 1)
      } else {
        setIsFinished(true)
      }
    }, 300)
  }

  return {
    activeQuestionIndex,
    isFinished,
    answers,
    onClickRestart,
    onClickToList,
    onClickAnswer
  }
}
