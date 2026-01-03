import os
import httpx

FACTCHECK_URL = "https://factchecktools.googleapis.com/v1alpha1/claims:search"
API_KEY = os.getenv("GOOGLE_FACT_CHECK_API_KEY")

MAX_RISK = 20
DEFAULT_RATING = int(round((1 - 0.50) * MAX_RISK))

FACT_CHECK_RATINGS = {
    "true": 0.95,
    "accurate": 0.95,

    "mostly true": 0.85,
    "mostly accurate": 0.85,

    "half true": 0.60,
    "mixture": 0.55,

    "mostly false": 0.25,
    "mostly inaccurate": 0.25,

    "false": 0.10,
    "inaccurate": 0.10,

    "pants on fire": 0.05,

    "misleading": 0.20,
    "out of context": 0.30,

    "unproven": 0.50,
    "unverified": 0.50,

    "outdated": 0.40,
}

def _rating_confidence(textual_rating: str) -> float:
    """
    Returns confidence score (0–1) from textual rating.
    """

    rating = textual_rating.lower()

    for key, confidence in FACT_CHECK_RATINGS.items():
        if key in rating:
            return confidence

    return 0.50

async def google_factcheck_score(claim: str) -> int:
     """
    Google Fact Check API Risk Score (0–20)

    Uses HUMAN fact-check verdict confidence.
    """

     if not API_KEY:
        return DEFAULT_RATING

     try:
        async with httpx.AsyncClient(timeout=8) as client:
            response = await client.get(FACTCHECK_URL, params={"query": claim, "key": API_KEY, "pageSize": 3})

            data = response.json()

     except Exception:
        return DEFAULT_RATING
    

     claims = data.get("claims", [])
     if not claims:
        return DEFAULT_RATING
     reviews = claims[0].get("claimReview", [])
     if not reviews:
        return DEFAULT_RATING
     textual_rating = reviews[0].get("textualRating", "")
     if not textual_rating:
        return DEFAULT_RATING

     confidence = _rating_confidence(textual_rating)
     risk = (1.0 - confidence) * MAX_RISK

     return int(round(risk))
