from typing import Dict, List
from sentence_transformers import SentenceTransformer
from torch import cosine_similarity
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
        texts.append(text)

     return texts

def semantic_crossref_score(claim: str, search_results: List[Dict]) -> int:
    """
    Semantic Cross-Reference Risk Score (0–20)

    Measures how strongly independent sources
    semantically support the claim.

    LOW risk  → strong agreement
    HIGH risk → weak or no agreement
    """

    texts = _extract_texts(search_results)


    claim_emb = _model.encode([claim], normalize_embeddings=True)

    text_embs = _model.encode(texts, normalize_embeddings=True)

    
    similarities = cosine_similarity(claim_emb, text_embs)[0]
    avg_similarity = float(np.mean(similarities))

    if avg_similarity >= 0.85:
        return 2      # strong agreement
    elif avg_similarity >= 0.72:
        return 6      # good agreement
    elif avg_similarity >= 0.60:
        return 12     # weak agreement
    else:
        return 18     # no agreement / contradiction