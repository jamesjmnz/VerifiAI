"use client"
import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 border-t border-gray-800'>
      <div className='max-w-7xl mx-auto px-4 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Brand */}
          <div className='col-span-1 md:col-span-2'>
            <h3 className='text-2xl font-bold text-white mb-4'>VerifiAI</h3>
            <p className='text-sm text-gray-400 mb-4 max-w-md'>
              Fighting misinformation with intelligence. Advanced AI-powered fact-checking for the modern world.
            </p>
            <div className='flex gap-4'>
              <a href="#" className='text-gray-400 hover:text-white transition-colors'>
                <Github className='w-5 h-5' />
              </a>
              <a href="#" className='text-gray-400 hover:text-white transition-colors'>
                <Twitter className='w-5 h-5' />
              </a>
              <a href="#" className='text-gray-400 hover:text-white transition-colors'>
                <Linkedin className='w-5 h-5' />
              </a>
              <a href="#" className='text-gray-400 hover:text-white transition-colors'>
                <Mail className='w-5 h-5' />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className='text-white font-semibold mb-4'>Product</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href="#how-it-works" className='hover:text-white transition-colors'>
                  How it works
                </Link>
              </li>
              <li>
                <Link href="#architecture" className='hover:text-white transition-colors'>
                  Architecture
                </Link>
              </li>
              <li>
                <Link href="/console/verify" className='hover:text-white transition-colors'>
                  Try Console
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='text-white font-semibold mb-4'>Resources</h4>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href="#faq" className='hover:text-white transition-colors'>
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#" className='hover:text-white transition-colors'>
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className='hover:text-white transition-colors'>
                  API Reference
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className='border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center'>
          <p className='text-sm text-gray-400'>
            © {new Date().getFullYear()} VerifiAI. All rights reserved.
          </p>
          <div className='flex gap-6 mt-4 md:mt-0'>
            <a href="#" className='text-sm text-gray-400 hover:text-white transition-colors'>
              Privacy Policy
            </a>
            <a href="#" className='text-sm text-gray-400 hover:text-white transition-colors'>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
