import { quizSchema, type Quiz } from '@/app/quiz-creator/quiz-creator.schema'
import { db } from '@/config/firebase.config'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const useDetails = (id: string) => {
  const [isLoading, setIsLoading] = useState(Boolean(id))
  const [error, setError] = useState<string | null>('')
  const [quiz, setQuiz] = useState<Quiz | null>(null)

  useEffect(() => {
    if (!id) {
      setIsLoading(false)
      setError('ID теста не указан')
      return
    }

    const getQuizById = async () => {
      setQuiz(null)
      setError('')
      setIsLoading(true)

      try {
        const result = await getDoc(doc(db, 'quizzes', id))

        if (!result.exists()) {
          setError('Тест не найден')
          return
        }

        const parsed = quizSchema.safeParse(result.data())
        if (!parsed.success) {
          console.error('Ошибка валидации теста:', parsed.error)
          setError('Некорректная структура теста')
          return
        }
        setQuiz(parsed.data)
      } catch (e) {
        console.error('Не удалось загрузить тест', e)
        setError(e instanceof Error ? e.message : 'Не удалось загрузить тест')
      } finally {
        setIsLoading(false)
      }
    }

    getQuizById()
  }, [id])

  return { quiz, isLoading, error }
}
