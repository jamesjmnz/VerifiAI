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
import React from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const History = () => {

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
            verdict: "misleading",
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
            verdict: "misleading",
            confidenceScore: 58,
            explanation: "While sugar intake before sleep can affect sleep quality, there's no direct scientific link between ice cream and nightmares specifically.",
            timestamp: new Date("2024-01-10T20:30:00"),
          },
    ]


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
                <Input className='pl-10' placeholder='Search' /> 
               
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
               {mockHistory.map((history) => (
                 <TableRow className=''>
                 <TableCell className='text-center py-6'>{history.extractedClaim}</TableCell>
                 <TableCell className='text-center text-muted-foreground py-6'>{history.postUrl}</TableCell>
                 <TableCell className='text-center py-6'><span className='bg-red-100 text-red-500 font-semibold rounded-lg px-4 py-1 text-xs'>{history.verdict}</span></TableCell>
                 <TableCell className='text-center text-muted-foreground py-6'>Jan 15, 2024 at 10:30 AM</TableCell>
                 <TableCell className='text-center py-6'>View</TableCell>
                 </TableRow>
               ))}
             

                
            </TableBody>
        </Table>
    </div>
        </main>

    </div>
  )
}

export default History