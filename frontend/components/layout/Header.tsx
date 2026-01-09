"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { auth } from '@/lib/auth'
import { authClient, logout } from '@/lib/auth-client'
import { sessionType } from '@/app/types/session'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, Shield } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

const Header = () => {
  const [session, setSession] = useState<any | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigations = [
    { label: "Home", href: "/" },
    { label: "Works", href: "#how-it-works" },
    { label: "Architecture", href: "#architecture" },
    { label: "Cases", href: "#use-cases" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ]

  useEffect(() => {
    authClient.getSession().then((data) => {
      setSession(data.data ?? null)
    })
  }, [])

  return (
    <nav className='border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 py-3.5 px-4 md:px-10'>
      <main className='flex justify-between items-center max-w-7xl mx-auto'>
        <div>
          <Link href="/" className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
            <div className='w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md'>
              <Shield className='w-5 h-5 md:w-6 md:h-6 text-white' />
            </div>
            <h1 className='font-bold text-xl md:text-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
              VerifiAI
            </h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className='hidden md:flex gap-6 lg:gap-8 text-sm'>
          {navigations.map((nav) => (
            <Link
              key={nav.label}
              href={nav.href}
              className='text-gray-700 hover:text-indigo-600 transition-colors font-medium'
            >
              {nav.label}
            </Link>
          ))}
        </div>

        <div className='flex gap-3 md:gap-5 items-center'>
          <Link href={"/console/verify"} className='hidden sm:block'>
            <Button className='text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2'>
              Console
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className='md:hidden'>
              <Button variant="ghost" size="icon">
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className='w-[250px]'>
              <div className='flex flex-col gap-4 mt-8'>
                {navigations.map((nav) => (
                  <Link
                    key={nav.label}
                    href={nav.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className='text-gray-700 hover:text-indigo-600 transition-colors font-medium py-2'
                  >
                    {nav.label}
                  </Link>
                ))}
                <Link
                  href={"/console/verify"}
                  onClick={() => setMobileMenuOpen(false)}
                  className='mt-4'
                >
                  <Button className='w-full'>
                    Console
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>

          {session ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {session && (
                    <Image
                      height={500}
                      width={500}
                      className='h-8 w-8 rounded-full cursor-pointer hover:ring-2 ring-indigo-200 transition-all'
                      alt='profile picture'
                      src={session?.user?.image}
                    />
                  )}
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-32' align='end'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuItem onClick={logout}>Log Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href={"/login"}>
                <Button variant={"outline"} className='text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2'>
                  Log in
                </Button>
              </Link>
            </>
          )}
        </div>
      </main>
    </nav>
  )
}

export default Header