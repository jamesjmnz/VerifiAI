import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader } from './dialog'
import { Button } from './button'
import { ClaimData } from '@/app/types/claimData'
import { Calendar, History, Timer, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface ClaimResultModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  claim: ClaimData
}

const claimResultModal: React.FC<ClaimResultModalProps> = ({ open, onOpenChange, claim }) => {
  const verdict = claim?.result?.verdict?.toLowerCase()

  const verdictLabel =
    verdict === 'fake'
      ? 'Fake'
      : verdict === 'legit'
        ? 'Legit'
        : verdict === 'uncertain'
          ? 'Uncertain'
          : claim?.result?.verdict || 'Unknown'

  const verdictColorClasses =
    verdict === 'fake'
      ? 'bg-red-500 hover:bg-red-600 text-red-100'
      : verdict === 'legit'
        ? 'bg-emerald-500 hover:bg-emerald-600 text-emerald-100'
        : verdict === 'uncertain'
          ? 'bg-amber-500 hover:bg-amber-600 text-amber-100'
          : ''

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
                <Button className={`rounded-xl ${verdictColorClasses}`}>
                  {verdict === 'fake' && <XCircle className="size-4" />}
                  {verdict === 'legit' && <CheckCircle2 className="size-4" />}
                  {verdict === 'uncertain' && <AlertTriangle className="size-4" />}
                  {verdictLabel} News
                </Button>
               </div>
               </div>
            </DialogHeader>
            <div className='flex gap-8 flex-col'>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>Extracted Claim</p>
                    <p className='bg-gray-50 rounded-xl p-2'>{claim.text}</p>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>Source URL</p>
                    {claim.result?.sources.map((source) => (
                       <p className=' p-2 text-blue-600'>{source}</p>
                    ))}
                </div>

                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>AI Analysis</p>
                    <p className='p-2'>{claim.result?.analysis}</p>
                </div>

                <div className='border-t'>
               <div className='flex items-center gap-2 p-3 '>
                <Calendar size={14} />
                <p className='text-sm text-muted-foreground'>Verified on {formatDate(claim.result?.createdAt || "")}</p>
               </div>
            </div>

            </div>
            
           
        </DialogContent>
        
    </Dialog>
  )
}

export default claimResultModal