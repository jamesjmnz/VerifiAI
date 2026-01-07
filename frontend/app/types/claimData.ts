export type ClaimData = {
    id: number
    userId: string
    text: string
    createdAt: string
    result: {
        id: number
        claimId: number
        analysis: string
        verdict: "FAKE" | "LEGIT" | "UNCERTAIN"
        potential_fake_score: number | null
        score_breakdown: any
        createdAt: string
        sources: string[]
    } | null
}