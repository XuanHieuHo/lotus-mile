import type { ReviewMember } from '@/api/admin_review_claims.api'

export default function MemberCard({ m }: { m: ReviewMember }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
        <span>👤</span> <span>Member Information</span>
      </div>

      <ListRow label="Name" value={m.name} />
      <ListRow label="Email" value={m.email} />
      <ListRow label="Tier" value={<span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs text-amber-800">{m.tier}</span>} />
      <ListRow label="Member Since" value={fmt(m.memberSince)} />
    </div>
  )
}

function ListRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-1 text-sm">
      <div className="text-slate-500">{label}</div>
      <div className="font-medium text-slate-800">{value}</div>
    </div>
  )
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString()
}
