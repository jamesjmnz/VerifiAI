"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { CheckCircle2, XCircle, AlertCircle, Clock, Zap, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

const Features = () => {
  const features = [
    {
      icon: CheckCircle2,
      title: 'Three-Tier Verdict System',
      description: 'FAKE (positive evidence of falsehood), LEGIT (clear authoritative confirmation), or UNCERTAIN (default when evidence is insufficient).',
      color: 'text-emerald-600',
      bgColor: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      borderColor: 'border-emerald-200',
    },
    {
      icon: Zap,
      title: 'Conditional Risk Scoring',
      description: '4-signal weighted ensemble runs only when evidence is insufficient, providing nuanced risk assessment (0-100 score) without unnecessary computation.',
      color: 'text-amber-600',
      bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100',
      borderColor: 'border-amber-200',
    },
    {
      icon: Shield,
      title: 'Extreme Skepticism',
      description: 'Rigorous evaluation rules with source hierarchy. Critical principle: absence of evidence ≠ evidence of falsehood.',
      color: 'text-indigo-600',
      bgColor: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-200',
    },
    {
      icon: Clock,
      title: 'Real-Time Verification',
      description: 'Parallel batch search execution and concurrent scoring agents for fast, efficient fact-checking in real-time.',
      color: 'text-cyan-600',
      bgColor: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
      borderColor: 'border-cyan-200',
    },
    {
      icon: AlertCircle,
      title: 'Multi-Signal Credibility',
      description: 'Domain Trust (30%) + Semantic Cross-Reference (25%) + Google Fact Check (20%) + Fake News Model (25%) for comprehensive assessment.',
      color: 'text-purple-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-200',
    },
    {
      icon: XCircle,
      title: 'Intelligent Query Generation',
      description: 'LLM-powered query generation that preserves claim specifics while adding fact-checking context for comprehensive evidence gathering.',
      color: 'text-rose-600',
      bgColor: 'bg-gradient-to-br from-rose-50 to-rose-100',
      borderColor: 'border-rose-200',
    },
  ]

  return (
    <section id="features" className='py-24 px-4 bg-gradient-to-b from-white via-slate-50/50 to-indigo-50/30'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Features
          </p>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900'>
            Key features
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            VerifiAI combines cutting-edge AI techniques with rigorous verification principles 
            to deliver accurate, reliable fact-checking results.
          </p>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className='transition-transform duration-300'
              >
                <Card className={`hover:shadow-2xl transition-all duration-300 border-2 ${feature.borderColor} hover:border-opacity-100 bg-white/80 backdrop-blur-sm overflow-hidden group`}>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <CardHeader className='relative z-10'>
                    <div className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                    <CardTitle className='text-xl font-semibold text-gray-900'>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='relative z-10'>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {feature.description}
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

export default Features

