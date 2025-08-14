import type { ClaimDetail } from '@/api/claim_detail.api'

export default function AdminNotesCard({ note }: { note: NonNullable<ClaimDetail['adminNote']> }) {
  const toneMap = {
    info:    'bg-slate-50 border-slate-200 text-slate-700',
    success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
    danger:  'bg-rose-50 border-rose-200 text-rose-800',
  }
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-3">
        <span>📝</span>
        <span className="font-semibold text-slate-800">Admin Notes</span>
      </div>
      <div className={`rounded-xl border p-4 ${toneMap[note.tone]}`}>
        <div className="mb-1 text-sm font-semibold">Note from our team:</div>
        <p className="text-sm">{note.text}</p>
      </div>
    </div>
  )
}
