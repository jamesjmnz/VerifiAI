import { VerificationResult } from "@/app/types/verify";
import { Verification } from "next/dist/lib/metadata/types/metadata-types";


export async function verifyClaim(claim: string): Promise<VerificationResult> {
    const res = await fetch("http://localhost:8000/api/v1/verification/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({claim})
    })

    if (!res.ok) {
        throw new Error("Verification Failed")
    }

    return res.json()
}