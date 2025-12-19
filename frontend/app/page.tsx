import Header from '@/components/layout/Header'
import Main from '@/components/sections/Main'
import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <main>
        <Main />
      </main>
    </div>
  )
}

export default Home