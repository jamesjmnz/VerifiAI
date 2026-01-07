import Header from '@/components/layout/Header'
import Main from '@/components/sections/Main'
import HowItWorks from '@/components/sections/HowItWorks'
import AdvancedTechniques from '@/components/sections/AdvancedTechniques'
import UseCases from '@/components/sections/UseCases'
import Features from '@/components/sections/Features'
import React from 'react'

const Home = () => {
  return (
    <div className='min-h-screen'>
      <Header />
      <main>
        <Main />
        <HowItWorks />
        <AdvancedTechniques />
        <UseCases />
        <Features />
      </main>
    </div>
  )
}

export default Home