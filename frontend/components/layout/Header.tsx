"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { authClient } from '@/lib/auth-client'
import { sessionType } from '@/app/types/session'
import Image from 'next/image'


const Header = () => {

const [session, setSession] = useState<any | null>(null)

const navigations = [
    "Home", "Problem", "Solution", "Architecture", "Impact"
]

useEffect(() => {
    authClient.getSession().then((data) => {
        setSession(data.data ?? null)
    })
}, [])

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
        <div className='flex gap-5 items-center'>
            <Link href={"/console/verify"}>
            <Button>
                Open Console
            </Button>
            </Link>
            {session && <Image height={500} width={500} className='h-8 w-8 rounded-full' alt='profile picture' src={session?.user?.image} />}
        </div>
    </main>
    </nav>
  )
}

export default Header