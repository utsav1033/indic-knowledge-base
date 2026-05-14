from pydantic import BaseModel
from typing import List, Optional


class SearchQuery(BaseModel):
    query: str
    n_results: int = 5
    document_ids: Optional[List[str]] = None


class SearchResult(BaseModel):
    chunk_id: str
    document_id: str
    filename: str
    text: str
    page: int
    chunk_index: int
    score: float


class SearchResponse(BaseModel):
    query: str
    results: List[SearchResult]
    answer: Optional[str] = None
