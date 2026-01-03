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
        <SidebarContent className='px-5'>
            <SidebarGroup>
                <SidebarGroupLabel>Console</SidebarGroupLabel>
            </SidebarGroup>
            <SidebarMenu>
            {items.map((i) => {
                const isActive = pathname === i.url
                return (
                <SidebarMenuItem key={i.label}>
                    <SidebarMenuButton className={`py-5 ${isActive ? 'bg-blue-500 text-white' : ''}`} asChild>
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