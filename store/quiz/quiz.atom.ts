import { Quiz } from '@/app/quiz-creator/quiz-creator.schema'
import { atom } from 'jotai'

export const quizzesAtom = atom<Quiz[]>([])
