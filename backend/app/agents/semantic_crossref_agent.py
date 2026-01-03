from typing import Dict, List
from sentence_transformers import SentenceTransformer
import numpy as np

_model = SentenceTransformer("BAAI/bge-m3")

MAX_RISK = 25

def _extract_texts(search_results: List[Dict]) -> List[str]:
     """
    Extract meaningful evidence texts.
    Filters out low-information snippets.
    """
    
     texts = []
     for r in search_results:
        text = (r.get("content") or "").strip()
        if text:  # Only add non-empty texts
            texts.append(text)

     return texts

def _cosine_similarity(a: np.ndarray, b: np.ndarray) -> np.ndarray:
    """
    Compute cosine similarity between two arrays.
    a: shape (1, dim) - single claim embedding
    b: shape (n, dim) - multiple text embeddings
    Returns: shape (n,) - similarity scores
    """
    # Since embeddings are already normalized (normalize_embeddings=True),
    # we can use dot product directly
    # a @ b.T gives (1, n), then take [0] to get (n,)
    return (a @ b.T)[0]

def semantic_crossref_score(claim: str, search_results: List[Dict]) -> int:
    """
    Semantic Cross-Reference Risk Score (0–25)

    Measures how strongly independent sources
    semantically support the claim.

    LOW risk  → strong agreement
    HIGH risk → weak or no agreement
    
    Returns MAX_RISK if no search results or encoding fails.
    """

    if not search_results:
        return MAX_RISK

    texts = _extract_texts(search_results)
    
    if not texts:
        return MAX_RISK

    try:
        claim_emb = _model.encode([claim], normalize_embeddings=True, show_progress_bar=False)
        text_embs = _model.encode(texts, normalize_embeddings=True, show_progress_bar=False)
    except Exception as e:
        print(f"[ERROR] semantic_crossref_score encoding failed: {e}")
        return MAX_RISK

    try:
        # Compute cosine similarity using numpy
        # claim_emb is (1, dim), text_embs is (n, dim)
        # Result is (n,) - similarity of claim to each text
        similarities = _cosine_similarity(claim_emb, text_embs)
        avg_similarity = float(np.mean(similarities))
    except Exception as e:
        print(f"[ERROR] semantic_crossref_score similarity computation failed: {e}")
        return MAX_RISK

    if avg_similarity >= 0.85:
        return 2      # strong agreement
    elif avg_similarity >= 0.72:
        return 6      # good agreement
    elif avg_similarity >= 0.60:
        return 12     # weak agreement
    else:
        return 18     # no agreement / contradiction