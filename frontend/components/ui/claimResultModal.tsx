import React from 'react'
import { Dialog, DialogContent, DialogHeader } from './dialog'
import { Button } from './button'
import { ClaimData } from '@/app/types/claimData'
import { scoreBreakdown } from '@/app/types/verify'
import { Calendar, History, CheckCircle2, XCircle, AlertTriangle, LucideLink, Newspaper } from 'lucide-react'
import { formatDate, getSourceTitle, cn } from '@/lib/utils'
import Link from 'next/link'
import { Progress } from './progress'

const SCORE_BREAKDOWN_ITEMS: { key: keyof scoreBreakdown; label: string; max: number; color: string; barColor: string }[] = [
  { key: 'domain_trust', label: 'Source Credibility', max: 30, color: 'text-blue-700', barColor: 'bg-blue-600' },
  { key: 'semantic_crossref', label: 'Semantic Cross-Reference', max: 25, color: 'text-blue-700', barColor: 'bg-blue-600' },
  { key: 'google_factcheck', label: 'Google Fact Check', max: 20, color: 'text-blue-700', barColor: 'bg-blue-600' },
  { key: 'fake_news_model', label: 'Fake News Model', max: 25, color: 'text-blue-700', barColor: 'bg-blue-600' },
]

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
        <DialogContent className="sm:max-w-2xl h-[70vh] flex flex-col p-0 overflow-hidden">
            <div className="flex-1  overflow-y-scroll px-6 pt-6">
            <DialogHeader className='py-5 px-0'>
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
            <div className='flex gap-8 flex-col pb-6'>
                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>Extracted Claim</p>
                    <p className='bg-gray-50 rounded-xl p-2'>{claim.text}</p>
                </div>

                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>Source URL</p>
                    {claim.result?.sources && claim.result.sources.length > 0 ? (
                      claim.result.sources.map((source, index) => (
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

                <div className='flex flex-col gap-1.5'>
                    <p className='text-sm text-muted-foreground'>AI Analysis</p>
                    <p className='p-2'>{claim.result?.analysis}</p>
                </div>

                {claim.result?.potential_fake_score != null && (
                  <div className='flex flex-col gap-3'>
                    <h1 className='text-base flex items-center gap-2 font-semibold'>
                      <span className='text-blue-500'><Newspaper /></span>Potential Fake News Score
                    </h1>
                    <div className='outline flex flex-col gap-5 rounded-lg px-4 py-6 text-muted-foreground text-sm bg-gray-10'>
                      <div className='flex flex-col gap-2'>
                        <div className='flex items-center justify-between'>
                          <h1 className='font-semibold'>Risk Level</h1>
                          <h1 className='text-lg font-bold text-red-500'>{claim.result.potential_fake_score}%</h1>
                        </div>
                        <Progress value={claim.result.potential_fake_score} />
                      </div>
                      <div className='w-full h-2 border' />
                      <div>
                        <h1 className='font-semibold pb-5'>Score Breakdown</h1>
                        <div className='flex flex-col gap-5'>
                          {SCORE_BREAKDOWN_ITEMS.map(({ key, label, max, color, barColor }) => {
                            const value = claim.result?.score_breakdown?.[key] ?? 0
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
                )}

                <div className='border-t'>
               <div className='flex items-center gap-2 p-3 '>
                <Calendar size={14} />
                <p className='text-sm text-muted-foreground'>Verified on {formatDate(claim.result?.createdAt || "")}</p>
               </div>
            </div>

            </div>
            </div>
        </DialogContent>
        
    </Dialog>
  )
}

export default claimResultModal