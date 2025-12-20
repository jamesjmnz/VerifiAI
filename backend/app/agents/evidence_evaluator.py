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

    sources_text = "\n\n".join([f"Source {i + 1}\nTitle:{r.get("title", "")}\nContent:{r.get("content", "")}\nURL:{r.get("url")}"for i, r in enumerate(results, 1)])


    print("==========" * 2)
    print(f"SOURCES:\n\n {sources_text}")


    prompt = f"""You are a professional fact-checker. Analyze this claim with EXTREME SKEPTICISM and RIGOR.

CLAIM: {claim}
TODAY (UTC): {current_date}

CRITICAL EVALUATION RULES:
1. DEFAULT TO SKEPTICISM: If evidence is unclear, contradictory, or insufficient, mark as FAKE
2. MENTION ≠ VERIFICATION: Articles that merely mention or report a claim do NOT prove it's true
3. REQUIRE POSITIVE PROOF: For LEGIT verdict, you MUST find clear, authoritative evidence that directly confirms the claim
4. CHECK FOR CONTRADICTIONS: If official sources contradict the claim, it's FAKE
5. VERIFY AGAINST KNOWN FACTS: If the claim contradicts established facts (e.g., "K-13" when the actual program is "K-12"), it's FAKE
6. SOURCE HIERARCHY (in order of credibility):
   - Official government/institutional statements and documents
   - Established fact-checking organizations (Snopes, FactCheck.org, Rappler, etc.)
   - Reputable news outlets with investigative reporting
   - Social media, blogs, and unverified sources are LOW credibility
7. LOOK FOR RED FLAGS:
   - Claims that contradict official records or established facts
   - Numbers, dates, or names that don't match official information
   - Claims that seem too good to be true or sensational
   - Lack of official confirmation despite being a significant claim
8. DISTINGUISH REPORTING vs PROVING:
   - "News article reports X" ≠ X is true
   - "Official source confirms X" = X is likely true
   - "Fact-checker debunks X" = X is false
9. TIMELINESS: Prefer recent, credible sources. Outdated sources may not reflect current reality.

VERDICT GUIDELINES:
- "FAKE": Claim is false, debunked, contradicts official sources, or contains factual errors
- "LEGIT": Claim is confirmed by authoritative sources with clear evidence

SOURCES: {sources_text}

Output format: Return ONLY a valid JSON object with the following structure, nothing else:
{{
  "verdict": "FAKE" or "LEGIT"
  "analysis": "Detailed explanation with evidence and contradictions. Be specific about what sources say. If marking as LEGIT, explain what evidence confirms it. If marking as FAKE, explain what contradicts it or why it's false.",
  "sources": ["url1", "url2", "url3", "url4", "url5"]
}}

CRITICAL: The "sources" array is REQUIRED and must contain 3-5 URLs from the provided sources that are most relevant and credible for verifying this claim. Only include URLs that were actually provided in the SOURCES section above. DO NOT return an empty sources array. If sources were provided above, you MUST include their URLs in the response.

Generate the analysis now:"""

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