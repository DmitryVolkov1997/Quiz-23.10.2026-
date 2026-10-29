import { QuestionInput } from '../quiz-creator.schema'

export const questionFields = [
  { name: 'question', label: 'Вопрос' },
  { name: 'optionA', label: 'Ответ А' },
  { name: 'optionB', label: 'Ответ B' },
  { name: 'optionC', label: 'Ответ C' },
  { name: 'optionD', label: 'Ответ D' }
] as const

export const createEmptyQuestion = (): QuestionInput => {
  return {
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctOption: ''
  }
}
