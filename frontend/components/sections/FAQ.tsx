"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../ui/accordion'
import { HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqs = [
    {
      id: '1',
      question: 'How accurate is VerifiAI?',
      answer: 'VerifiAI achieves a 94% accuracy rate through its multi-signal credibility assessment system, combining domain trust, semantic cross-reference, Google fact-check integration, and fake news detection models.',
    },
    {
      id: '2',
      question: 'How long does verification take?',
      answer: 'VerifiAI typically completes verification in under 3 seconds, thanks to parallel batch search execution and concurrent scoring agents that process evidence simultaneously.',
    },
    {
      id: '3',
      question: 'What types of claims can VerifiAI verify?',
      answer: 'VerifiAI can verify a wide range of claims including news articles, social media posts, public statements, academic claims, and product-related information. It works best with factual claims that can be cross-referenced with authoritative sources.',
    },
    {
      id: '4',
      question: 'How does VerifiAI determine if something is FAKE, LEGIT, or UNCERTAIN?',
      answer: 'VerifiAI uses a three-tier verdict system: FAKE when there is positive evidence of falsehood, LEGIT when there is clear authoritative confirmation, and UNCERTAIN when evidence is insufficient. The system follows extreme skepticism principles - absence of evidence does not equal evidence of falsehood.',
    },
    {
      id: '5',
      question: 'What happens when VerifiAI returns UNCERTAIN?',
      answer: 'When evidence is insufficient, VerifiAI runs a 4-signal weighted ensemble scoring system that calculates a risk score (0-100) based on Domain Trust (30%), Semantic Cross-Reference (25%), Google Fact Check (20%), and Fake News Model (25%).',
    },
    {
      id: '6',
      question: 'Can VerifiAI be integrated into existing platforms?',
      answer: 'Yes, VerifiAI is designed for integration into media platforms, social networks, government systems, and business applications. The API allows for real-time verification and can be customized for specific use cases.',
    },
  ]

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section
      id="faq"
      className="py-24 px-4 bg-gradient-to-b from-white via-gray-50/30 to-white"
    >
      <div className='max-w-4xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='text-center mb-16'
        >
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-indigo-600 mb-3">
            FAQ
          </p>
          <h2 className='text-4xl md:text-5xl font-bold mb-4 tracking-tight text-gray-900'>
            Frequently asked questions
          </h2>
          <p className='text-lg text-muted-foreground max-w-2xl mx-auto'>
            Everything you need to know about VerifiAI and how it works.
          </p>
        </motion.div>

        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AccordionItem value={faq.id} className="bg-white border-2 border-gray-200 rounded-lg mb-4 shadow-sm hover:shadow-md transition-shadow">
                <AccordionTrigger
                  onClick={() => toggleItem(faq.id)}
                  isOpen={openItems.includes(faq.id)}
                  className="px-6 text-left font-semibold text-gray-900"
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent
                  isOpen={openItems.includes(faq.id)}
                  className="px-6 text-muted-foreground leading-relaxed"
                >
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  )
}

export default FAQ
