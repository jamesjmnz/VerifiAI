"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Search, Brain, FileCheck, BarChart3, FileText } from 'lucide-react'
import { motion } from 'framer-motion'

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: Search,
      title: 'Generates Search Queries',
      description: 'LLM-powered query generation that preserves claim specifics while adding fact-checking context. Creates dual queries for comprehensive evidence gathering.',
    },
    {
      number: 2,
      icon: Brain,
      title: 'Executes Parallel Search',
      description: 'Batch search execution with parallel query processing via Tavily API for faster evidence collection across multiple sources.',
    },
    {
      number: 3,
      icon: FileCheck,
      title: 'Evaluates Evidence',
      description: 'LLM-powered evidence analysis with extreme skepticism, determining verdict: FAKE (false), LEGIT (confirmed), or UNCERTAIN (insufficient evidence).',
    },
    {
      number: 4,
      icon: BarChart3,
      title: 'Calculates Risk Score',
      description: 'When evidence is insufficient, runs 4 parallel scoring agents: Domain Trust, Semantic Cross-Reference, Google Fact Check, and Fake News Model.',
    },
    {
      number: 5,
      icon: FileText,
      title: 'Generates Report',
      description: 'Synthesizes comprehensive verification report with detailed analysis, sources, and risk score breakdown for informed decision-making.',
    },
  ]

  return (
    <section
      id="how-it-works"
      className="py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-blue-50"
    >
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-blue-500 mb-3">
            5-node multi-agent pipeline
          </p>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight text-slate-900'>How VerifiAI works</h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            VerifiAI automates the fact-checking process through a sophisticated 5-node multi-agent pipeline, 
            combining intelligent search orchestration with rigorous evidence evaluation.
          </p>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6'>
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='relative'
              >
                {index < steps.length - 1 && (
                  <div className='hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent z-0' 
                       style={{ width: 'calc(100% - 3rem)', marginLeft: '3rem' }} />
                )}
                <Card className='relative z-10 h-full hover:shadow-lg transition-shadow'>
                  <CardHeader>
                    <div className='flex items-center gap-3 mb-2'>
                      <div className='w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold'>
                        {step.number}
                      </div>
                      <CardTitle className='text-sm uppercase tracking-wide text-muted-foreground'>
                        Step {step.number}
                      </CardTitle>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Icon className='w-6 h-6 text-blue-500' />
                      <CardTitle className='text-xl'>{step.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

