

from enum import Enum
from typing import List, Optional, Dict

from pydantic import BaseModel


class VerdictEnum(str, Enum):
    FAKE = "FAKE"
    LEGIT = "LEGIT"
    UNCERTAIN = "UNCERTAIN"

class VerificationRequest(BaseModel):
    claim: str

class VerificationResponse(BaseModel):
    claim: str
    analysis: str
    verdict: VerdictEnum
    sources: List[str]
    #when verdict == UNCERTAIN
    potential_fake_score: Optional[int] = None        # 0–100
    score_breakdown: Optional[Dict[str, int]] = None  # per-agent
