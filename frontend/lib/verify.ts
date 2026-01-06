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

/**
 * Verify a claim and save it to the database
 * This function verifies the claim and automatically saves both the claim and result to the database
 * @param claim - The claim text to verify
 * @returns Promise with the verification result including claimId and resultId
 */
export async function verifyAndSaveClaim(claim: string): Promise<VerificationResult & { claimId: number; resultId: number }> {
    const res = await fetch("/api/verify", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ claim })
    })

    if (!res.ok) {
        const error = await res.json().catch(() => ({ error: "Verification Failed" }))
        throw new Error(error.error || "Verification Failed")
    }

    return res.json()
}