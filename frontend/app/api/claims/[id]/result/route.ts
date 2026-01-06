import prisma from "@/lib/prisma";
import { verifyClaim } from "@/lib/verify";
import { NextResponse } from "next/server";


export async function POST(req: Request, {params}: {params: {id: string}}) {
   try {
    const claimId = Number(params.id)
    const claim = await prisma.claim.findUnique({
        where: {id: claimId}
    })

    if (!claim) {
        return NextResponse.json(
          { error: "Claim not found" },
          { status: 404 }
        )
    }

    const verification = await verifyClaim(claim.text)

    const result = await prisma.claimResult.create({
        data: {
            claimId,
            verdict: verification.verdict,
            analysis: verification.analysis,
            potential_fake_score: verification.potential_fake_score || null,
            score_breakdown: verification.score_breakdown ? JSON.parse(JSON.stringify(verification.score_breakdown)) : null ,
            sources: verification.sources


        }
    })

    return NextResponse.json(result)

   } catch (error) {
        return NextResponse.json(
            {error: "Verification Failed"},
            {status: 500}
        )
   }
}