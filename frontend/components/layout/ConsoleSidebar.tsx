"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Terminal } from 'lucide-react'
import { History } from 'lucide-react'
import { LineChart } from 'lucide-react'

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"


  

const ConsoleSidebar = () => {
    const pathname = usePathname()
    
    const items = [
        {
            icon: Terminal,
            label: "Verify",
            url: "/console/verify"
        },
        {
            icon: History,
            label: "History",
            url: "/console/history"
        },
        {
            icon: LineChart,
            label: "Analytics",
            url: "/console/analytics"
        },
    ]


  return (
    <Sidebar>
        <SidebarGroup className='border-b'>
                <SidebarGroupLabel className='text-xl px-6 py-5 font-semibold'>VerifiAI</SidebarGroupLabel>
            </SidebarGroup>
        <SidebarContent className='px-5 gap-0'>
            <SidebarGroup>
                <SidebarGroupLabel className='font-semibold base px-0'>CONSOLE</SidebarGroupLabel>
            </SidebarGroup>
            <SidebarMenu>
            {items.map((i) => {
                const isActive = pathname === i.url
                return (
                <SidebarMenuItem key={i.label}>
                    <SidebarMenuButton className={`py-5 font-semibold ${isActive ? 'bg-blue-100 text-blue-500 hover:bg-blue-100 hover:text-blue-500 ' : ''}`} asChild>
                        <Link href={i.url}>
                            <i.icon />
                            <span>{i.label}</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
        </SidebarContent>
        
    </Sidebar>
  )
}

export default ConsoleSidebar