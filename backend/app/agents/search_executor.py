import time
from app.services.search_service import search_service
from app.models.state import VerificationState


def search_executor_node(state: VerificationState) -> VerificationState:
    start_time = time.time()
    print(f"[TIMING] [SEARCH_EXECUTOR] Starting search for {len(state['search_queries'])} queries...")
    
    queries = state["search_queries"]
    
    search_start = time.time()
    results = search_service.batch_search(queries)
    search_time = time.time() - search_start
    print(f"[TIMING] [SEARCH_EXECUTOR] Search completed in {search_time:.2f}s")
    
    state["search_results"] = results
    
    total_time = time.time() - start_time
    print(f"[TIMING] [SEARCH_EXECUTOR] Completed in {total_time:.2f}s, found {len(results)} results")
    
    return state



