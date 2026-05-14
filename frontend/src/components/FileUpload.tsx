'use client'

import { useRef, useState } from 'react'

interface Props {
  onUpload: (file: File) => void
  isLoading: boolean
  status: { text: string; isError: boolean } | null
}

export default function FileUpload({ onUpload, isLoading, status }: Props) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined | null) => {
    if (!file) return
    if (file.type !== 'application/pdf') {
      alert('Only PDF files are supported')
      return
    }
    onUpload(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    handleFile(e.dataTransfer.files[0])
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
      <h2 className="text-sm font-semibold text-slate-300 mb-3">Upload Document</h2>

      <div
        onClick={() => !isLoading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        className={[
          'border-2 border-dashed rounded-lg p-6 text-center transition-colors',
          isDragging
            ? 'border-orange-500 bg-orange-500/10'
            : 'border-slate-700 hover:border-slate-600',
          isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        ].join(' ')}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
          disabled={isLoading}
        />

        {isLoading ? (
          <div className="flex items-center justify-center gap-2 text-slate-400 text-sm">
            <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Indexing document…
          </div>
        ) : (
          <>
            <svg
              className="mx-auto h-8 w-8 text-slate-600 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="text-sm text-slate-400">
              Drop a PDF here or{' '}
              <span className="text-orange-400 font-medium">browse</span>
            </p>
            <p className="text-xs text-slate-600 mt-1">Sanskrit, Hindi, English — all supported</p>
          </>
        )}
      </div>

      {status && (
        <p className={`mt-2 text-xs ${status.isError ? 'text-red-400' : 'text-green-400'}`}>
          {status.text}
        </p>
      )}
    </div>
  )
}
