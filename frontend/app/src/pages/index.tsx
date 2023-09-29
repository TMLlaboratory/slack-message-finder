import { Inter } from 'next/font/google'
import React from 'react'
import Header from '../components/common/Header'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <Header />
      <div>
        <p className="text-blue-500">aaaa</p>
      </div>
    </main>
  )
}
