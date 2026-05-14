'use client'

import { useState, useEffect, useCallback } from 'react'
import FileUpload from '@/components/FileUpload'
import DocumentList from '@/components/DocumentList'
import SearchBar from '@/components/SearchBar'
import SearchResults from '@/components/SearchResults'
import {
  uploadDocument,
  listDocuments,
  deleteDocument,
  search,
  type Document,
  type SearchResponse,
} from '@/lib/api'

export default function Home() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null)
  const [uploading, setUploading] = useState(false)
  const [searching, setSearching] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<{ text: string; isError: boolean } | null>(null)
  const [searchError, setSearchError] = useState<string | null>(null)

  const loadDocuments = useCallback(async () => {
    try {
      const data = await listDocuments()
      setDocuments(data.documents)
    } catch {
      // backend may not be running yet
    }
  }, [])

  useEffect(() => {
    loadDocuments()
  }, [loadDocuments])

  const handleUpload = async (file: File) => {
    setUploading(true)
    setUploadStatus(null)
    try {
      const result = await uploadDocument(file)
      setUploadStatus({
        text: `Indexed ${result.total_chunks} chunks from "${file.name}"`,
        isError: false,
      })
      await loadDocuments()
    } catch (e) {
      setUploadStatus({
        text: e instanceof Error ? e.message : 'Upload failed',
        isError: true,
      })
    } finally {
      setUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDocument(id)
      await loadDocuments()
    } catch {
      // silent — list will be stale but functional
    }
  }

  const handleSearch = async (query: string) => {
    setSearching(true)
    setSearchError(null)
    try {
      const response = await search(query)
      setSearchResponse(response)
    } catch (e) {
      setSearchError(e instanceof Error ? e.message : 'Search failed')
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-3">
          <span className="text-2xl leading-none select-none">ॐ</span>
          <div>
            <h1 className="text-base font-semibold text-orange-400 leading-tight">Indic Knowledge Base</h1>
            <p className="text-xs text-slate-600 leading-tight">
              Semantic search · multilingual-e5-large · Devanagari &amp; Romanized Sanskrit
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            <FileUpload onUpload={handleUpload} isLoading={uploading} status={uploadStatus} />
            <DocumentList documents={documents} onDelete={handleDelete} onRefresh={loadDocuments} />
          </aside>

          {/* Search + Results */}
          <section className="lg:col-span-2 space-y-4">
            <SearchBar onSearch={handleSearch} isLoading={searching} />

            {searchError && (
              <div className="bg-red-950/40 border border-red-800/40 rounded-xl p-3 text-red-400 text-sm">
                {searchError}
              </div>
            )}

            {searching && (
              <div className="text-center py-12 text-slate-600 text-sm">Searching…</div>
            )}

            {!searching && searchResponse && (
              <SearchResults response={searchResponse} />
            )}

            {!searching && !searchResponse && !searchError && (
              <div className="text-center py-16 text-slate-700 text-sm space-y-1">
                <p className="text-3xl mb-4 select-none">ज्ञान</p>
                <p>Upload a PDF, then ask a question to begin.</p>
                <p className="text-xs text-slate-800">
                  Works with Devanagari, Romanized Sanskrit, and English queries.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
