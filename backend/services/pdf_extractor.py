import fitz  # PyMuPDF
from typing import List, Dict, Any


def extract_text_from_pdf(file_bytes: bytes) -> List[Dict[str, Any]]:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    pages = []
    for page_num in range(len(doc)):
        page = doc[page_num]
        text = page.get_text("text")
        text = " ".join(text.split())  # normalize whitespace
        if text.strip():
            pages.append({"page": page_num + 1, "text": text})
    doc.close()
    return pages


def get_pdf_title(file_bytes: bytes) -> str:
    doc = fitz.open(stream=file_bytes, filetype="pdf")
    title = doc.metadata.get("title", "")
    doc.close()
    return title
