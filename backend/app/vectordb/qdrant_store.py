# app/vectordb/qdrant_store.py
import os
from qdrant_client import QdrantClient
from langchain_community.vectorstores import Qdrant
from langchain.embeddings.openai import OpenAIEmbeddings

QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6333")
COLLECTION_NAME = "verifiai_claims"

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small"
)

qdrant_client = QdrantClient(
    url=QDRANT_URL
)

vectorstore = Qdrant(
    client=qdrant_client,
    collection_name=COLLECTION_NAME,
    embedding=embeddings
)
