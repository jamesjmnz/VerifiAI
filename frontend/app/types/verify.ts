export type scoreBreakdown = {
    domain_trust: number
    semantic_crossref: number
    google_factcheck: number
    fake_news_model: number
}

export type VerificationResult = {
    claim: string
    verdict: "FAKE" | "LEGIT" | "UNCERTAIN"
    analysis: string
    sources: string[]
    potential_fake_score?: number
    score_breakdown?: scoreBreakdown
    icon?: any
}

