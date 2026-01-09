"use client"
import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Search, Brain, FileCheck, BarChart3, FileText, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Generates Search Queries',
      description: 'LLM-powered query generation that preserves claim specifics while adding fact-checking context.',
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      borderColor: 'border-blue-200',
      badgeColor: 'bg-blue-600',
      titleColor: 'text-blue-700',
    },
    {
      number: 2,
      icon: Brain,
      title: 'Executes Parallel Search',
      description: 'Batch search execution with parallel query processing via Tavily API for faster evidence collection.',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      badgeColor: 'bg-indigo-600',
      titleColor: 'text-indigo-700',
    },
    {
      number: 3,
      icon: FileCheck,
      title: 'Evaluates Evidence',
      description: 'LLM-powered evidence analysis with extreme skepticism, determining verdict: FAKE, LEGIT, or UNCERTAIN.',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      badgeColor: 'bg-purple-600',
      titleColor: 'text-purple-700',
    },
    {
      number: 4,
      icon: BarChart3,
      title: 'Calculates Risk Score',
      description: 'Runs 4 parallel scoring agents: Domain Trust, Semantic Cross-Reference, Google Fact Check, and Fake News Model.',
      iconColor: 'text-violet-600',
      iconBg: 'bg-violet-50',
      borderColor: 'border-violet-200',
      badgeColor: 'bg-violet-600',
      titleColor: 'text-violet-700',
    },
    {
      number: 5,
      icon: FileText,
      title: 'Generates Report',
      description: 'Synthesizes comprehensive verification report with detailed analysis, sources, and risk score breakdown.',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
      borderColor: 'border-purple-200',
      badgeColor: 'bg-purple-600',
      titleColor: 'text-purple-700',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-24 px-4 bg-gradient-to-b from-white via-gray-50/30 to-white relative overflow-hidden"
    >
      {/* Subtle Background */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0 bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:32px_32px]' />
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-20'
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-3">
            5-node multi-agent pipeline
          </p>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900'>
            How it works
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
            A sophisticated multi-agent pipeline that automates fact-checking through intelligent orchestration and rigorous evidence evaluation.
          </p>
        </motion.div>
        
        {/* Pipeline Visualization */}
        <div className='relative'>
          {/* Steps Container */}
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 relative'>
            {steps.map((step, index) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className='relative z-10'
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Arrow Connector */}
                  {index < steps.length - 1 && (
                    <div className='hidden lg:block absolute top-20 -right-3 z-20'>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.15 + 0.5 }}
                      >
                        <ArrowRight className='w-6 h-6 text-indigo-500' />
                      </motion.div>
                    </div>
                  )}

                  {/* Node Card */}
                  <Card className={`h-full border-2 ${step.borderColor} bg-white group overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative hover:border-opacity-60`}>
                    {/* Content */}
                    <div className='relative z-10 p-5'>
                      {/* Icon Container */}
                      <div className='flex justify-center mb-4'>
                        <div className={`relative w-14 h-14 rounded-lg ${step.iconBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 border ${step.borderColor}`}>
                          <Icon className={`w-7 h-7 ${step.iconColor} relative z-10`} />
                        </div>
                      </div>

                      {/* Step Badge */}
                      <div className='flex justify-center mb-3'>
                        <Badge className={`px-3 py-1 ${step.badgeColor} text-white border-0 shadow-sm font-semibold`}>
                          Node {step.number}
                        </Badge>
                      </div>

                      {/* Title */}
                      <h3 className='text-base font-bold text-gray-900 text-center mb-3 leading-tight'>
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className='text-xs text-muted-foreground leading-relaxed text-center'>
                        {step.description}
                      </p>
                    </div>

                    {/* Bottom Accent */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${step.badgeColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

