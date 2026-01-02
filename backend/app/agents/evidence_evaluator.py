import time
from datetime import datetime
from app.models.state import VerificationState
from app.services.llm_service import llm_service
from app.utils.json_parser import safe_json_parse


def evidence_evaluator_node(state: VerificationState) -> VerificationState:
    start_time = time.time()
    print(f"[TIMING] [EVIDENCE_EVALUATOR] Starting evaluation with {len(state['search_results'])} results...")
    
    claim = state["claim"]
    results = state["search_results"]
    current_date = datetime.now().date().isoformat()

    # Optimize sources text construction
    sources_parts = []
    for i, r in enumerate(results, 1):
        title = r.get("title", "")
        content = r.get("content", "")
        url = r.get("url", "")
        sources_parts.append(f"Source {i}\nTitle: {title}\nContent: {content}\nURL: {url}")
    sources_text = "\n\n".join(sources_parts)

    print("==========" * 2)
    print(f"SOURCES:\n\n {sources_text}")

    # Concise prompt for faster processing
    prompt = f"""Fact-check this claim with extreme skepticism.

CLAIM: {claim}
DATE: {current_date}

RULES:
1. Require strong proof for controversial claims; primary reporting OK for benign events
2. Articles mentioning a claim ≠ proof it's true
3. LEGIT requires clear authoritative evidence directly confirming the claim
4. FAKE if: contradicts official sources, debunked, or contains factual errors
5. Source hierarchy: Official statements > Fact-checkers (Snopes, FactCheck.org) > Reputable news > Social media/blogs
6. "News reports X" ≠ X is true; "Official confirms X" = likely true; "Fact-checker debunks X" = false
7. Prefer recent credible sources

SOURCES:
{sources_text}

Return ONLY valid JSON:
{{
  "verdict": "FAKE" or "LEGIT",
  "analysis": "Detailed explanation with specific evidence. If LEGIT, explain what confirms it. If FAKE, explain contradictions or why false.",
  "sources": ["url1", "url2", ...]
}}

Sources: Include ONLY URLs that directly support/contradict the claim (0-5 URLs). One authoritative source is sufficient. Empty array if none directly relevant."""

    llm_start = time.time()
    response = llm_service.invoke(prompt)
    llm_time = time.time() - llm_start
    print(f"[TIMING] [EVIDENCE_EVALUATOR] LLM call took {llm_time:.2f}s")

    try:
        parsed = safe_json_parse(response, expected_type=dict)
        
        # Extract and validate fields
        verdict = parsed.get("verdict", "").upper()
        if verdict not in ["FAKE", "LEGIT"]:
            raise ValueError(f"Invalid verdict: {verdict}")
        
        analysis = parsed.get("analysis", "")
        if not analysis or not isinstance(analysis, str):
            raise ValueError("Analysis must be a non-empty string")
        
        sources = parsed.get("sources", [])
        if not isinstance(sources, list):
            raise ValueError("Sources must be a list")
        # Filter out empty strings and ensure all are strings
        sources = [s for s in sources if isinstance(s, str) and s.strip()]
        
        # Store in state
        state["verdict"] = verdict
        state["analysis"] = analysis
        state["sources"] = sources
        
    except Exception as e:
        print(f"[ERROR] Failed to parse LLM response. Raw response: {response[:500]}")
        raise ValueError(f"Invalid JSON format from LLM: {e}")

    total_time = time.time() - start_time
    print(f"[TIMING] [EVIDENCE_EVALUATOR] Completed in {total_time:.2f}s, verdict: {state['verdict']}, sources: {len(state['sources'])}")

    return state