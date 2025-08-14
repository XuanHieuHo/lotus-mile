import type { TxnSource } from '@/api/transactions.api'

export default function SourcePill({ s }: { s: TxnSource }) {
  const map: Record<TxnSource, string> = {
    Manual: 'bg-sky-50 text-sky-700 ring-1 ring-sky-200',
    SessionM: 'bg-amber-50 text-amber-800 ring-1 ring-amber-200',
    System: 'bg-slate-100 text-slate-700 ring-1 ring-slate-200',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[s]}`}>
      {s}
    </span>
  )
}
