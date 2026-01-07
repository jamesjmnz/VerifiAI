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
import { cn, formatDate, truncate } from '@/lib/utils'
import { VerificationResult } from '@/app/types/verify'
import { fetchMyClaims } from '@/lib/api/claims'
import { ClaimData } from '@/app/types/claimData'
import ClaimResultModal from '@/components/ui/claimResultModal'

const History = () => {
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [claims, setClaims] = useState<ClaimData[]>([])
    const headTable = ["Claim", "Source", "Verdict", "Date", "Action"]
    const [error, setError] = useState<string | null>(null);
    const [verdictFilter, setVerdictFilter] = useState<string>("default")
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedClaim, setSelectedClaim] = useState<ClaimData | null>(null);
    

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

      let filtered = claims;

      
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            filtered =  filtered.filter((claim) => claim.text.toLowerCase().includes(query))
        } 

        if (verdictFilter && verdictFilter != "default" ) {
          filtered = filtered.filter((claim) => claim?.result?.verdict === verdictFilter)
        }

        return filtered
    }, [searchQuery, claims, verdictFilter])

   
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


    {claims.length > 0 ? (
      <>  
         <main className='gap-5 flex flex-col'>
        <div className='flex gap-5'>
            <div className='relative flex-1'>
                <span className='absolute  text-muted-foreground top-1/2 -translate-y-1/2 left-3'><Search className='h-4 w-4' /></span>
                <Input className='pl-10' placeholder='Search' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} /> 
               
            </div>
            <div>
            <Select onValueChange={(value) => setVerdictFilter(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a verdict" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Verdicts</SelectLabel>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="FAKE">Fake</SelectItem>
          <SelectItem value="LEGIT">Legit</SelectItem>
          <SelectItem value="UNCERTAIN">Uncertain</SelectItem>
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
                        <TableHead key={h} className={cn("text-center", h === "Claim" && "w-[300px]")}>
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
                 <TableCell className='text-center font-medium py-0 whitespace-normal  '>{truncate(claim?.text || "", 100)}</TableCell>
                 <TableCell className='text-center text-muted-foreground py-5'>{claim?.result?.sources.length + " Verified Sources"  }</TableCell>
                 <TableCell className='text-center py-5'><span className={cn('rounded-lg px-4 py-1 text-xs', verdictInfo.style)}>{verdictInfo.full_verdict}</span></TableCell>
                 <TableCell className='text-center text-muted-foreground'>{formatDate(claim?.result?.createdAt || "")}</TableCell>
                 <TableCell className='text-center py-6'>
                   <Button 
                     className='text-xs hover:cursor-pointer' 
                     variant={"outline"}
                     onClick={() => {
                       setSelectedClaim(claim);
                       setIsModalOpen(true);
                     }}
                   >
                     View
                   </Button>
                 </TableCell>
                 </TableRow>
               )})}
             
             

                
            </TableBody>
        </Table>
    </div>

         

        </main>

      </>
    ) : <>
      <p>No data found.</p>
    </>}

    {selectedClaim && (
      <ClaimResultModal 
        open={isModalOpen} 
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            setSelectedClaim(null);
          }
        }} 
        claim={selectedClaim}
      />
    )}
       
    </div>
  )
}

export default History