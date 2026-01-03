import asyncio
from typing import Dict

from app.agents.domain_trust_agent import domain_trust_score
from app.agents.fake_news_model_agent import fake_news_model_score
from app.agents.google_factcheck_agent import google_factcheck_score
from app.agents.semantic_crossref_agent import semantic_crossref_score
from app.models.state import VerificationState


def _validate_score(score, default: int, max_value: int, scorer_name: str) -> int:
    """
    Validates and normalizes a score to ensure it's a valid integer.
    Returns default if score is None or invalid.
    """
    if score is None:
        print(f"[WARNING] {scorer_name} returned None, using default: {default}")
        return default
    
    try:
        score_int = int(score)
        # Clamp to valid range
        score_int = max(0, min(max_value, score_int))
        return score_int
    except (ValueError, TypeError):
        print(f"[WARNING] {scorer_name} returned invalid score: {score}, using default: {default}")
        return default


async def scoring_node(state: VerificationState) -> VerificationState:
    """
    Runs ONLY when verdict == 'UNCERTAIN'.
    Runs independent scorers in parallel.
    Produces:
      - potential_fake_score (0–100)
      - score_breakdown (dict)
    """

    if state.get("verdict") != "UNCERTAIN":
        return state

    claim = state.get("claim", "")
    search_results = state.get("search_results", [])

    loop = asyncio.get_running_loop()

    # CPU-ish tasks offloaded
    domain_task = loop.run_in_executor(None, domain_trust_score, search_results)
    semantic_task = loop.run_in_executor(None, semantic_crossref_score, claim, search_results)
    fake_model_task = loop.run_in_executor(None, fake_news_model_score, claim)
    factcheck_task = google_factcheck_score(claim)

    # Gather all tasks with error handling
    try:
        domain_score, semantic_score, factcheck_score, fake_model_score = await asyncio.gather(
            domain_task, 
            semantic_task, 
            factcheck_task, 
            fake_model_task,
            return_exceptions=True
        )
    except Exception as e:
        print(f"[ERROR] Failed to gather scorer results: {e}")
        # Use defaults if gathering fails
        domain_score = semantic_score = factcheck_score = fake_model_score = None

    # Handle exceptions from individual scorers
    if isinstance(domain_score, Exception):
        print(f"[ERROR] domain_trust_score failed: {domain_score}")
        domain_score = None
    if isinstance(semantic_score, Exception):
        print(f"[ERROR] semantic_crossref_score failed: {semantic_score}")
        semantic_score = None
    if isinstance(factcheck_score, Exception):
        print(f"[ERROR] google_factcheck_score failed: {factcheck_score}")
        factcheck_score = None
    if isinstance(fake_model_score, Exception):
        print(f"[ERROR] fake_news_model_score failed: {fake_model_score}")
        fake_model_score = None

    # Validate and normalize all scores
    breakdown = {
        "domain_trust": _validate_score(domain_score, 15, 30, "domain_trust_score"),      # 0–30
        "semantic_crossref": _validate_score(semantic_score, 12, 25, "semantic_crossref_score"),  # 0–25
        "google_factcheck": _validate_score(factcheck_score, 10, 20, "google_factcheck_score"),     # 0–20
        "fake_news_model": _validate_score(fake_model_score, 12, 25, "fake_news_model_score"),    # 0–25
    }

    total = sum(breakdown.values())
    total = max(0, min(100, int(total)))

    state["score_breakdown"] = breakdown
    state["potential_fake_score"] = total

    return state

