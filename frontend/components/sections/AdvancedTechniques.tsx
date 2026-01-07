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
    },
    {
      icon: Search,
      title: 'Intelligent Search Orchestration',
      description: 'Combines ReAct-based query planning with neural semantic reranking to autonomously formulate strategies and prioritize high-relevance results across web platforms.',
    },
    {
      icon: Brain,
      title: 'Deep Learning & NLP',
      description: 'Utilizes GPT-4o-mini transformer models with carefully engineered prompts, integrated into a robust ensemble framework that combines LLM reasoning with deep learning precision.',
    },
    {
      icon: Cpu,
      title: 'Advanced Machine Learning',
      description: 'Semantic similarity using sentence transformers (BAAI/bge-m3), BERT-based fake news detection, and real-time content classification for high-fidelity analysis.',
    },
    {
      icon: Wrench,
      title: 'Context Engineering',
      description: 'Research-driven adaptive context conditioning that dynamically tailors AI analysis based on claim specifics, source hierarchy, and evolving evidence contexts.',
    },
    {
      icon: Database,
      title: 'Retrieval Augmented Generation (RAG)',
      description: 'Knowledge retrieval from vector database (Qdrant), cross-reference verification, and fact-checking integration with external APIs for comprehensive evidence gathering.',
    },
    {
      icon: RefreshCw,
      title: 'Self-Learning System',
      description: 'Continuous learning system that consolidates new information into persistent memory, enabling iterative knowledge refinement and improvement over time.',
    },
    {
      icon: Zap,
      title: 'Multi-Signal Credibility Assessment',
      description: '4-signal ensemble for source quality filtering: Domain Trust (30%), Semantic Cross-Reference (25%), Google Fact Check (20%), and Fake News Model (25%).',
    },
  ]

  return (
    <section
      id="architecture"
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
            Advanced agentic AI techniques
          </p>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 text-gray-900 tracking-tight'>Under the hood</h2>
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
              >
                <Card className='hover:shadow-lg transition-shadow'>
                <CardHeader>
                  <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4'>
                    <Icon className='w-6 h-6 text-blue-600' />
                  </div>
                  <CardTitle className='text-lg'>{technique.title}</CardTitle>
                </CardHeader>
                <CardContent>
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

