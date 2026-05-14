'use client'

import { Document } from '@/lib/api'

interface Props {
  documents: Document[]
  onDelete: (id: string) => void
  onRefresh: () => void
}

export default function DocumentList({ documents, onDelete, onRefresh }: Props) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-slate-300">
          Indexed Documents
          {documents.length > 0 && (
            <span className="ml-1.5 text-xs text-slate-500 font-normal">({documents.length})</span>
          )}
        </h2>
        <button
          onClick={onRefresh}
          className="text-xs text-slate-600 hover:text-slate-400 transition-colors"
        >
          Refresh
        </button>
      </div>

      {documents.length === 0 ? (
        <p className="text-xs text-slate-600 text-center py-4">No documents indexed yet</p>
      ) : (
        <ul className="space-y-2">
          {documents.map((doc) => (
            <li key={doc.document_id} className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-slate-300 truncate" title={doc.filename}>
                  {doc.filename}
                </p>
                <p className="text-xs text-slate-600">{doc.chunk_count} chunks</p>
              </div>
              <button
                onClick={() => onDelete(doc.document_id)}
                title="Remove document"
                className="text-slate-700 hover:text-red-400 transition-colors flex-shrink-0 mt-0.5"
              >
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
