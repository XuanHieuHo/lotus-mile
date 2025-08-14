import type { Activity } from '@/api/activity.api'

function StatusPill({ status }: { status: Activity['status'] }) {
  const map: Record<Activity['status'], string> = {
    Approved: 'bg-emerald-100 text-emerald-700',
    Completed: 'bg-emerald-100 text-emerald-700',
    Pending: 'bg-amber-100 text-amber-700',
    Rejected: 'bg-rose-100 text-rose-700',
  }
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${map[status]}`}>
      {status}
    </span>
  )
}

export default function ActivityList({ items }: { items: Activity[] }) {
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
        {items.map((a) => (
          <li key={a.id} className="flex items-center justify-between px-2 py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-slate-100">✈️</div>
              <div>
                <div className="text-sm font-medium text-slate-900">{a.title}</div>
                <div className="text-xs text-slate-500">{a.date}</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-emerald-600">+{(a.miles).toLocaleString()}</div>
                <div className="text-xs text-slate-400">miles</div>
              </div>
              <StatusPill status={a.status} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
