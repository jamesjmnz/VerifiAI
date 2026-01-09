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
      iconColor: 'text-blue-600',
      iconBg: 'bg-gradient-to-br from-blue-50 to-blue-100',
      cardBg: 'bg-gradient-to-br from-blue-500 to-blue-700',
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
      iconColor: 'text-indigo-600',
      iconBg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      cardBg: 'bg-white',
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
      iconColor: 'text-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
      cardBg: 'bg-white',
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
      iconColor: 'text-indigo-600',
      iconBg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      cardBg: 'bg-white',
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
      iconColor: 'text-emerald-600',
      iconBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      cardBg: 'bg-white',
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
      iconColor: 'text-amber-600',
      iconBg: 'bg-gradient-to-br from-amber-50 to-amber-100',
      cardBg: 'bg-white',
    },
  ]

  return (
    <section id="use-cases" className='py-24 px-4 bg-gradient-to-b from-white via-slate-50/50 to-indigo-50/30'>
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Use cases
          </p>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900'>
            Where it helps most
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            VerifiAI is not a generic fact-checking tool. It is engineered for decisions that affect real people, 
            organizations, and communities in an era of information overload.
          </p>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon
            const isGradient = index === 0
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
                <Card 
                  className={`hover:shadow-2xl transition-all duration-300 border-2 ${
                    isGradient 
                      ? `${useCase.cardBg} text-white border-transparent shadow-xl` 
                      : 'bg-white/90 backdrop-blur-sm border-gray-200 hover:border-indigo-200'
                  } group overflow-hidden`}
                >
                  <div className={`absolute inset-0 ${
                    isGradient 
                      ? 'bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100' 
                      : 'bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300`} />
                  <CardHeader className='relative z-10'>
                    <div className='flex items-center justify-between mb-4'>
                      <div className={`w-14 h-14 rounded-xl ${
                        isGradient 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : useCase.iconBg
                      } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-7 h-7 ${
                          isGradient ? 'text-white' : useCase.iconColor
                        }`} />
                      </div>
                    </div>
                    <CardTitle className={`text-xl font-semibold ${
                      isGradient ? 'text-white' : 'text-gray-900'
                    }`}>
                      {useCase.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='relative z-10'>
                    <p className={`text-sm mb-4 leading-relaxed ${
                      isGradient ? 'text-white/90' : 'text-muted-foreground'
                    }`}>
                      {useCase.description}
                    </p>
                    <ul className={`space-y-2 ${
                      isGradient ? 'text-white/80' : 'text-muted-foreground'
                    }`}>
                      {useCase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className='text-sm flex items-start gap-2'>
                          <span className={`mt-1.5 font-bold ${
                            isGradient 
                              ? 'text-white' 
                              : index === 1 
                                ? 'text-indigo-500' 
                                : index === 2 
                                  ? 'text-purple-500' 
                                  : index === 3 
                                    ? 'text-indigo-500' 
                                    : index === 4 
                                      ? 'text-blue-500' 
                                      : 'text-violet-500'
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

