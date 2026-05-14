from sentence_transformers import SentenceTransformer
from typing import List
import torch

_model: SentenceTransformer | None = None


def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        device = "cuda" if torch.cuda.is_available() else "cpu"
        print(f"Loading multilingual-e5-large on {device}...")
        _model = SentenceTransformer("intfloat/multilingual-e5-large", device=device)
        print("Model loaded.")
    return _model


def embed_passages(texts: List[str]) -> List[List[float]]:
    model = get_model()
    prefixed = [f"passage: {t}" for t in texts]
    embeddings = model.encode(
        prefixed,
        normalize_embeddings=True,
        batch_size=32,
        show_progress_bar=len(prefixed) > 10,
    )
    return embeddings.tolist()


def embed_query(query: str) -> List[float]:
    model = get_model()
    embedding = model.encode([f"query: {query}"], normalize_embeddings=True)
    return embedding[0].tolist()
