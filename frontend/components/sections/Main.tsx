"use client"
import React from 'react'
import { Button } from '../ui/button'
import { ArrowRight, SparklesIcon, History, XCircle, Calendar, LucideLink, Zap, Shield, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '../ui/card'
import { getSourceTitle } from '@/lib/utils'

const Main = () => {
  const exampleResult = {
    claim: "Scientists have discovered that drinking 8 glasses of water daily can cure all diseases.",
    verdict: "FAKE" as const,
    analysis: "This claim contains multiple false assertions. While staying hydrated is important for health, there is no scientific evidence that drinking 8 glasses of water daily can 'cure all diseases.' Medical research shows that water intake needs vary by individual, and no single intervention can cure all diseases.",
    sources: [
      "https://www.health.harvard.edu/staying-healthy/how-much-water-should-you-drink",
      "https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/expert-answers/water/faq-20058417"
    ],
    createdAt: new Date().toISOString()
  }

  const verdict = exampleResult.verdict.toLowerCase()
  const verdictLabel = verdict === 'fake' ? 'Fake' : verdict === 'legit' ? 'Legit' : 'Uncertain'
  const verdictColorClasses = verdict === 'fake' 
    ? 'bg-red-500 hover:bg-red-600 text-red-100' 
    : verdict === 'legit' 
      ? 'bg-emerald-500 hover:bg-emerald-600 text-emerald-100' 
      : 'bg-amber-500 hover:bg-amber-600 text-amber-100'

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const features = [
    { icon: Zap, label: 'Real-Time', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Shield, label: '94% Accurate', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: TrendingUp, label: '10K+ Verified', color: 'text-violet-600', bg: 'bg-violet-50' },
  ]

  return (
    <section className='min-h-screen px-4 py-12 lg:py-20 relative overflow-hidden bg-gradient-to-br from-white via-violet-50/30 via-indigo-50/20 to-white'>
      {/* Enhanced Background with Grid Pattern */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]' />
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-violet-300/20 to-purple-300/10 rounded-full blur-3xl animate-pulse' />
        <div className='absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-blue-300/10 rounded-full blur-3xl animate-pulse' style={{ animationDelay: '1s' }} />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-200/15 to-violet-200/10 rounded-full blur-3xl' />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        <div className='grid lg:grid-cols-2 gap-8 lg:gap-12 items-start'>
          {/* Left Side - Hero Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className='space-y-8'
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge className='py-2.5 px-6 text-sm bg-gradient-to-r from-violet-50 via-indigo-50 to-purple-50 border-2 border-violet-200/60 text-violet-700 inline-flex gap-2 items-center shadow-md hover:shadow-lg transition-all duration-300 backdrop-blur-sm'>
                <SparklesIcon className='text-violet-600' size={14} />
                <span className='font-semibold'>AI-Powered Verification</span>
              </Badge>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='space-y-4'
            >
              <h1 className='font-bold text-5xl md:text-6xl lg:text-7xl leading-tight'>
                <span className='bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent drop-shadow-sm'>
                  Fighting Misinformation
                </span>
                <br />
                <span className='bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent'>
                  With Intelligence
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className='max-w-lg'
            >
              <p className='text-lg text-muted-foreground leading-relaxed'>
                VerifiAI uses advanced machine learning to analyze, verify, and flag potentially misleading content in real-time, empowering users to make informed decisions.
              </p>
            </motion.div>

            {/* Feature Pills with Enhanced Design */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className='flex flex-wrap gap-3'
            >
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <Card className={`${feature.bg} border-2 border-white/50 hover:border-violet-300/50 transition-all duration-300 cursor-default shadow-md hover:shadow-lg backdrop-blur-sm relative overflow-hidden group`}>
                      <div className='absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                      <CardContent className='p-3 flex items-center gap-2 relative z-10'>
                        <div className={`p-1.5 rounded-lg bg-white/60 backdrop-blur-sm ${feature.color}`}>
                          <Icon className={`w-4 h-4`} />
                        </div>
                        <span className='text-sm font-semibold text-gray-700'>{feature.label}</span>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='flex flex-col sm:flex-row gap-4'
            >
              <Link href="/console/verify">
                <Button className='py-6 px-8 text-base bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 hover:from-violet-700 hover:via-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/20'>
                  Try the Console
                  <ArrowRight className='w-4 h-4 ml-2' />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Side - Enhanced Modal with Gradients */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className='sticky top-8'
          >
            {/* Gradient Border Effect */}
            <div className='relative p-[2px] bg-gradient-to-br from-violet-200 via-indigo-200 to-purple-200 rounded-xl shadow-2xl'>
              <div className='absolute inset-0 bg-gradient-to-br from-violet-400/20 via-indigo-400/20 to-purple-400/20 rounded-xl blur-xl' />
              <Card className='bg-white/95 backdrop-blur-md border-0 shadow-xl relative z-10'>
                <CardContent className='p-0 max-h-[600px] overflow-y-auto'>
                  {/* Header with Gradient Background */}
                  <div className='py-4 px-5 border-b border-gradient-to-r from-violet-100/50 to-indigo-100/50 bg-gradient-to-r from-violet-50/30 via-indigo-50/20 to-purple-50/30 sticky top-0 z-10 backdrop-blur-sm'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        <div className='p-1.5 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200/50'>
                          <History size={18} className='text-blue-600' />
                        </div>
                        <h1 className='font-semibold text-base bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>Fact Check Details</h1>
                      </div>
                      <div>
                        <Button className={`rounded-xl text-xs py-1.5 px-3 ${verdictColorClasses} shadow-md border border-white/20`}>
                          <XCircle className="size-3 mr-1" />
                          {verdictLabel}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Content with Enhanced Styling */}
                  <div className='flex gap-5 flex-col p-5 bg-gradient-to-b from-white to-gray-50/30'>
                    {/* Extracted Claim with Gradient Border */}
                    <div className='flex flex-col gap-1.5'>
                      <p className='text-xs text-muted-foreground font-semibold uppercase tracking-wide'>Extracted Claim</p>
                      <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-r from-violet-100/50 to-indigo-100/50 rounded-lg blur-sm' />
                        <p className='relative bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-lg p-2.5 text-sm leading-snug line-clamp-2 border border-gray-200/50 shadow-sm'>{exampleResult.claim}</p>
                      </div>
                    </div>

                    {/* Source URL with Enhanced Design */}
                    <div className='flex flex-col gap-1.5'>
                      <p className='text-xs text-muted-foreground font-semibold uppercase tracking-wide'>Source URL</p>
                      {exampleResult.sources && exampleResult.sources.length > 0 ? (
                        <Link href={exampleResult.sources[0]} target="_blank" rel="noopener noreferrer">
                          <div className='relative group'>
                            <div className='absolute inset-0 bg-gradient-to-r from-violet-100/30 to-indigo-100/30 rounded-lg blur-sm opacity-0 group-hover:opacity-100 transition-opacity' />
                            <div className='relative outline outline-1 outline-gray-200 rounded-lg px-3 py-3 flex items-center justify-between bg-gradient-to-br from-gray-10 to-white hover:from-gray-50 hover:to-gray-100/50 transition-all cursor-pointer border border-gray-200/50 shadow-sm hover:shadow-md'>
                              <div className='flex flex-col min-w-0 flex-1'>
                                <h1 className='font-bold text-sm truncate'>{getSourceTitle(exampleResult.sources[0])}</h1>
                                <p className='text-muted-foreground text-xs truncate'>{exampleResult.sources[0]}</p>
                              </div>
                              <div className='ml-2 flex-shrink-0 p-1 rounded-md bg-gray-100/50 group-hover:bg-indigo-100/50 transition-colors'>
                                <LucideLink className='text-muted-foreground group-hover:text-indigo-600' size={16} />
                              </div>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className='outline outline-1 outline-gray-200 rounded-lg px-3 py-3 bg-gradient-to-br from-gray-10 to-white border border-gray-200/50'>
                          <p className='text-muted-foreground text-xs'>No sources available</p>
                        </div>
                      )}
                    </div>

                    {/* AI Analysis with Gradient Background */}
                    <div className='flex flex-col gap-1.5'>
                      <p className='text-xs text-muted-foreground font-semibold uppercase tracking-wide'>AI Analysis</p>
                      <div className='relative'>
                        <div className='absolute inset-0 bg-gradient-to-br from-red-100/40 via-amber-100/30 to-orange-100/40 rounded-lg blur-sm' />
                        <p className='relative bg-gradient-to-br from-red-50/60 via-amber-50/40 to-orange-50/30 rounded-lg p-2.5 text-xs leading-relaxed line-clamp-4 border border-red-100/50 shadow-sm'>{exampleResult.analysis}</p>
                      </div>
                    </div>

                    {/* Footer with Gradient Border */}
                    <div className='border-t border-gradient-to-r from-violet-100/50 to-indigo-100/50 pt-3'>
                      <div className='flex items-center gap-2'>
                        <div className='p-1 rounded-md bg-gradient-to-br from-gray-100 to-gray-200/50 border border-gray-200/50'>
                          <Calendar size={12} className='text-muted-foreground' />
                        </div>
                        <p className='text-xs text-muted-foreground font-medium'>Verified on {formatDate(exampleResult.createdAt)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Main