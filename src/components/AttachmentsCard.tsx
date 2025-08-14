import type { Attachment } from '@/api/claim_detail.api'

export default function AttachmentsCard({ items }: { items: Attachment[] }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-3">
        <span>📎</span>
        <span className="font-semibold text-slate-800">Attachments ({items.length})</span>
      </div>

      <ul className="space-y-3">
        {items.map((f) => (
          <li key={f.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-blue-900 text-white text-sm font-semibold">
                {f.type}
              </div>
              <div>
                <div className="text-sm font-medium text-slate-800">{f.name}</div>
                <div className="text-xs text-slate-500">{f.size} • {f.type}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-slate-600 hover:text-slate-900">👁️ View</button>
              <button className="text-slate-600 hover:text-slate-900">⬇️ Download</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
