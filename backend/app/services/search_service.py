import time
from typing import Dict, List
from dotenv import load_dotenv
from langchain_tavily import TavilySearch

load_dotenv()

class SearchService:
    def __init__(self):
        self.search_tool = TavilySearch(max_results = 2, search_depth="advanced", include_answe="basic")


    def batch_search(self, queries: List[str]) -> List[Dict]:
        all_results = []

        for i, query in enumerate(queries, 1):
            try:
                query_start = time.time()
                print(f"[TIMING] [SEARCH] Query {i}/{len(queries)}: {query[:50]}...")
                results = self.search_tool.invoke({"query": query})
                query_time = time.time() - query_start
                print(f"[TIMING] [SEARCH] Query {i} completed in {query_time:.2f}s")
                
               
                all_results.extend(results["results"])
               
            except Exception as e:
                print(f"[ERROR] Error searching for query '{query}': {e}")
                pass

        
        return all_results


search_service = SearchService()
