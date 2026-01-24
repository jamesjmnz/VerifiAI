"use client"
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Terminal, History, LineChart, Shield, HelpCircle, LogOut, User } from 'lucide-react'
import { authClient, logout } from '@/lib/auth-client'
import Image from 'next/image'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
  } from "@/components/ui/sidebar"

const ConsoleSidebar = () => {
    const pathname = usePathname()
    const [session, setSession] = useState<any | null>(null)
    
    const items = [
        {
            icon: Terminal,
            label: "Verify",
            url: "/console/verify",
            description: "Fact-check claims and articles"
        },
        {
            icon: History,
            label: "History",
            url: "/console/history",
            description: "View past verifications"
        },
        {
            icon: LineChart,
            label: "Analytics",
            url: "/console/analytics",
            description: "Track verification stats"
        },
    ]

    const checkSession = async () => {
        try {
            const data = await authClient.getSession()
            // Only set session if we have a valid user object
            if (data.data?.user?.id) {
                setSession(data.data)
            } else {
                // If no valid user, clear session
                setSession(null)
            }
        } catch (error) {
            console.error("Error getting session:", error)
            setSession(null)
        }
    }

    useEffect(() => {
        checkSession()
        
        // Listen for storage events (when session changes in other tabs)
        const handleStorageChange = () => {
            checkSession()
        }
        
        // Listen for focus events (when user comes back to tab)
        const handleFocus = () => {
            checkSession()
        }
        
        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('focus', handleFocus)
        
        // Also check session periodically (every 30 seconds) to catch changes
        const interval = setInterval(checkSession, 30000)
        
        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('focus', handleFocus)
            clearInterval(interval)
        }
    }, [])

  return (
    <Sidebar className="flex flex-col">
        <SidebarGroup className='border-b'>
            <SidebarGroupLabel className='px-6 py-5'>
                <Link href="/" className='flex items-center gap-2 hover:opacity-80 transition-opacity'>
                    <div className='w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md'>
                        <Shield className='w-5 h-5 text-white' />
                    </div>
                    <h1 className='text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent'>
                        VerifiAI
                    </h1>
                </Link>
            </SidebarGroupLabel>
        </SidebarGroup>
        <SidebarContent className='px-5 flex-1'>
            <SidebarGroup>
                <SidebarGroupLabel className='font-semibold text-xs px-0 mb-3'>CONSOLE</SidebarGroupLabel>
            </SidebarGroup>
            <SidebarMenu className='space-y-2'>
            {items.map((i) => {
                const isActive = pathname === i.url
                const Icon = i.icon
                return (
                <SidebarMenuItem key={i.label}>
                    <Link href={i.url}>
                        <SidebarMenuButton 
                            size="lg"
                            isActive={isActive}
                            className={`h-auto py-2.5 px-3 rounded-lg overflow-visible items-center ${isActive ? 'bg-blue-100 text-blue-600 hover:bg-blue-100' : 'text-gray-900 hover:bg-gray-100'}`}
                        >
                            <Icon className='w-5 h-5 flex-shrink-0' />
                            <div className='flex flex-col items-start gap-0.5 flex-1 min-w-0 overflow-visible text-left'>
                                <span className={`font-semibold text-sm md:text-base whitespace-normal ${isActive ? 'text-blue-600' : 'text-gray-900'}`}>
                                    {i.label}
                                </span>
                                <span className={`text-xs font-normal leading-relaxed whitespace-normal ${isActive ? 'text-blue-500' : 'text-gray-600'}`}>
                                    {i.description}
                                </span>
                            </div>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className='p-4 border-t'>
            {session ? (
                <div className='flex items-center gap-3 mb-3'>
                    {session?.user?.image && (
                        <Image
                            height={40}
                            width={40}
                            className='h-10 w-10 rounded-full'
                            alt='profile picture'
                            src={session?.user?.image}
                        />
                    )}
                    <div className='flex-1 min-w-0'>
                        <p className='text-sm font-semibold text-gray-900 truncate'>{session?.user?.name}</p>
                        <p className='text-xs text-muted-foreground truncate'>{session?.user?.email}</p>
                    </div>
                </div>
            ) : (
                <div className='flex items-center gap-2 mb-3 p-2 rounded-lg bg-gray-50'>
                    <User className='w-4 h-4 text-muted-foreground' />
                    <p className='text-xs text-muted-foreground'>Not signed in</p>
                </div>
            )}
            
            <div className='flex flex-col gap-1'>
                <Link href="/" className='flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-sm text-muted-foreground hover:text-gray-900'>
                    <HelpCircle className='w-4 h-4' />
                    <span>Help & Support</span>
                </Link>
                {session && (
                    <button
                        onClick={async () => {
                            await logout()
                            // Force session refresh after logout
                            setSession(null)
                        }}
                        className='flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-100 transition-colors text-sm text-muted-foreground hover:text-gray-900 w-full text-left'
                    >
                        <LogOut className='w-4 h-4' />
                        <span>Sign Out</span>
                    </button>
                )}
            </div>
        </SidebarFooter>
    </Sidebar>
  )
}

export default ConsoleSidebar