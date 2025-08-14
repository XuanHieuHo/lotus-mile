import type { ClaimStatus } from '@/api/claim_detail.api'

export default function StatusBadge({ status }: { status: ClaimStatus }) {
  const map = {
    Pending:  'bg-amber-100 text-amber-800',
    Approved: 'bg-emerald-100 text-emerald-800',
    Rejected: 'bg-rose-100 text-rose-800',
  }
  const icon = { Pending: '⏳', Approved: '✅', Rejected: '❌' }[status]
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-medium ${map[status]}`}>
      {icon} {status}
    </span>
  )
}
