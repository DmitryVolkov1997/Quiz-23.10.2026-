class PagesRoutes {
  readonly HOME = '/'
  readonly AUTH = '/auth'
  readonly QUIZ_CREATOR = '/quiz-creator'
  readonly QUIZZES = '/quizzes'
  readonly quiz = (id: string) => `${this.QUIZZES}/${id}`
}

export const PAGES = new PagesRoutes()
