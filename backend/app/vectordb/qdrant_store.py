import os
from qdrant_client import QdrantClient
from langchain_qdrant import QdrantVectorStore
from langchain_openai import OpenAIEmbeddings

QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
COLLECTION_NAME = os.getenv("QDRANT_COLLECTION_NAME", "verifiai_claims")

# Lazy loading - only initialize when needed
_embeddings = None
_qdrant_client = None
_vectorstore = None

def _get_vectorstore():
    """Lazy load Qdrant vectorstore only when needed."""
    global _embeddings, _qdrant_client, _vectorstore
    
    # Check if Qdrant is disabled
    if os.getenv("DISABLE_QDRANT", "false").lower() == "true":
        return None
    
    if _vectorstore is None:
        try:
            print("[INFO] Initializing Qdrant vectorstore (lazy load)...")
            _embeddings = OpenAIEmbeddings(
                model="text-embedding-3-small"
            )
            _qdrant_client = QdrantClient(url=QDRANT_URL)
            _vectorstore = QdrantVectorStore.from_existing_collection(
                client=_qdrant_client,
                collection_name=COLLECTION_NAME,
                embedding=_embeddings
            )
            print("[INFO] Qdrant vectorstore initialized successfully")
        except Exception as e:
            print(f"[WARNING] Failed to initialize Qdrant: {e}. Caching disabled.")
            return None
    
    return _vectorstore

# For backward compatibility - lazy-loaded accessor
def get_vectorstore():
    return _get_vectorstore()

# Module-level accessor that lazy-loads
def _lazy_vectorstore():
    return _get_vectorstore()

# Export as callable for backward compatibility
vectorstore = _lazy_vectorstore