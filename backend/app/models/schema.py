

from enum import Enum
from typing import List

from pydantic import BaseModel


class VerdictEnum(str, Enum):
    FAKE = "FAKE"
    LEGIT = "LEGIT"

class VerificationRequest(BaseModel):
    claim: str

class VerificationResponse(BaseModel):
    claim: str
    analysis: str
    verdict: VerdictEnum
    sources: List[str]