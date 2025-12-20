"use client"
import Header from '@/components/layout/Header'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Modal from '@/components/ui/Modal'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Search, SparkleIcon, Sparkles, Terminal } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

const Console = () => {

    const [claim, setClaim] = useState<string>("")
    const [open, setOpen] = useState<boolean>(false)


  return (
    <main>
        <Header />
        <div className='max-w-4xl mx-auto flex flex-col justify-center min-h-screen'>
            <Link className='flex gap-2 w-fit items-center' href={"/"}><span><ArrowLeft size={15} /></span>Back to Home</Link>
            <div className='flex flex-col items-center gap-5'>
            <Badge className='py-2 px-3 text-sm bg-gray-50  flex gap-3 bg-blue-100 text-blue-600'><span className='text-blue-500'><Terminal size={15} /></span>Verification Console</Badge>
            <h1 className='text-5xl font-bold'>AI Verification Console </h1>
            <p className='max-w-md text-center text-muted-foreground'>Paste any article, claim, or URL below to analyze its credibility using our advanced AI verification system.</p>
            <Card className='w-full pt-0'>
                <CardHeader className='bg-gray-50 border-b-2 rounded-md flex gap-3 items-center px-2 py-3'>
                    <div className='flex gap-1'>
                        <div className="h-3 w-3 rounded-full bg-destructive/50" />
                        <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                        <div className="h-3 w-3 rounded-full bg-green-500/50" />
                    </div>
                    <p className='text-muted-foreground text-md'>verifi-console v1.0</p>
                </CardHeader>
                <CardContent>
                <Textarea value={claim} onChange={(e) => setClaim(e.target.value)} className='h-50' placeholder='Paste article, text, claim or URL here to verify...'>
                </Textarea>
                
                </CardContent>
                <CardFooter className='mx-auto gap-5'>
                <Button  className='py-5 flex gap-2 bg-blue-500 text-white'>
                       <span><Search />  </span>
                      Analyze Content
                    </Button>
                    <Button onClick={() => setOpen(true)} disabled={claim.length < 1} variant={"outline"} className='py-5 flex gap-2'>
                       <span><Sparkles />  </span>
                       Quick Fact Check 
                    </Button>
                </CardFooter>
            </Card>
            </div>
            
        </div>

        <Modal open={open} />
    </main>
  )
}

export default Console