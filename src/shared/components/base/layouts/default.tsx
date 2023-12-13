import { Head } from './head'
import React, { ReactNode } from 'react'
import Navbar from '@components/base/navbar/Navbar'

export default function DefaultLayout ({
  children
}: {children: ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow">
        {children}
      </main>
    </div>
  )
}
