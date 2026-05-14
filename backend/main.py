from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

load_dotenv()

from routers import documents, search
from services.vector_store import init_vector_store
from services.embedder import get_model


@asynccontextmanager
async def lifespan(app: FastAPI):
    init_vector_store()
    get_model()  # preload ~560MB model so first request isn't slow
    yield


app = FastAPI(
    title="Indic Knowledge Base API",
    description="RAG pipeline for ancient Indic texts using multilingual-e5-large",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(documents.router, prefix="/api/documents", tags=["documents"])
app.include_router(search.router, prefix="/api", tags=["search"])


@app.get("/")
def root():
    return {"message": "Indic Knowledge Base API", "status": "running"}
