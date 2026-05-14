const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export interface Document {
  document_id: string
  filename: string
  chunk_count: number
}

export interface SearchResult {
  chunk_id: string
  document_id: string
  filename: string
  text: string
  page: number
  chunk_index: number
  score: number
}

export interface SearchResponse {
  query: string
  results: SearchResult[]
  answer?: string
}

export async function uploadDocument(file: File) {
  const form = new FormData()
  form.append('file', file)
  const res = await fetch(`${API_BASE}/api/documents/upload`, { method: 'POST', body: form })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Upload failed' }))
    throw new Error((err as { detail?: string }).detail ?? 'Upload failed')
  }
  return res.json()
}

export async function listDocuments(): Promise<{ documents: Document[]; total: number }> {
  const res = await fetch(`${API_BASE}/api/documents`)
  if (!res.ok) throw new Error('Failed to fetch documents')
  return res.json()
}

export async function deleteDocument(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/api/documents/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete document')
}

export async function search(query: string, nResults = 5): Promise<SearchResponse> {
  const res = await fetch(`${API_BASE}/api/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, n_results: nResults }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: 'Search failed' }))
    throw new Error((err as { detail?: string }).detail ?? 'Search failed')
  }
  return res.json()
}
