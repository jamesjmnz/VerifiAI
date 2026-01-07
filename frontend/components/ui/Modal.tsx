import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import { Brain, CheckCheckIcon, Link2, LucideLink, ShieldQuestionMark, Loader2, ShieldX } from 'lucide-react'
import { VerificationResult } from '@/app/types/verify'
import { Skeleton } from './skeleton'




type Props = {
  claim: string
  open: boolean
  loading: boolean,
  result: VerificationResult | null
  onClose: () => void
}

// Helper function to extract domain name from URL
const getDomainFromUrl = (url: string): string => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return url
  }
}

// Helper function to get a readable title from URL
const getSourceTitle = (url: string): string => {
  const domain = getDomainFromUrl(url)
  // Capitalize first letter and format common domains
  const parts = domain.split('.')
  if (parts.length > 0) {
    return parts[0].charAt(0).toUpperCase() + parts[0].slice(1)
  }
  return domain
}


const schemaStyle = [
  {
    verdict: "FAKE",
    full_verdict: "Fake News",
    style: "bg-red-100 text-red-500",
    icon: ShieldX
    
  },
  {
    verdict: "LEGIT",
    full_verdict: "Legitimate",
    style: "bg-green-100 text-green-500",
    icon: CheckCheckIcon
  },
  {
    verdict: "UNCERTAIN",
    full_verdict: "Uncertain",
    style: "bg-amber-100 text-amber-500",
    icon: ShieldQuestionMark
  }

]



const Modal = ({claim, open, loading, result, onClose}: Props) => {





  if (!open) return null

  return (
   <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'>
      <div  className="w-full max-w-2xl rounded-lg bg-white p-6">
        {loading && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-blue-500" />
              <h1 className='text-2xl font-bold'>Analyzing Claim</h1>
            </div>
            <div className='flex flex-col gap-2.5'>
              <h1 className='text-base font-semibold flex items-center gap-2'>
                <span><Brain className='text-blue-500' size={18}/></span>AI Analysis
              </h1>
              <div className='outline rounded-lg px-4 py-6 bg-gray-10'>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
            <div className='flex flex-col gap-3'>
              <h1 className='text-base flex items-center gap-2 font-semibold'>
                <span className='text-blue-500'><Link2 /></span>Trusted Sources Used
              </h1>
              {[1, 2, 3].map((i) => (
                <div key={i} className='outline rounded-lg px-4 py-4 bg-gray-10'>
                  <Skeleton className="h-5 w-1/3 mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && result && (
          <>
            <div className='flex justify-between items-center pb-5'>
          <h1 className='text-2xl font-bold'>Fact Check Result</h1>

         <div className="flex items-center gap-2">
        
         <Button variant={"outline"} className={schemaStyle.find((schema) => schema.verdict === result?.verdict)?.style || ""}>
          <span>
          {(() => {
            const Icon = schemaStyle.find((schema) => schema.verdict === result?.verdict)?.icon;
            return Icon ? <Icon size={18} /> : null;
          })()}
          </span>
           <p className='font-semibold '>
           {result.verdict}
           </p>
          </Button>
         </div>
        </div>
        <div className='flex flex-col gap-2.5 pb-5'>
          <h1 className='text-base font-semibold flex items-center gap-2'><span><Brain className='text-blue-500' size={18}/></span>AI Analysis</h1>
          <div className='outline rounded-lg px-4 py-6 text-muted-foreground text-sm bg-gray-10'>
          <p>{result.analysis}</p>
          </div>
        </div>
        <div className='flex flex-col pb-10 gap-3'>
          <h1 className='text-base flex items-center gap-2 font-semibold'><span className='text-blue-500'><Link2 /></span>Trusted Sources Used</h1>
          {result.sources && result.sources.length > 0 ? (
            result.sources.map((source, index) => (
              <Link key={index} href={source} target="_blank" rel="noopener noreferrer">
                <div className='outline rounded-lg px-4 py-4 flex items-center justify-between bg-gray-10 hover:bg-gray-50 transition-colors cursor-pointer'>
                  <div className='flex flex-col'>
                    <h1 className='font-bold text-base'>{getSourceTitle(source)}</h1>
                    <p className='text-muted-foreground text-sm truncate max-w-md'>{source}</p>
                  </div>
                  <div>
                    <LucideLink className='text-muted-foreground' size={18} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className='outline rounded-lg px-4 py-4 bg-gray-10'>
              <p className='text-muted-foreground text-sm'>No sources available</p>
            </div>
          )}
        </div>
        <div className='justify-end flex w-full'>
        <Button onClick={onClose}  variant={'outline'}>
            Close
          </Button>
        </div>
         
          </>
        )}
      </div>
   </div>
  )
}

export default Modal