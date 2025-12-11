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
3. Include queries targeting:
   - Official government sources and authoritative institutions
   - Recent news articles from reputable sources
   - Fact-checking organizations and debunking articles
4. Use specific keywords from the claim, but also include related terms that might reveal verification or debunking information
5. Make queries concise and search-engine friendly
6. Ensure queries are diverse - don't just rephrase the same question

AVOID:
   - Generic or broad queries that don't mention specific details from the claim
   - Queries that are too vague or abstract

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

   


