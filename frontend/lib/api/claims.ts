export async function createClaim(data: {
    userId: string,
    text: string
}) {
    const res = await fetch("/api/claims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
    }

    return res.json()
}

export async function verifyClaimResult(claimId: number) {
    const res = await fetch(`/api/claims${claimId}/result`, {
        method: "POST",
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
    }

    return res.json()
}