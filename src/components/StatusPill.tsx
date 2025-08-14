export type AdminStatus = 'Pending' | 'Approved' | 'Rejected'

export default function StatusPill({ status }: { status: AdminStatus }) {
  const cls =
    status === 'Pending'
      ? 'bg-amber-100 text-amber-800'
      : status === 'Approved'
      ? 'bg-emerald-100 text-emerald-800'
      : 'bg-rose-100 text-rose-800'
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {status}
    </span>
  )
}
