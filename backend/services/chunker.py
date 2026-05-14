import re
from typing import List, Dict, Any

MAX_CHUNK_WORDS = 500
MIN_CHUNK_WORDS = 50
OVERLAP_WORDS = 60

# Sentence-ending patterns including Sanskrit dandas (। ॥)
_SENTENCE_SPLIT = re.compile(r'(?<=[.!?।॥])\s+')


def _split_sentences(text: str) -> List[str]:
    return [s.strip() for s in _SENTENCE_SPLIT.split(text) if s.strip()]


def chunk_text(pages: List[Dict[str, Any]], document_id: str, filename: str) -> List[Dict[str, Any]]:
    chunks = []
    chunk_index = 0

    for page_data in pages:
        page_num = page_data["page"]
        sentences = _split_sentences(page_data["text"])

        current_sentences: List[str] = []
        current_word_count = 0

        for sentence in sentences:
            word_count = len(sentence.split())

            if current_word_count + word_count > MAX_CHUNK_WORDS and current_word_count >= MIN_CHUNK_WORDS:
                chunks.append(_make_chunk(current_sentences, document_id, filename, page_num, chunk_index))
                chunk_index += 1

                # carry overlap into next chunk
                overlap: List[str] = []
                overlap_wc = 0
                for s in reversed(current_sentences):
                    sw = len(s.split())
                    if overlap_wc + sw <= OVERLAP_WORDS:
                        overlap.insert(0, s)
                        overlap_wc += sw
                    else:
                        break
                current_sentences = overlap
                current_word_count = overlap_wc

            current_sentences.append(sentence)
            current_word_count += word_count

        if current_sentences and current_word_count >= MIN_CHUNK_WORDS:
            chunks.append(_make_chunk(current_sentences, document_id, filename, page_num, chunk_index))
            chunk_index += 1

    return chunks


def _make_chunk(sentences: List[str], document_id: str, filename: str, page: int, index: int) -> Dict[str, Any]:
    return {
        "id": f"{document_id}_{index}",
        "document_id": document_id,
        "filename": filename,
        "text": " ".join(sentences),
        "page": page,
        "chunk_index": index,
    }
