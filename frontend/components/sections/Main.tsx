import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, SparklesIcon } from 'lucide-react'
import { Badge } from '../ui/badge'

const Main = () => {
  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-10 text-center items-center justify-center min-h-screen'>
        <Badge className='py-2 px-5 text-sm bg-gray-50 outline text-muted-foreground flex gap-3'>
            <span> <SparklesIcon className='text-blue-500' size={15} /></span>AI-Powered Verification Technology
        </Badge>
        <div>
            <h1 className='font-bold text-7xl'>Fighting Misinformation</h1>
            <h1 className='font-bold text-7xl text-blue-500'>With Intelligence</h1>
        </div>
        <div className='max-w-lg text-lg text-muted-foreground'>
            <p className='text-center justify-center'>
            VerifiAI uses advanced machine learning to analyze, verify, and flag potentially misleading content in real-time, empowering users to make informed decisions.
            </p>
        </div>
        <div className='flex gap-5'>
            <Button className='py-6 px-8 text-base bg-blue-500 text-white'>Try the Console <span><ArrowRight /></span></Button>
            <Button className='py-6 px-8 text-base' variant={"outline"}>Learn More</Button>
        </div>
    </div>
  )
}

export default Main