export type VerificationResult = {
    claim: string
    verdict: "FAKE" | "LEGIT" | "UNCERTAIN"
    analysis: string
    sources: string[]
    icon?: any
}

