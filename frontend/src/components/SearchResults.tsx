'use client'

import { SearchResponse } from '@/lib/api'

function ScoreBadge({ score }: { score: number }) {
  const pct = Math.round(score * 100)
  const cls =
    pct >= 80
      ? 'bg-green-500/15 text-green-400 border-green-500/30'
      : pct >= 60
        ? 'bg-orange-500/15 text-orange-400 border-orange-500/30'
        : pct >= 40
          ? 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30'
          : 'bg-slate-700/50 text-slate-400 border-slate-600'
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded border font-mono ${cls}`}>
      {pct}%
    </span>
  )
}

export default function SearchResults({ response }: { response: SearchResponse }) {
  const { query, results, answer } = response

  return (
    <div className="space-y-4">
      {answer && (
        <div className="bg-orange-950/40 border border-orange-800/40 rounded-xl p-4">
          <p className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-2">
            AI Answer
            <span className="ml-2 text-slate-600 normal-case font-normal">· grounded in source texts</span>
          </p>
          <p className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      {results.length === 0 ? (
        <p className="text-center text-sm text-slate-600 py-8">
          No relevant passages found for &ldquo;{query}&rdquo;
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
            Source Passages ({results.length})
          </p>
          {results.map((r) => (
            <div key={r.chunk_id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors">
              <p className="text-sm text-slate-300 leading-relaxed mb-3 line-clamp-4">{r.text}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="text-slate-400 font-medium truncate max-w-48" title={r.filename}>
                  {r.filename}
                </span>
                <span className="text-slate-700">·</span>
                <span>p. {r.page}</span>
                <span className="text-slate-700">·</span>
                <ScoreBadge score={r.score} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
