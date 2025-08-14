import type { TimelinePoint } from '@/api/claim_detail.api'

const dot = {
  blue:   'bg-sky-600',
  yellow: 'bg-amber-500',
  green:  'bg-emerald-600',
  red:    'bg-rose-600',
}

export default function TimelineCard({ items }: { items: TimelinePoint[] }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-3">
        <span>🗓️</span>
        <span className="font-semibold text-slate-800">Timeline</span>
      </div>

      <ol className="relative ml-3 space-y-6">
        {items.map((t, i) => (
          <li key={i} className="relative">
            <span className={`absolute -left-3 top-1.5 h-2.5 w-2.5 rounded-full ${dot[t.color]}`} />
            <div className="flex items-start justify-between">
              <div className="font-semibold text-slate-800">{t.label}</div>
              <div className="text-xs text-slate-500">{fmt(t.date)}</div>
            </div>
            {t.desc && <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{t.desc}</p>}
            {t.by && <div className="text-xs text-slate-400">by {t.by}</div>}
          </li>
        ))}
      </ol>
    </div>
  )
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString(undefined, { month: 'numeric', day: 'numeric', year: 'numeric' })
}
