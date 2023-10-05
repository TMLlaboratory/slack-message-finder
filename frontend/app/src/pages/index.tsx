import { Inter } from 'next/font/google'
import React from 'react'
import Header from '../components/common/Header'
import Channel from './Channel'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div>
        <Header />
      </div>
      <div>
        <Channel />
      </div>
    </main>
  )
}
