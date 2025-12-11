
from fastapi import APIRouter, HTTPException

from app.models.schema import VerificationRequest, VerificationResponse
from app.services.verification_service import verification_service


router = APIRouter(prefix="/api/v1/verification", tags=["verification"])

@router.post("/verify", response_model=VerificationResponse)
async def verify_claim(request: VerificationRequest):
    try:
        result = await verification_service.verify_claim(request.claim)
        return result
    except Exception as e:
        print(e)
        raise HTTPException(status_code=500, detail=f"Verification failed: {str(e)}")