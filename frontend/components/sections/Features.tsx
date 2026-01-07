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
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Zap,
      title: 'Conditional Risk Scoring',
      description: '4-signal weighted ensemble runs only when evidence is insufficient, providing nuanced risk assessment (0-100 score) without unnecessary computation.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Shield,
      title: 'Extreme Skepticism',
      description: 'Rigorous evaluation rules with source hierarchy. Critical principle: absence of evidence ≠ evidence of falsehood.',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      icon: Clock,
      title: 'Real-Time Verification',
      description: 'Parallel batch search execution and concurrent scoring agents for fast, efficient fact-checking in real-time.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: AlertCircle,
      title: 'Multi-Signal Credibility',
      description: 'Domain Trust (30%) + Semantic Cross-Reference (25%) + Google Fact Check (20%) + Fake News Model (25%) for comprehensive assessment.',
      color: 'text-blue-700',
      bgColor: 'bg-blue-50',
    },
    {
      icon: XCircle,
      title: 'Intelligent Query Generation',
      description: 'LLM-powered query generation that preserves claim specifics while adding fact-checking context for comprehensive evidence gathering.',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ]

  return (
    <section className='py-20 px-4 bg-gradient-to-b from-white via-slate-50 to-blue-50'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl font-bold mb-4 text-gray-900'>Key Features</h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            VerifiAI combines cutting-edge AI techniques with rigorous verification principles 
            to deliver accurate, reliable fact-checking results.
          </p>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className='hover:shadow-lg transition-shadow border-2 hover:border-blue-200'>
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className='text-xl'>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
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

