import time
from app.services.llm_service import llm_service
from app.models.state import VerificationState
from app.utils.json_parser import safe_json_parse


def query_generator_node(state: VerificationState) -> VerificationState:
    start_time = time.time()
    print("[TIMING] [QUERY_GENERATOR] Starting query generation...")
    
    claim = state["claim"]
    

    prompt = f"""You are a fact-checking assistant. Generate 2 diverse and effective search queries to verify the following claim.

Claim to verify: {claim}

Instructions:
1. Create queries that are specific, keyword-rich, and optimized for search engines
2. Vary the query structure and focus to capture different aspects of the claim
3. CRITICAL: Generate queries that actively look for:
   - DEBUNKING articles and fact-checks that disprove the claim
   - OFFICIAL government/institutional sources that confirm or deny the claim
   - Contradictory evidence and corrections
   - Verification from authoritative sources (not just mentions)
4. For each query, prioritize finding:
   - Fact-checking sites (Snopes, FactCheck.org, Rappler, etc.) that verify this specific claim
   - Official statements from relevant government agencies or institutions
   - News articles that investigate and verify the claim (not just report it)
5. Use specific keywords from the claim, but also include:
   - Terms like "fact check", "debunk", "verify", "official", "confirmed"
   - Related terms that might reveal if the claim is misinformation
6. Make queries concise and search-engine friendly
7. Ensure queries are diverse - one should focus on official sources, another on fact-checking/debunking

AVOID:
   - Generic or broad queries that don't mention specific details from the claim
   - Queries that are too vague or abstract
   - Queries that only search for mentions of the claim (we need verification, not just mentions)

Output format: Return ONLY a valid Python list of strings, nothing else. Example format:
["query 1", "query 2"]

Generate the 2 search queries now:"""

    llm_start = time.time()
    response = llm_service.invoke(prompt)
    llm_time = time.time() - llm_start
    print(f"[TIMING] [QUERY_GENERATOR] LLM call took {llm_time:.2f}s")

    try:
        search_queries = safe_json_parse(response, expected_type=list)
        # Validate all items are strings
        if not all(isinstance(q, str) for q in search_queries):
            raise ValueError("Not all query items are strings")
    except Exception as e:
        print(f"[ERROR] Failed to parse LLM response. Raw response: {response[:500]}")
        raise ValueError(f"Invalid list format from LLM: {e}")

    
    state["search_queries"] = search_queries
    
    total_time = time.time() - start_time
    print(f"[TIMING] [QUERY_GENERATOR] Completed in {total_time:.2f}s")

    return state

   


