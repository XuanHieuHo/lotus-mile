import type { ClaimDetail } from '@/api/claim_detail.api'

export default function DetailCard({ d }: { d: ClaimDetail }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-3">
        <span>📄</span>
        <span className="font-semibold text-slate-800">Claim Details</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Claim Type" value={d.type} />
        <Field
          label="Points Requested"
          value={<span className="font-semibold text-emerald-600">+{d.pointsRequested.toLocaleString()} miles</span>}
        />
        <Field label="Date Submitted" value={fmt(d.submittedOn)} />
        {d.processedOn && <Field label="Date Processed" value={fmt(d.processedOn)} />}
      </div>

      <hr className="my-5" />

      <div>
        <div className="mb-1 text-xs font-medium text-slate-500">Description</div>
        <div className="rounded-xl bg-slate-50 p-4 text-slate-800">{d.description}</div>
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

function fmt(d: string) {
  return new Date(d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}
