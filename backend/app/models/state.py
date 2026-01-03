

import operator
from typing import Annotated, Dict, List, Optional, TypedDict


class VerificationState(TypedDict):
    claim: str
    search_queries: List[str]
    search_results : Annotated[List[Dict], operator.add]
    analysis: str
    verdict: str
    sources: List[str]
    potential_fake_score: Optional[int]
    score_breakdown: Optional[Dict[str, int]]
