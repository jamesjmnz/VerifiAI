export type VerificationResult = {
    claim: string
    verdict: "FAKE" | "LEGIT"
    analysis: string
    sources: string[]
}

