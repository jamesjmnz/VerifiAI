# Confidence scores (0–1)
from re import L
from typing import Dict, List
from urllib.parse import urlparse



DOMAIN_TRUST_SCORES = {
    # Tier 1: Government
    "gov.ph": 0.95,
    "pia.gov.ph": 0.95,
    "pna.gov.ph": 0.95,
    "gov": 0.90,
    "edu.ph": 0.85,
    "edu": 0.80,

    # Tier 2: Fact-checkers
    "verafiles.org": 0.90,
    "rappler.com": 0.85,

    # Tier 3: Established news
    "inquirer.net": 0.82,
    "philstar.com": 0.82,
    "gmanetwork.com": 0.80,
    "abs-cbn.com": 0.78,
    "mb.com.ph": 0.75,
    "manilatimes.net": 0.75,
    "sunstar.com.ph": 0.75,
    "baguiomidlandcourier.com.ph": 0.75,

    # Tier 4: Organizations
    "org.ph": 0.70,
    "org": 0.65,

    # Tier 5: Social media
    "facebook.com": 0.45,
    "reddit.com": 0.50,
    "twitter.com": 0.45,
    "x.com": 0.45,
    "youtube.com": 0.50,
    "tiktok.com": 0.40,

    # Tier 6: User-generated
    "change.org": 0.40,
    "medium.com": 0.50,
    "wordpress.com": 0.45,
}

MAX_RISK = 25  # domain trust max contribution


def _match_domain(domain: str) -> float | None:
    """
    Find the best matching confidence score for a domain.
    Uses exact match first, then suffix match.
    """

    if not domain:
        return None


    if domain in DOMAIN_TRUST_SCORES:
        return DOMAIN_TRUST_SCORES[domain]

    for key, score in DOMAIN_TRUST_SCORES.items():
        if domain.endswith(key):
            return score
    
    return None


def domain_trust_score(search_results: List[Dict]) -> int:
    """
    Converts domain confidence into risk score (0–25)
    Higher score = higher risk
    """

    if not search_results:
        return None

    url = search_results[0].get("url")
    if not url:
        return MAX_RISK

    try:
        domain = urlparse(url).netloc.replace("www", "")
    except Exception:
        return MAX_RISK

    confidence = _match_domain(domain)

    if confidence is None:
        confidence = 0.55

    risk = (1.0 - confidence) * MAX_RISK

    return round(risk)
    

    