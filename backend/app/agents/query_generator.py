import time
from app.services.llm_service import llm_service
from app.models.state import VerificationState
from app.utils.json_parser import safe_json_parse


def query_generator_node(state: VerificationState) -> VerificationState:
    start_time = time.time()
    print("[TIMING] [QUERY_GENERATOR] Starting query generation...")
    
    claim = state["claim"]
    

    prompt = f"""You are a fact-checking assistant. Generate 2 search queries to verify the following claim.

Claim to verify: {claim}

CRITICAL REQUIREMENTS:
1. STAY CLOSE TO THE CLAIM: Use the exact key details, names, dates, numbers, and specific facts from the claim. Do not generalize or abstract away from the claim.
2. PRESERVE SPECIFIC DETAILS: Include all important specifics from the claim (who, what, when, where, how much, etc.)
3. Keep the core claim intact - only add fact-checking terms, don't change or remove the claim's essential details

Instructions:
1. Extract the key factual elements from the claim (names, places, dates, numbers, events, etc.)
2. Create 2 queries that:
   - Query 1: Include the claim's key details + "fact check" or "verify"
   - Query 2: Include the claim's key details + "debunk" or "official statement" or relevant authority name
3. Use the exact wording and specifics from the claim - don't paraphrase or generalize
4. Keep queries concise (under 15 words each)
5. Only add minimal fact-checking terms - the claim details should dominate the query

AVOID:
   - Changing or removing specific details from the claim
   - Generalizing the claim (e.g., if claim mentions "President X on date Y", don't make it "president statement")
   - Adding unrelated terms or concepts not in the claim
   - Making queries too abstract or vague
   - Straying from the claim's core message

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

   


