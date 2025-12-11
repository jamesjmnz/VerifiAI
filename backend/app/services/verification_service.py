import time
from app.models.schema import VerdictEnum, VerificationResponse
from app.workflows.verification_workflow import create_verification_workflow


class VerificationService:
    def __init__(self):
        self.workflow = create_verification_workflow()

    async def verify_claim(self, claim: str) -> VerificationResponse:
        start_time = time.time()
        print(f"[TIMING] Starting verification for claim: {claim[:50]}...")
        
        initial_state = {
            "claim": claim,
            "search_queries": [],
            "search_results": [],
            "analysis": "",
            "verdict": "",
            "sources": []
        }

        workflow_start = time.time()
        final_state = await self.workflow.ainvoke(initial_state)
        workflow_time = time.time() - workflow_start
        print(f"[TIMING] Workflow completed in {workflow_time:.2f}s")

        total_time = time.time() - start_time
        print(f"[TIMING] Total verification time: {total_time:.2f}s")

        return VerificationResponse(
            claim=claim,
            analysis = final_state["analysis"],
            verdict = VerdictEnum(final_state["verdict"]),
            sources = final_state["sources"]
        )

verification_service = VerificationService()