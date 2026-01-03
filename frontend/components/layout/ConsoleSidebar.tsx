import React from 'react'
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
            {items.map((i) => (
                <SidebarMenuItem className=''>
                    <SidebarMenuButton className='py-5' asChild>
                        <a href={`${i.url}`}>
                            <i.icon />
                            <span>{i.label}</span>
                        </a>

                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        </SidebarContent>
        
    </Sidebar>
  )
}

export default ConsoleSidebar