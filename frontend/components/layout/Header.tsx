import React from 'react'
import { Button } from '../ui/button'

const Header = () => {

const navigations = [
    "Home", "Problem", "Solution", "Architecture", "Impact"
]

  return (
    <nav className=' border-b py-3.5 px-10'>
        <main className='flex justify-between items-center max-w-7xl mx-auto'>
        <div>
             <h1 className='font-bold text-2xl'>VerifiAI</h1>
        </div>
        <div className='flex gap-10 text-sm text-black/70'>
            {navigations.map((navigation) => 
            <p>{navigation}</p>
            )}
        </div>
        <div>
            <Button>
                Open Console
            </Button>
        </div>
    </main>
    </nav>
  )
}

export default Header