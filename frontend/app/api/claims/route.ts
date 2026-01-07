import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({headers: req.headers})

    if (!session?.user?.id) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
          );
    }


    const claims = await prisma.claim.findMany({
        where: {
            userId: (session.user.id)
        },
        include: {
            result: true
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    return NextResponse.json(claims)


    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 })
    }

}