import type { Metadata } from 'next'
import { Auth } from './_components/Auth'

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Авторизация'
}

export default function HomePage() {
  return <Auth />
}
