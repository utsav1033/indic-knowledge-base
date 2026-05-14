import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException
from services.pdf_extractor import extract_text_from_pdf
from services.chunker import chunk_text
from services.embedder import embed_passages
from services.vector_store import add_chunks, list_documents, delete_document

router = APIRouter()


@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    file_bytes = await file.read()
    document_id = str(uuid.uuid4())

    pages = extract_text_from_pdf(file_bytes)
    if not pages:
        raise HTTPException(
            status_code=422,
            detail="No extractable text found. The PDF may be scanned/image-based.",
        )

    chunks = chunk_text(pages, document_id, file.filename)
    if not chunks:
        raise HTTPException(status_code=422, detail="Document too short to index meaningfully")

    embeddings = embed_passages([c["text"] for c in chunks])
    add_chunks(chunks, embeddings)

    return {
        "document_id": document_id,
        "filename": file.filename,
        "total_chunks": len(chunks),
        "total_pages": len(pages),
        "message": "Document indexed successfully",
    }


@router.get("")
def get_documents():
    docs = list_documents()
    return {"documents": docs, "total": len(docs)}


@router.delete("/{document_id}")
def remove_document(document_id: str):
    delete_document(document_id)
    return {"message": f"Document {document_id} removed"}
