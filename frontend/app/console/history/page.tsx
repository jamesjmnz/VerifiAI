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
import React, { useState, useMemo, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { cn, truncate } from '@/lib/utils'
import { VerificationResult } from '@/app/types/verify'
import { fetchMyClaims } from '@/lib/api/claims'
import { ClaimData } from '@/app/types/claimData'

const History = () => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [claims, setClaims] = useState<ClaimData[]>([])
    const headTable = ["Claim", "Source", "Verdict", "Date", "Action"]
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
      const loadClaims = async () => {
        try {
          const data = await fetchMyClaims()
          setClaims(data);
        } catch(err) {
            setError("Failed to load claims")
        } finally {
          setLoading(false)
        }
      }

      loadClaims()

    }, [])

    const verdictStyle = [
        {
            verdict: "FAKE",
            full_verdict: "Fake News",
            style: "bg-red-500/10 text-red-600 border-red-500/20 font-semibold"
        },
        {
            verdict: "LEGIT",
            full_verdict: "Legitimate",
            style: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 font-semibold"
        },
        {
            verdict: "UNCERTAIN",
            full_verdict: "Uncertain",
            style: "bg-amber-500/10 text-amber-600 border-amber-500/20 font-semibold"
        }
    ]

    const filteredData = useMemo(() => {


        


        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            return claims.filter((claim) => claim.text.toLowerCase().includes(query))
        } else {
            return claims
        }
    }, [searchQuery, claims])

   
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;



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
               {filteredData.map((claim, i) => {
                 const verdictInfo = verdictStyle.find(v => v.verdict === claim?.result?.verdict) || verdictStyle[0];
                 return (
                 <TableRow key={i} className=''>
                 <TableCell className='text-center py-6 '>{truncate(claim?.text || "", 50)}</TableCell>
                 <TableCell className='text-center text-muted-foreground py-6'>{truncate(claim?.result?.sources?.join(", ") || "", 50)}</TableCell>
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