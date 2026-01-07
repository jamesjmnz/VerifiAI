"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Newspaper, AlertTriangle, MessageSquare, Shield, TrendingUp, Users } from 'lucide-react'
import { motion } from 'framer-motion'

const UseCases = () => {
  const useCases = [
    {
      icon: Newspaper,
      title: 'Media & Journalism',
      description: 'Verify claims before publication, fact-check breaking news, and ensure editorial accuracy with real-time verification.',
      features: [
        'Verify claims before publication',
        'Fact-check breaking news in real-time',
        'Ensure editorial accuracy and credibility',
      ],
      gradient: 'from-blue-500 to-blue-700',
    },
    {
      icon: AlertTriangle,
      title: 'Crisis & Emergency Response',
      description: 'Detect misinformation during emergencies, verify critical information, and prevent panic-inducing false claims.',
      features: [
        'Detect early misinformation during crises',
        'Verify critical emergency information',
        'Prevent panic-inducing false claims',
      ],
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: MessageSquare,
      title: 'Social Media Platforms',
      description: 'Automated content moderation, flag potentially misleading posts, and provide users with verification badges.',
      features: [
        'Automated content moderation',
        'Flag potentially misleading posts',
        'Provide users with verification context',
      ],
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: Shield,
      title: 'Government & Public Sector',
      description: 'Verify public statements, fact-check policy claims, and maintain transparency in public communications.',
      features: [
        'Verify public statements and announcements',
        'Fact-check policy claims and proposals',
        'Maintain transparency in communications',
      ],
      gradient: 'from-blue-500 to-blue-700',
    },
    {
      icon: TrendingUp,
      title: 'Business & Brand Protection',
      description: 'Monitor brand mentions, detect false claims about products, and protect reputation from misinformation.',
      features: [
        'Monitor brand and product mentions',
        'Detect false claims about products',
        'Protect reputation from misinformation',
      ],
      gradient: 'from-blue-500 to-blue-700',
    },
    {
      icon: Users,
      title: 'Education & Research',
      description: 'Help students and researchers verify sources, fact-check academic claims, and promote media literacy.',
      features: [
        'Help verify sources and citations',
        'Fact-check academic and research claims',
        'Promote critical thinking and media literacy',
      ],
      gradient: 'from-blue-400 to-blue-700',
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
          <div className='inline-block mb-4'>
            <span className='text-sm font-semibold uppercase tracking-wider text-blue-500'>Use Cases</span>
          </div>
          <h2 className='text-4xl font-bold mb-4 text-gray-900'>Where it helps most</h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            VerifiAI is not a generic fact-checking tool. It is engineered for decisions that affect real people, 
            organizations, and communities in an era of information overload.
          </p>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className={`hover:shadow-xl transition-all duration-300 ${
                    index === 0 ? 'bg-gradient-to-br from-blue-500 to-blue-700 text-white border-0' : ''
                  }`}
                >
                <CardHeader>
                  <div className='flex items-center justify-between mb-4'>
                    <div className={`w-12 h-12 rounded-lg ${
                      index === 0 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-gradient-to-br from-blue-50 to-blue-100'
                    } flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${
                        index === 0 ? 'text-white' : 'text-blue-600'
                      }`} />
                    </div>
                  </div>
                  <CardTitle className={`text-xl ${
                    index === 0 ? 'text-white' : 'text-gray-900'
                  }`}>
                    {useCase.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm mb-4 leading-relaxed ${
                    index === 0 ? 'text-white/90' : 'text-muted-foreground'
                  }`}>
                    {useCase.description}
                  </p>
                  <ul className={`space-y-2 ${
                    index === 0 ? 'text-white/80' : 'text-muted-foreground'
                  }`}>
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className='text-sm flex items-start gap-2'>
                        <span className={`mt-1.5 ${
                          index === 0 ? 'text-white' : 'text-blue-500'
                        }`}>•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
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

export default UseCases

