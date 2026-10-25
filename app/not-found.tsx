import { PAGES } from '@/config/routes'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 py-32 text-center">
      <h2 className="text-2xl font-semibold text-white">
        404 — страница не найдена
      </h2>
      <p className="text-white/70">
        Такой страницы не существует или она была удалена
      </p>
      <Link
        href={PAGES.HOME}
        className="rounded-xl px-5 py-3 font-medium text-white transition-colors border border-violet-500/30 bg-linear-to-r from-violet-600/20 to-blue-600/20 hover:bg-white/5"
      >
        На главную
      </Link>
    </div>
  )
}
