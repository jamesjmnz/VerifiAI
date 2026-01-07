
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

export async function fetchMyClaims() {
    const res = await fetch("/api/claims", {
        method: "GET",
        credentials: "include",
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error)
    }

    return res.json()

}