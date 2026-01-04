"use client"
import { Input } from '@/components/ui/input'
import { Clock, Search } from 'lucide-react'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import React, { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const History = () => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const headTable = ["Claim", "Source", "Verdict", "Date", "Action"]
    const mockHistory = [
        {
            id: "1",
            postUrl: "https://twitter.com/user/status/123456789",
            extractedClaim: "COVID-19 vaccines contain microchips for tracking",
            verdict: "fake",
            confidenceScore: 96,
            explanation: "This claim has been thoroughly debunked by multiple health organizations including WHO and CDC. No vaccines contain microchips or tracking devices.",
            timestamp: new Date("2024-01-15T10:30:00"),
          },
          {
            id: "2",
            postUrl: "https://facebook.com/post/987654321",
            extractedClaim: "New study shows coffee reduces heart disease risk",
            verdict: "legit",
            confidenceScore: 87,
            explanation: "Multiple peer-reviewed studies support moderate coffee consumption being associated with reduced cardiovascular risk.",
            timestamp: new Date("2024-01-14T14:22:00"),
          },
          {
            id: "3",
            postUrl: "https://news.example.com/article/5555",
            extractedClaim: "Electric cars are worse for the environment than gas cars",
            verdict: "uncertain",
            confidenceScore: 72,
            explanation: "While EV production has environmental impacts, lifecycle analyses show EVs typically have lower total emissions than gas vehicles.",
            timestamp: new Date("2024-01-13T09:15:00"),
          },
          {
            id: "4",
            postUrl: "https://reddit.com/r/science/comments/abc123",
            extractedClaim: "5G towers cause cancer in humans",
            verdict: "fake",
            confidenceScore: 98,
            explanation: "No scientific evidence supports this claim. 5G uses non-ionizing radiation that cannot damage DNA or cause cancer.",
            timestamp: new Date("2024-01-12T16:45:00"),
          },
          {
            id: "5",
            postUrl: "https://instagram.com/p/xyz789",
            extractedClaim: "Honey never spoils and has been found in ancient tombs",
            verdict: "legit",
            confidenceScore: 94,
            explanation: "Archaeological evidence confirms honey from Egyptian tombs thousands of years old was still edible due to its unique chemical properties.",
            timestamp: new Date("2024-01-11T11:00:00"),
          },
          {
            id: "6",
            postUrl: "https://tiktok.com/@user/video/111222333",
            extractedClaim: "Eating ice cream before bed causes nightmares",
            verdict: "uncertain",
            confidenceScore: 58,
            explanation: "While sugar intake before sleep can affect sleep quality, there's no direct scientific link between ice cream and nightmares specifically.",
            timestamp: new Date("2024-01-10T20:30:00"),
          },
    ]

    const verdictStyle = [
        {
            verdict: "fake",
            full_verdict: "Fake News",
            style: "bg-red-500/10 text-red-600 border-red-500/20 font-semibold"
        },
        {
            verdict: "legit",
            full_verdict: "Legitimate",
            style: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-semibold"
        },
        {
            verdict: "uncertain",
            full_verdict: "Uncertain",
            style: "bg-amber-500/10 text-amber-600 border-amber-500/20 font-semibold"
        }
    ]

    const filteredData = useMemo(() => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            return mockHistory.filter((item) => item.extractedClaim.toLowerCase().includes(query))
        } else {
            return mockHistory
        }
    }, [searchQuery])

   




  return (
    <div className='max-w-7xl mx-auto flex flex-col gap-10'>

        <header className='flex flex-col gap-1.5'>
            <div className='flex gap-3 items-center'>
                <div className='bg-blue-100 text-blue-500 rounded-lg p-2'>
                    <Clock />
                </div>
                <div>
                    <h1 className='text-3xl font-bold'>Fact Check History</h1>
                </div>
            </div>
            <div>
                <p className='text-muted-foreground'>
                    View and manage your past fact-checking verifications
                </p>
            </div>
        </header>



        <main className='gap-5 flex flex-col'>
        <div className='flex gap-5'>
            <div className='relative flex-1'>
                <span className='absolute  text-muted-foreground top-1/2 -translate-y-1/2 left-3'><Search className='h-4 w-4' /></span>
                <Input className='pl-10' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /> 
               
            </div>
            <div>
            <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a verdict" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Verdicts</SelectLabel>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="apple">Fake</SelectItem>
          <SelectItem value="banana">Legit</SelectItem>
          <SelectItem value="blueberry">Uncertain</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
            </div>
            <div>
                <Button variant={"outline"}>Oldest First</Button>
            </div>
        </div>



    <div className='border rounded-lg'>
        <Table>
            
            <TableHeader>
                <TableRow className='bg-gray-100'>
                    {headTable.map((h) => (
                        <TableHead key={h} className={cn("text-center", h === "Claim" && "w-[200px]")}>
                            {h}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className=''>
               {filteredData.map((history) => {
                 const verdictInfo = verdictStyle.find(v => v.verdict === history.verdict) || verdictStyle[0];
                 return (
                 <TableRow key={history.id} className=''>
                 <TableCell className='text-center py-6'>{history.extractedClaim}</TableCell>
                 <TableCell className='text-center text-muted-foreground py-6'>{history.postUrl}</TableCell>
                 <TableCell className='text-center py-6'><span className={cn('rounded-lg px-4 py-1 text-xs', verdictInfo.style)}>{verdictInfo.full_verdict}</span></TableCell>
                 <TableCell className='text-center text-muted-foreground py-6'>Jan 15, 2024 at 10:30 AM</TableCell>
                 <TableCell className='text-center py-6'>View</TableCell>
                 </TableRow>
               )})}
             
             

                
            </TableBody>
        </Table>
    </div>
        </main>

    </div>
  )
}

export default History