import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import React from 'react'
import { DialogHeader } from './dialog'
import { Button } from './button'
import Link from 'next/link'
import { Brain, Link2, Link2Icon, Link2Off, LinkIcon, LucideLink, Share, X } from 'lucide-react'


type Props = {
  open: boolean
}

const mockSources = [
  {
    title: "Reuters Fact Check",
    description: "Independent verification of claims and viral content"
  },
  {
    title: "Associated Press",
    description: "Primary news source with original reporting"
  },
  {
    title: "Snopes",
    description: "Fact-checking and debunking resource"
  }
]

const Modal = ({open}: Props) => {

  if (!open) return null

  return (
   <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
      <div  className="w-full max-w-2xl rounded-lg bg-white p-6">
        <div className='flex justify-between items-center pb-5'>
          <h1 className='text-2xl font-bold'>Fact Check Result</h1>
          <Button className='rounded-full' variant={"destructive"}><span><X /></span>Fake News</Button>
        </div>
        <div className='flex flex-col gap-2.5 pb-5'>
          <h1 className='text-base font-semibold flex items-center gap-2'><span><Brain className='text-blue-500' size={18}/></span>AI Analysis</h1>
          <div className='outline rounded-lg px-4 py-6 text-muted-foreground text-sm bg-gray-10'>
            <p>Our AI analysis detected several inconsistencies in this claim. The primary source cited does not exist, and the quoted statistics contradict official data from verified government agencies. Additionally, the article uses sensationalist language patterns commonly associated with misinformation campaigns. Cross-referencing with trusted databases revealed no supporting evidence for the central claim.</p>
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <h1 className='text-base flex items-center gap-2 font-semibold'><span className='text-blue-500'><Link2 /></span>Trusted Sources Used</h1>
          {mockSources.map((source) => (
            <Link href="/">
            <div className='outline rounded-lg px-4 py-4 flex items-center justify-between   bg-gray-10'>
              <div className='flex flex-col '>
              <h1 className='font-bold text-base'>{source.title}</h1>
              <p className='text-muted-foreground text-sm'>{source.description}</p>
                </div>

              <div>
                <LucideLink className='text-muted-foreground' size={18} />
              </div>
          </div>
          </Link>
          ))}
        </div>
      </div>
   </div>
  )
}

export default Modal