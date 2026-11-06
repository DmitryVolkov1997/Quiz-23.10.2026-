import { QuizListItem } from '@/app/quiz-creator/quiz-creator.schema'
import { atom } from 'jotai'

export const quizzesAtom = atom<QuizListItem[]>([])
export const activeQuestionIndexAtom = atom<number>(0)
