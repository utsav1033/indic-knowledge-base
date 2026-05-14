import os
from typing import Optional
from fastapi import APIRouter
from models.schemas import SearchQuery, SearchResponse, SearchResult
from services.embedder import embed_query
from services.vector_store import query_chunks

router = APIRouter()


def _generate_answer(query: str, chunks: list) -> Optional[str]:
    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        return None
    try:
        import anthropic

        context = "\n\n".join(
            f"[{c['filename']}, p.{c['page']}]\n{c['text']}" for c in chunks[:5]
        )
        client = anthropic.Anthropic(api_key=api_key)
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            messages=[
                {
                    "role": "user",
                    "content": (
                        "You are a scholar of ancient Indic texts. "
                        "Answer the question below using ONLY the provided source passages. "
                        "Cite the source filename and page when referencing specific content. "
                        "If the answer cannot be found in the passages, say so clearly.\n\n"
                        f"Question: {query}\n\n"
                        f"Source Passages:\n{context}\n\n"
                        "Answer:"
                    ),
                }
            ],
        )
        return message.content[0].text
    except Exception:
        return None


@router.post("/search", response_model=SearchResponse)
def search(query: SearchQuery):
    embedding = embed_query(query.query)
    chunks = query_chunks(embedding, query.n_results, query.document_ids)
    results = [SearchResult(**c) for c in chunks]
    answer = _generate_answer(query.query, chunks) if chunks else None
    return SearchResponse(query=query.query, results=results, answer=answer)
