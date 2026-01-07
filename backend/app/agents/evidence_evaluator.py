import time
from datetime import datetime
from urllib.parse import urlparse
from app.models.state import VerificationState
from app.services.llm_service import llm_service
from app.utils.json_parser import safe_json_parse


def evidence_evaluator_node(state: VerificationState) -> VerificationState:
    start_time = time.time()
    print(f"[TIMING] [EVIDENCE_EVALUATOR] Starting evaluation with {len(state['search_results'])} results...")
    
    claim = state["claim"]
    results = state["search_results"]
    current_date = datetime.now().date().isoformat()

    # Optimize sources text construction with better domain identification
    sources_parts = []
    for i, r in enumerate(results, 1):
        title = r.get("title", "")
        content = r.get("content", "")
        url = r.get("url", "")
        # Extract domain for better identification of official pages
        domain = ""
        if url:
            try:
                parsed = urlparse(url)
                domain = parsed.netloc.replace("www.", "")
            except:
                pass
        
        source_info = f"Source {i}\nTitle: {title}\nContent: {content}\nURL: {url}"
        if domain:
            source_info += f"\nDomain: {domain}"
        sources_parts.append(source_info)
    sources_text = "\n\n".join(sources_parts)

    print("==========" * 2)
    print(f"SOURCES:\n\n {sources_text}")

    # Concise prompt for faster processing
    prompt = f"""Fact-check this claim. Be appropriately skeptical: strict for controversial claims, reasonable for straightforward factual claims.

CLAIM: {claim}
DATE: {current_date}

RULES:
1. Adjust skepticism by claim type: Require strong proof for controversial/political claims; accept primary reporting for straightforward factual events (sports results, personal achievements, public events, etc.)
2. CRITICAL DISTINCTION: 
   - "Articles mentioning a claim" = articles that just reference/quote the claim without reporting the underlying event
   - "Articles reporting the same event" = articles that independently report the actual event/fact with matching details
   - If multiple sources independently report the SAME event with matching key facts (names, dates, outcomes), that is CONFIRMATION, not just mention
3. LEGIT when: 
   - One authoritative source (government, fact-checker, major news org) directly confirms the claim, OR
   - Multiple independent sources (2+ news sites, social media from news orgs, YouTube channels) report the same event with matching key facts
   - For straightforward claims (sports, achievements, events): Multiple sources reporting same story = LEGIT
4. FAKE ONLY if: there is evidence it's false (contradicted by official sources, debunked by fact-checkers, contains proven factual errors). DO NOT mark as FAKE just because no credible sources found.
5. UNCERTAIN if: no credible sources found, evidence is insufficient, conflicting, ambiguous, or sources are unreliable/contradictory. When in doubt or lacking evidence, default to UNCERTAIN.
6. Source hierarchy: Official statements > Fact-checkers (Snopes, FactCheck.org) > Reputable news (including official social media pages) > News websites/blogs > Random social media/blogs
7. IMPORTANT: Official social media pages of reputable news organizations (e.g., facebook.com/inquirerdotnet, twitter.com/inquirerdotnet, threads.com/@philstarlife) should be treated as REPUTABLE NEWS sources, NOT as low-quality social media. Look for verified pages, official domain names in URLs, or clear indicators that it's the official page of a known news organization.
8. Multiple source confirmation: When 2+ independent sources (news sites, news org social media, YouTube news channels) report the same factual claim with matching details, treat as LEGIT. This is especially true for non-controversial claims (sports, achievements, public events).
9. Prefer recent credible sources
10. CRITICAL: Absence of evidence ≠ evidence of falsehood. If no credible sources exist, use UNCERTAIN, not FAKE. Only use FAKE when there's positive evidence the claim is false.

SOURCES:
{sources_text}

SOURCE EVALUATION GUIDELINES:
- If a URL is from facebook.com, twitter.com, threads.com, or other social media platforms, check if it's an OFFICIAL page of a reputable news organization:
  * Look for verified badges, official page names matching known news orgs (e.g., "Inquirer.net", "Philippine Daily Inquirer", "Rappler", "ABS-CBN News", "GMA News", "CNN Philippines", "PhilStar Life")
  * Official news org social media pages should be treated as REPUTABLE NEWS sources
  * Examples: facebook.com/inquirerdotnet, facebook.com/rapplerdotcom, twitter.com/inquirerdotnet, threads.com/@philstarlife
- Random social media posts from individuals or unverified pages = low quality
- Official news organization websites (inquirer.net, rappler.com, thesummitexpress.com, etc.) = acceptable quality for factual reporting
- Official news organization social media pages = acceptable quality (same as their websites)
- YouTube channels from news organizations = acceptable quality
- For straightforward factual claims: If multiple sources (news sites, news org social media) independently report the same story with matching details, that confirms the claim

Return ONLY valid JSON:
{{
  "verdict": "FAKE", "LEGIT", or "UNCERTAIN",
  "analysis": "Write a general, natural explanation without mentioning specific sources, titles, URLs, or publication names. Focus on the facts and evidence. If LEGIT, explain what confirms it. If FAKE, explain specific contradictions, debunks, or proven falsehoods. If UNCERTAIN, explain why evidence is insufficient, no credible sources found, conflicting, or ambiguous. Write as if explaining to someone without citing sources.",
  "sources": ["url1", "url2", ...]
}}

Sources: Include URLs from sources that directly support or contradict the claim (0-5 URLs). If multiple sources independently report the same event with matching facts, include their URLs. Empty array only if no sources directly relevant."""

    llm_start = time.time()
    response = llm_service.invoke(prompt)
    llm_time = time.time() - llm_start
    print(f"[TIMING] [EVIDENCE_EVALUATOR] LLM call took {llm_time:.2f}s")

    try:
        parsed = safe_json_parse(response, expected_type=dict)
        
        # Extract and validate fields
        verdict = parsed.get("verdict", "").upper()
        if verdict not in ["FAKE", "LEGIT", "UNCERTAIN"]:
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