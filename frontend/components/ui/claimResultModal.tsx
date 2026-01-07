import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './dialog'
import { Button } from './button'
import { ClaimData } from '@/app/types/claimData'
import { Calendar, History, Timer } from 'lucide-react'

interface ClaimResultModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  claim: ClaimData
}

const claimResultModal: React.FC<ClaimResultModalProps> = ({ open, onOpenChange, claim }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl ">
            <DialogHeader className='py-5'>
               <div className='flex items-center justify-between'>
               <div className='flex items-center gap-2'>
                <History size={24} className='text-blue-500' />
                 <h1 className='font-semibold text-lg'>Fact Check Details</h1>
               </div>
               <div>
                <Button className='rounded-xl'>{claim?.result?.verdict} News</Button>
               </div>
               </div>
            </DialogHeader>
            <div className='flex gap-8 flex-col'>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>Extracted Claim</p>
                    <p className='bg-gray-50 rounded-xl p-2'>COVID-19 vaccines contain microchips for tracking</p>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>Source URL</p>
                    <p className=' p-2 text-blue-600'>https://twitter.com/user/status/123456789</p>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>AI Analysis</p>
                    <p className='p-2'>This claim has been thoroughly debunked by multiple health organizations including WHO and CDC. No vaccines contain microchips or tracking devices.</p>
                </div>

                <div className='border-t'>
               <div className='flex items-center gap-2 p-3 '>
                <Calendar size={14} />
                <p className='text-sm text-muted-foreground'>Verified on Jan 15, 2024 at 10:30 AM</p>
               </div>
            </div>

            </div>
            
           
        </DialogContent>
        
    </Dialog>
  )
}

export default claimResultModal