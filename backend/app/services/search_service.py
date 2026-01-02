import time
from typing import Dict, List
from dotenv import load_dotenv
import asyncio
from langchain_tavily import TavilySearch

load_dotenv()

class SearchService:
    def __init__(self):
        self.search_tool = TavilySearch(max_results = 2, search_depth="basic", include_answer="basic")


    async def batch_search(self, queries: List[str]) -> List[Dict]:
        async def search_query(i: int, query: str) -> List[Dict]:
            try:
                query_start = time.time()
                print(f"[TIMING] [SEARCH] Query {i}/{len(queries)}: {query[:50]}...")
                results = await self.search_tool.ainvoke({"query": query})
                query_time = time.time() - query_start
                print(f"[TIMING] [SEARCH] Query {i} completed in {query_time:.2f}s")
                return results.get("results", [])
            except Exception as e:
                print(f"[ERROR] Error searching for query '{query}': {e}")
                return []

        # Run all searches in parallel
        tasks = [search_query(i, query) for i, query in enumerate(queries, 1)]
        results_list = await asyncio.gather(*tasks)
        
        # Flatten the results
        all_results = []
        for results in results_list:
            all_results.extend(results)
        
        return all_results


search_service = SearchService()
