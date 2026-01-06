import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()

        const claim = await prisma.claim.create({
            data: {
                text: body.text,
                userId: body.userId
            }
        })

        return NextResponse.json(claim)

    } catch (error) {
        return NextResponse.json(
            {error: "Failed to create claim."},
            {status: 500}
        )
    }
}