import { auth } from "@/lib/auth";
import { verifyClaim } from "@/lib/verify";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({headers: req.headers});

        if (!session?.user) {
            return NextResponse.json({error: "Unauthorized User"}, {status: 401})
        }

        const body = await req.json()
        const {claim} = body

        const verificationResult = await verifyClaim(claim)

        const savedClaim = await prisma.claim.create({
            data: {
                text: claim,
                userId: session.user.id
            }
        })

        const result = await prisma.claimResult.create({
            data: {
                claimId: savedClaim.id,
                verdict: verificationResult.verdict,
                analysis: verificationResult.analysis,
                potential_fake_score: verificationResult.potential_fake_score || null,
                score_breakdown: verificationResult.score_breakdown ? JSON.parse(JSON.stringify(verificationResult.score_breakdown)) : null,
                sources: verificationResult.sources,
            }
        })

        return NextResponse.json({
            ...verificationResult,
            claimId: savedClaim.id,
            resultId: result.id
        })


    } catch (error ){
        console.error("Verification error:", error);
        return NextResponse.json(
            { error: "Verification failed", details: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }

}