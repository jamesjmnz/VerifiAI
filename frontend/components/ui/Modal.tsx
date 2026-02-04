import React from 'react'
import { Button } from './button'
import Link from 'next/link'
import { Brain, CheckCheckIcon, Link2, LucideLink, ShieldQuestionMark, Loader2, ShieldX } from 'lucide-react'
import { VerificationResult, scoreBreakdown } from '@/app/types/verify'
import { Skeleton } from './skeleton'
import { getSourceTitle, cn } from '@/lib/utils'
import { Newspaper } from 'lucide-react'
import { Progress } from './progress'



type Props = {
  claim: string
  open: boolean
  loading: boolean,
  result: VerificationResult | null
  onClose: () => void
}


// Blue for breakdown; red stays for Risk Level only
const SCORE_BREAKDOWN_ITEMS: { key: keyof scoreBreakdown; label: string; max: number; color: string; barColor: string }[] = [
  { key: 'domain_trust', label: 'Source Credibility', max: 30, color: 'text-blue-700', barColor: 'bg-blue-600' },
  { key: 'semantic_crossref', label: 'Semantic Cross-Reference', max: 25, color: 'text-blue-700', barColor: 'bg-blue-600' },
  { key: 'google_factcheck', label: 'Google Fact Check', max: 20, color: 'text-blue-700', barColor: 'bg-blue-600' },
  { key: 'fake_news_model', label: 'Fake News Model', max: 25, color: 'text-blue-700', barColor: 'bg-blue-600' },
]

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

       {result.potential_fake_score &&
        <>
         <div className='flex flex-col pb-10 gap-3'>
        <h1 className='text-base flex items-center gap-2 font-semibold'><span className='text-blue-500'><Newspaper /></span>Potential Fake News Score</h1>
        <div className='outline flex flex-col gap-5 rounded-lg px-4 py-6 text-muted-foreground text-sm bg-gray-10'>
          <div className='flex flex-col gap-2'>
            <div className='flex items-center justify-between'>
              <h1 className='font-semibold'>Risk Level</h1>
              <h1 className='text-lg font-bold text-red-500'>{result.potential_fake_score}%</h1>
            </div>
            <Progress  value={result.potential_fake_score} />
          </div>
          <div className='w-full h-2  border '>

          </div>
          <div>
            <h1 className='font-semibold pb-5'>Score Breakdown</h1>
            <div className='flex flex-col gap-5'>
              {SCORE_BREAKDOWN_ITEMS.map(({ key, label, max, color, barColor }) => {
                const value = result.score_breakdown?.[key] ?? 0
                const pct = max > 0 ? (value / max) * 100 : 0
                return (
                  <div key={key} className='flex flex-col gap-2'>
                    <div className='flex items-center justify-between'>
                      <h1>{label}</h1>
                      <h1 className={cn('font-bold', color)}>{value} / {max}</h1>
                    </div>
                    <Progress value={pct} indicatorClassName={barColor} />
                  </div>
                )
              })}
            </div>
          </div>
          </div>
        </div>
         </>
       }
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