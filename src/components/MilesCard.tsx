import type { ProfileData } from '@/api/profile.api'
export default function MilesCard({ data }: { data: ProfileData }) {
  return (
    <div className="grid place-items-center rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
      <div className="text-4xl font-extrabold text-slate-900">{data.total_miles.toLocaleString()}</div>
      <div className="mt-1 text-sm text-slate-500">Available Miles</div>
    </div>
  )
}
