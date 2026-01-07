"use client"
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, SparklesIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Main = () => {
  return (
    <section className='max-w-7xl mx-auto flex flex-col gap-10 text-center items-center justify-center min-h-screen px-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className='py-2 px-5 text-sm bg-gray-50 outline text-muted-foreground flex gap-3'>
              <span> <SparklesIcon className='text-blue-500' size={15} /></span>AI-Powered Verification Technology
          </Badge>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className='font-bold text-7xl'>Fighting Misinformation</h1>
          <h1 className='font-bold text-7xl text-blue-500'>With Intelligence</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='max-w-lg text-lg text-muted-foreground'
        >
            <p className='text-center justify-center'>
            VerifiAI uses advanced machine learning to analyze, verify, and flag potentially misleading content in real-time, empowering users to make informed decisions.
            </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='flex gap-5'
        >
            <Link href="/console/verify">
                <Button className='py-6 px-8 text-base bg-blue-500 text-white flex items-center gap-2'>
                    Try the Console 
                    <ArrowRight className='w-4 h-4' />
                </Button>
            </Link>
            <Button className='py-6 px-8 text-base' variant={"outline"}>Learn More</Button>
        </motion.div>
    </section>
  )
}

export default Main