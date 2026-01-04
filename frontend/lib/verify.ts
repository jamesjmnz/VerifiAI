import { VerificationResult } from "@/app/types/verify";

// Get API URL from environment variable, with fallback for local development
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export async function verifyClaim(claim: string): Promise<VerificationResult> {
    const res = await fetch(`${API_URL}/api/v1/verification/verify`, {
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