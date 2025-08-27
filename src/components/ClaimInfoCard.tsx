import type { Claim } from '@/api/claims.api';

export default function ClaimInfoCard({ c }: { c: Claim }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
        <span>🧾</span> <span>Claim Information</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Invoice No" value={c.invoice_no} />
        <Field label="Points Requested" value={<span className="font-semibold text-emerald-600">{c.requested_points.toLocaleString()}</span>} />
      </div>

      <div className="mt-4">
        <div className="mb-1 text-xs font-medium text-slate-500">Note</div>
        <div className="rounded-xl bg-slate-50 p-4 text-slate-800">{c.note}</div>
      </div>
    </div>
  )
}

function Field({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-medium text-slate-500">{label}</div>
      <div className="mt-1 rounded-xl bg-slate-50 px-3 py-2 text-slate-800">{value}</div>
    </div>
  )
}
