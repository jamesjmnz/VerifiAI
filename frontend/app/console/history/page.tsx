import { Input } from '@/components/ui/input'
import { Clock } from 'lucide-react'
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


  return (
    <div className='max-w-7xl mx-auto'>

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

        <div className='flex gap-5'>
            <div className='w-full'>
                <Input />
            </div>
            <div>
            <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
            </div>
            <div>
                <Button variant={"outline"}>Oldest First</Button>
            </div>
        </div>

    <div>
        <Table>
            <TableCaption>6 of 6 Fact Checks</TableCaption>
            <TableHeader>
                <TableRow className='bg-gray-100'>
                    {headTable.map((h) => (
                        <TableHead key={h} className={cn("text-center", h === "Claim" && "w-[200px]")}>
                            {h}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableCell className='text-center'>COVID-19 vaccines contain microchips for tracking</TableCell>
                <TableCell className='text-center'>https://twitter.com/user/status/123456789</TableCell>
                <TableCell className='text-center'>Fake News</TableCell>
                <TableCell className='text-center'>Jan 15, 2024 at 10:30 AM</TableCell>
                <TableCell className='text-center'>View</TableCell>
            </TableBody>
        </Table>
    </div>

    </div>
  )
}

export default History