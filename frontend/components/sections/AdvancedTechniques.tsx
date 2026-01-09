"use client"
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Users, Search, Brain, Cpu, Wrench, Database, RefreshCw, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const AdvancedTechniques = () => {
  const techniques = [
    {
      icon: Users,
      title: 'Multi-Agent AI System',
      description: 'A 5-node hierarchical architecture built on a dependency-aware DAG, orchestrating core processes with specialized agents to deliver scalable and intelligent fact-checking.',
      iconColor: 'text-indigo-600',
      iconBg: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    },
    {
      icon: Search,
      title: 'Intelligent Search Orchestration',
      description: 'Combines ReAct-based query planning with neural semantic reranking to autonomously formulate strategies and prioritize high-relevance results across web platforms.',
      iconColor: 'text-cyan-600',
      iconBg: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
    },
    {
      icon: Brain,
      title: 'Deep Learning & NLP',
      description: 'Utilizes GPT-4o-mini transformer models with carefully engineered prompts, integrated into a robust ensemble framework that combines LLM reasoning with deep learning precision.',
      iconColor: 'text-purple-600',
      iconBg: 'bg-gradient-to-br from-purple-50 to-purple-100',
    },
    {
      icon: Cpu,
      title: 'Advanced Machine Learning',
      description: 'Semantic similarity using sentence transformers (BAAI/bge-m3), BERT-based fake news detection, and real-time content classification for high-fidelity analysis.',
      iconColor: 'text-pink-600',
      iconBg: 'bg-gradient-to-br from-pink-50 to-pink-100',
    },
    {
      icon: Wrench,
      title: 'Context Engineering',
      description: 'Research-driven adaptive context conditioning that dynamically tailors AI analysis based on claim specifics, source hierarchy, and evolving evidence contexts.',
      iconColor: 'text-amber-600',
      iconBg: 'bg-gradient-to-br from-amber-50 to-amber-100',
    },
    {
      icon: Database,
      title: 'Retrieval Augmented Generation (RAG)',
      description: 'Knowledge retrieval from vector database (Qdrant), cross-reference verification, and fact-checking integration with external APIs for comprehensive evidence gathering.',
      iconColor: 'text-teal-600',
      iconBg: 'bg-gradient-to-br from-teal-50 to-teal-100',
    },
    {
      icon: RefreshCw,
      title: 'Self-Learning System',
      description: 'Continuous learning system that consolidates new information into persistent memory, enabling iterative knowledge refinement and improvement over time.',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    },
    {
      icon: Zap,
      title: 'Multi-Signal Credibility Assessment',
      description: '4-signal ensemble for source quality filtering: Domain Trust (30%), Semantic Cross-Reference (25%), Google Fact Check (20%), and Fake News Model (25%).',
      iconColor: 'text-violet-600',
      iconBg: 'bg-gradient-to-br from-violet-50 to-violet-100',
    },
  ]

  return (
    <section
      id="architecture"
      className="py-24 px-4 bg-gradient-to-b from-white via-indigo-50/30 to-purple-50/30"
    >
      <div className='max-w-7xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Advanced agentic AI techniques
          </p>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900'>
            Under the hood
          </h2>
          <p className='text-lg text-muted-foreground max-w-3xl mx-auto'>
            VerifiAI leverages neuro-symbolic AI and hierarchical multi-agent orchestration to transform 
            unstructured digital noise into structured, actionable intelligence for rigorous fact verification.
          </p>
        </motion.div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {techniques.map((technique, index) => {
            const Icon = technique.icon
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
                <Card className='h-full flex flex-col hover:shadow-2xl transition-all duration-300 border-2 border-gray-200 hover:border-indigo-200 bg-white/90 backdrop-blur-sm group overflow-hidden'>
                  <div className='absolute inset-0 bg-gradient-to-br from-white/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
                  <CardHeader className='relative z-10'>
                    <div className={`w-14 h-14 rounded-xl ${technique.iconBg} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`w-7 h-7 ${technique.iconColor}`} />
                    </div>
                    <CardTitle className='text-lg font-semibold text-gray-900'>{technique.title}</CardTitle>
                  </CardHeader>
                  <CardContent className='relative z-10 flex-1'>
                    <p className='text-sm text-muted-foreground leading-relaxed'>
                      {technique.description}
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

export default AdvancedTechniques

