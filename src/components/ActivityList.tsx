import type { Claim } from '@/api/claims.api'
import { StatusPill } from "@/components/ClaimsTable";

export default function ActivityList({ items }: { items: Claim[] }) {
  const input = items.slice(0, 4);
  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="mb-3 flex items-center justify-between px-2">
        <div className="flex items-center gap-2 text-slate-700">
          <span>🕑</span>
          <span className="text-sm font-medium">Recent Activity</span>
        </div>
        <a className="text-sm text-blue-700 hover:underline" href="claims">View All</a>
      </div>

      <ul className="divide-y">
        {input.map((a) => (
          <li key={a.id} className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100">✈️</div>
              <div>
                <div className="text-sm font-medium text-slate-900">{a.invoice_no}</div>
                <div className="text-xs text-slate-500">{fmt(a.claim_date)}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-emerald-600">+{(a.requested_points).toLocaleString()}</div>
                <div className="text-xs text-slate-400">miles</div>
              </div>
              <StatusPill s={a.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}
