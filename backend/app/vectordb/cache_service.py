# app/vectordb/cache_service.py
from datetime import datetime
from langchain_core.documents import Document
from app.vectordb.qdrant_store import vectorstore

SIMILARITY_THRESHOLD = 0.85

def search_cached_claim(claim: str):
    results = vectorstore.similarity_search_with_score(
        query=claim,
        k=1
    )

    if not results:
        return None

    doc, score = results[0]
    metadata = doc.metadata

    if score >= SIMILARITY_THRESHOLD:
        return {
            "verdict": metadata.get("verdict"),
            "confidence": metadata.get("confidence"),
            "analysis": metadata.get("analysis"),
            "sources": metadata.get("sources", []),
            "checked_at": metadata.get("checked_at"),
            "cached": True,
            "similarity": score
        }

    return None


def save_claim_to_cache(claim: str, result: dict):
    content = f"""
    Claim: {claim}
    Verdict: {result['verdict']}
    Summary: {result['analysis'][:300]}
    """

    doc = Document(
        page_content=content,
        metadata={
            "claim": claim,
            "verdict": result["verdict"],
            "confidence": result.get("confidence"),
            "analysis": result.get("analysis"),
            "sources": result.get("sources", []),
            "checked_at": datetime.utcnow().isoformat()
        }
    )

    vectorstore.add_documents([doc])
