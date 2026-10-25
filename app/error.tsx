'use client'

import { useEffect } from 'react'

export default function ErrorPage({
  error,
  retry
}: {
  error: unknown
  retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <h2 className="text-2xl font-semibold text-white">Что-то пошло не так</h2>
      <p className="text-white/70">Попробуйте ещё раз или вернитесь позже</p>
      <button
        onClick={() => retry()}
        className="rounded-xl px-5 py-3 font-medium text-white transition-colors border border-violet-500/30 bg-linear-to-r from-violet-600/20 to-blue-600/20 hover:bg-white/5"
      >
        Попробовать снова
      </button>
    </div>
  )
}
