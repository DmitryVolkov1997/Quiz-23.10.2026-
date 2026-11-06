import { QuizListItem } from '@/app/quiz-creator/quiz-creator.schema'
import { db } from '@/config/firebase.config'
import { quizzesAtom } from '@/store/quiz/quiz.atom'
import { collection, getDocs } from 'firebase/firestore'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useAtom(quizzesAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | string>(null)

  useEffect(() => {
    const loadQuizzes = async () => {
      setIsLoading(true)

      try {
        const result = await getDocs(collection(db, 'quizzes'))
        setQuizzes(
          result.docs.map(
            doc => ({ id: doc.id, ...doc.data() }) as QuizListItem
          )
        )
      } catch (e) {
        console.error('Не удалось загрузить список тестов!', e)
        setError(e instanceof Error ? e.message : 'Не удалось загрузить тесты')
      } finally {
        setIsLoading(false)
      }
    }

    loadQuizzes()
  }, [])

  return { quizzes, isLoading, error }
}
