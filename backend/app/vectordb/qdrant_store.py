import os
from qdrant_client import QdrantClient
from langchain_qdrant import QdrantVectorStore
from langchain_openai import OpenAIEmbeddings

QDRANT_URL = "http://localhost:6333"
COLLECTION_NAME = "verifiai_claims"

embeddings = OpenAIEmbeddings(
    model="text-embedding-3-small"
)

qdrant_client = QdrantClient(url=QDRANT_URL)

vectorstore = QdrantVectorStore.from_existing_collection(client=qdrant_client, collection_name=COLLECTION_NAME, embedding=embeddings)