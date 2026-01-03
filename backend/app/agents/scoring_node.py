import asyncio
from typing import Dict

from app.agents.domain_trust_agent import domain_trust_score
from app.agents.fake_news_model_agent import fake_news_model_score
from app.agents.google_factcheck_agent import google_factcheck_score
from app.agents.semantic_crossref_agent import semantic_crossref_score


async def scoring_node(state: Dict) -> Dict:
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


    domain_score, semantic_score, factcheck_score, fake_model_score = await asyncio.gather(domain_task, semantic_task, factcheck_task, fake_model_task)

    breakdown = {
        "domain_trust": int(domain_score),           # 0–30
        "semantic_crossref": int(semantic_score),    # 0–25
        "google_factcheck": int(factcheck_score),    # 0–20
        "fake_news_model": int(fake_model_score),    # 0–25
    }

    total = sum(breakdown.values())

    total = max(0, min(100, int(total)))

    state["score_breakdown"] = breakdown
    state["potential_fake_score"] = total

    return state

