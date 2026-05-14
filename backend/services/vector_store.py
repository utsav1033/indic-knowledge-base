import os
import chromadb
from typing import List, Dict, Any, Optional

_client: chromadb.PersistentClient | None = None
_collection = None

COLLECTION_NAME = "indic_texts"


def init_vector_store():
    global _client, _collection
    path = os.getenv("CHROMA_DB_PATH", "./chroma_db")
    _client = chromadb.PersistentClient(path=path)
    _collection = _client.get_or_create_collection(
        name=COLLECTION_NAME,
        metadata={"hnsw:space": "cosine"},
    )


def _get_collection():
    if _collection is None:
        init_vector_store()
    return _collection


def add_chunks(chunks: List[Dict[str, Any]], embeddings: List[List[float]]):
    col = _get_collection()
    col.upsert(
        ids=[c["id"] for c in chunks],
        embeddings=embeddings,
        documents=[c["text"] for c in chunks],
        metadatas=[
            {
                "document_id": c["document_id"],
                "filename": c["filename"],
                "page": c["page"],
                "chunk_index": c["chunk_index"],
            }
            for c in chunks
        ],
    )


def query_chunks(
    query_embedding: List[float],
    n_results: int = 5,
    document_ids: Optional[List[str]] = None,
) -> List[Dict[str, Any]]:
    col = _get_collection()

    total = col.count()
    if total == 0:
        return []

    where = None
    if document_ids:
        where = (
            {"document_id": {"$eq": document_ids[0]}}
            if len(document_ids) == 1
            else {"document_id": {"$in": document_ids}}
        )

    results = col.query(
        query_embeddings=[query_embedding],
        n_results=min(n_results, total),
        where=where,
        include=["documents", "metadatas", "distances"],
    )

    chunks = []
    for i, chunk_id in enumerate(results["ids"][0]):
        meta = results["metadatas"][0][i]
        distance = results["distances"][0][i]
        chunks.append(
            {
                "chunk_id": chunk_id,
                "document_id": meta["document_id"],
                "filename": meta["filename"],
                "text": results["documents"][0][i],
                "page": meta["page"],
                "chunk_index": meta["chunk_index"],
                "score": max(0.0, 1.0 - distance),
            }
        )
    return chunks


def list_documents() -> List[Dict[str, Any]]:
    col = _get_collection()
    results = col.get(include=["metadatas"])

    if not results["metadatas"]:
        return []

    seen: Dict[str, Dict[str, Any]] = {}
    for meta in results["metadatas"]:
        doc_id = meta["document_id"]
        if doc_id not in seen:
            seen[doc_id] = {"document_id": doc_id, "filename": meta["filename"], "chunk_count": 0}
        seen[doc_id]["chunk_count"] += 1

    return list(seen.values())


def delete_document(document_id: str):
    col = _get_collection()
    col.delete(where={"document_id": {"$eq": document_id}})
